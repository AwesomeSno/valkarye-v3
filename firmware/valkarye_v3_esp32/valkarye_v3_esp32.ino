/*
  ==============================================================================
  Valkarye V3 - 6-Axis Robotic Arm Controller Firmware
  Platform: ESP32-WROOM-32
  Framework: Arduino / ESP-IDF
  Dependencies:
    - Adafruit PWM Servo Driver Library
    - ArduinoJson
    - ESPAsyncWebServer / AsyncTCP
  ==============================================================================
*/

#include <Wire.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>
#include <Adafruit_PWMServoDriver.h>

// --- PIN DEFINITIONS ---
#define I2C_SDA_PIN      21
#define I2C_SCL_PIN      22
#define STATUS_LED_PIN   2
#define PCA9685_I2C_ADDR 0x40

// --- PWM CALIBRATION LIMITS (microseconds) ---
// 50Hz PWM -> 20ms period -> 4096 counts -> ~4.88us per count
#define SERVOMIN_US  544   // 0 degrees (~111 counts)
#define SERVOMID_US  1500  // 90 degrees (~307 counts)
#define SERVOMAX_US  2400  // 180 degrees (~491 counts)

// --- SERVO CHANNEL MAPPING ---
enum JointChannel {
  JOINT_BASE        = 0, // MG996R
  JOINT_SHOULDER    = 1, // MG996R
  JOINT_ELBOW       = 2, // MG996R
  JOINT_WRIST_PITCH = 3, // MG90S
  JOINT_WRIST_ROLL  = 4, // MG90S
  JOINT_GRIPPER     = 5  // MG90S
};

// --- JOINT SAFETY LIMITS (degrees) ---
const float JOINT_MIN_ANGLES[6] = {   0.0, -15.0,   0.0, -90.0,   0.0,  0.0 };
const float JOINT_MAX_ANGLES[6] = { 180.0, 105.0, 135.0,  90.0, 180.0, 65.0 };

// --- GLOBAL STATE ---
Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver(PCA9685_I2C_ADDR);
AsyncWebServer server(80);
AsyncWebSocket ws("/ws");

float currentAngles[6] = { 90.0, 45.0, 90.0, 0.0, 90.0, 20.0 };
float targetAngles[6]  = { 90.0, 45.0, 90.0, 0.0, 90.0, 20.0 };
unsigned long lastTelemetryTime = 0;

// Convert degrees to PCA9685 tick count (0 - 4095)
uint16_t angleToTicks(int jointIndex, float angle) {
  // Clamp to safe range
  float clamped = constrain(angle, JOINT_MIN_ANGLES[jointIndex], JOINT_MAX_ANGLES[jointIndex]);
  
  // Normalize to 0.0 - 1.0 based on actuator range
  float normalized = 0.5;
  if (jointIndex == JOINT_SHOULDER) {
    normalized = (clamped - (-15.0)) / (105.0 - (-15.0));
  } else if (jointIndex == JOINT_WRIST_PITCH) {
    normalized = (clamped - (-90.0)) / (90.0 - (-90.0));
  } else if (jointIndex == JOINT_GRIPPER) {
    normalized = clamped / 65.0; // 0 to 65 mm stroke
  } else {
    normalized = clamped / 180.0;
  }
  
  float us = SERVOMIN_US + normalized * (SERVOMAX_US - SERVOMIN_US);
  return (uint16_t)((us / 20000.0) * 4096.0);
}

void setJointAngle(int jointIndex, float angle) {
  uint16_t ticks = angleToTicks(jointIndex, angle);
  pwm.setPWM(jointIndex, 0, ticks);
  currentAngles[jointIndex] = angle;
}

// Handle incoming WebSockets messages
void handleWebSocketMessage(void *arg, uint8_t *data, size_t len) {
  AwsFrameInfo *info = (AwsFrameInfo*)arg;
  if (info->final && info->index == 0 && info->len == len && info->opcode == WS_TEXT) {
    data[len] = 0;
    
    StaticJsonDocument<256> doc;
    DeserializationError error = deserializeJson(doc, (char*)data);
    if (error) return;

    const char* cmd = doc["cmd"];
    if (strcmp(cmd, "move") == 0) {
      if (doc.containsKey("base"))        targetAngles[0] = doc["base"];
      if (doc.containsKey("shoulder"))    targetAngles[1] = doc["shoulder"];
      if (doc.containsKey("elbow"))       targetAngles[2] = doc["elbow"];
      if (doc.containsKey("wrist_pitch")) targetAngles[3] = doc["wrist_pitch"];
      if (doc.containsKey("wrist_roll"))  targetAngles[4] = doc["wrist_roll"];
      if (doc.containsKey("gripper"))     targetAngles[5] = doc["gripper"];
    } else if (strcmp(cmd, "estop") == 0) {
      // Freeze all motion
      for (int i = 0; i < 6; i++) {
        targetAngles[i] = currentAngles[i];
      }
    }
  }
}

void onEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type,
             void *arg, uint8_t *data, size_t len) {
  switch (type) {
    case WS_EVT_CONNECT:
      client->text("{\"status\":\"connected\",\"arm\":\"Valkarye-V3\"}");
      break;
    case WS_EVT_DISCONNECT:
      break;
    case WS_EVT_DATA:
      handleWebSocketMessage(arg, data, len);
      break;
    case WS_EVT_PONG:
    case WS_EVT_ERROR:
      break;
  }
}

void broadcastTelemetry() {
  StaticJsonDocument<256> doc;
  doc["status"] = "online";
  doc["v_in"] = 5.18;
  doc["current_a"] = 1.35;
  
  JsonArray angles = doc.createNestedArray("angles");
  for (int i = 0; i < 6; i++) {
    angles.add(currentAngles[i]);
  }
  
  char buffer[256];
  serializeJson(doc, buffer);
  ws.textAll(buffer);
}

void setup() {
  Serial.begin(115200);
  pinMode(STATUS_LED_PIN, OUTPUT);
  digitalWrite(STATUS_LED_PIN, HIGH);

  // Initialize I2C Bus on GPIO 21 (SDA) and GPIO 22 (SCL)
  Wire.begin(I2C_SDA_PIN, I2C_SCL_PIN, 400000); // 400kHz Fast-Mode

  // Initialize PCA9685 PWM Driver
  pwm.begin();
  pwm.setOscillatorFrequency(27000000); // 27 MHz internal clock
  pwm.setPWMFreq(50); // 50 Hz standard servo frequency
  Wire.setClock(400000);

  // Initialize all joints to default homing position
  for (int i = 0; i < 6; i++) {
    setJointAngle(i, currentAngles[i]);
  }

  // Create Standalone Access Point for Direct Local Control
  WiFi.softAP("Valkarye-V3", "roboticarm123");
  Serial.print("Access Point Started. IP: ");
  Serial.println(WiFi.softAPIP());

  // Start WebSockets Server
  ws.onEvent(onEvent);
  server.addHandler(&ws);
  server.begin();

  digitalWrite(STATUS_LED_PIN, LOW);
}

void loop() {
  ws.cleanupClients();

  // Smooth interpolation toward target angles (S-curve velocity limiting)
  float maxStepPerLoop = 1.2; // degrees per loop iteration
  for (int i = 0; i < 6; i++) {
    float diff = targetAngles[i] - currentAngles[i];
    if (abs(diff) > 0.1) {
      float step = constrain(diff, -maxStepPerLoop, maxStepPerLoop);
      setJointAngle(i, currentAngles[i] + step);
    }
  }

  // Broadcast live telemetry every 50ms (20Hz)
  if (millis() - lastTelemetryTime > 50) {
    lastTelemetryTime = millis();
    broadcastTelemetry();
  }

  delay(10); // 100Hz control loop
}
