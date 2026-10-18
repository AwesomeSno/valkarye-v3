import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  Audio,
  staticFile,
  Sequence,
} from "remotion";

// ─── Apple Minimal Design Tokens ───
const THEME = {
  bg: "#000000",
  surfaceCard: "rgba(255, 255, 255, 0.04)",
  surfaceCardBorder: "rgba(255, 255, 255, 0.12)",
  surfacePill: "rgba(18, 18, 20, 0.85)",
  surfacePillBorder: "rgba(255, 255, 255, 0.15)",
  textPrimary: "#f5f5f7",
  textSecondary: "#86868b",
  accentOrange: "#f56300",
  accentGreen: "#30d158",
  accentBlue: "#2997ff",
};

const FONT_FAMILY =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif";

// ─── Subtitle Timestamps (Exact from Edge-TTS 15h audio) ───
const SUBTITLES = [
  { start: 2, end: 30, text: "Hey everyone!" },
  { start: 30, end: 98, text: "Quick update on Valkarye V3." },
  {
    start: 98,
    end: 239,
    text: "I just wrapped up the first 15 hours of planning and engineering, and here is what is done.",
  },
  {
    start: 239,
    end: 445,
    text: "I started by tearing down what failed on my old arm: cheap plastic gears, USB power brownouts, and joint flex.",
  },
  {
    start: 445,
    end: 790,
    text: "For V3, I mapped out the complete 6-axis architecture with an ESP32 controlling a PCA9685 driver and an external 5-volt buck regulator.",
  },
  {
    start: 790,
    end: 1144,
    text: "I calculated the torque math for the shoulder, which needs over 11 kilogram-centimeters, locked in the motor specs, and designed the real-time WebSockets pipeline for phone and laptop control.",
  },
  {
    start: 1144,
    end: 1303,
    text: "All the mechanical geometry and parts are ready, and next I am modeling the joints in CAD.",
  },
  {
    start: 1303,
    end: 1370,
    text: "Thanks for watching, see you in the next one!",
  },
];

// ─── Overhead Studio Lighting ───
const StudioStageLight: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: -200,
        left: "50%",
        transform: "translateX(-50%)",
        width: 1000,
        height: 800,
        background:
          "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 45%, transparent 75%)",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
};

// ─── Dynamic Island Top Pill ───
const DynamicIslandHeader: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 120 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 64,
        left: "50%",
        transform: `translateX(-50%) translateY(${(1 - enter) * -40}px) scale(${enter})`,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "12px 28px",
        borderRadius: 999,
        backgroundColor: THEME.surfacePill,
        border: `1px solid ${THEME.surfacePillBorder}`,
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        boxShadow: "0 16px 36px rgba(0, 0, 0, 0.6)",
      }}
    >
      <div
        style={{
          width: 9,
          height: 9,
          borderRadius: "50%",
          backgroundColor: THEME.accentGreen,
          boxShadow: `0 0 10px ${THEME.accentGreen}`,
        }}
      />
      <span
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: THEME.textPrimary,
          letterSpacing: -0.2,
          fontFamily: FONT_FAMILY,
        }}
      >
        Valkarye V3
      </span>
      <span style={{ color: THEME.textSecondary, fontSize: 18 }}>•</span>
      <span
        style={{
          fontSize: 20,
          fontWeight: 500,
          color: THEME.textSecondary,
          fontFamily: FONT_FAMILY,
        }}
      >
        First 15 Hours Complete
      </span>
    </div>
  );
};

// ─── Apple Minimal CAD Arm Turntable ───
const MinimalistRoboticArm: React.FC<{ size?: number }> = ({ size = 680 }) => {
  const frame = useCurrentFrame();
  const rotation = Math.sin(frame * 0.025) * 14;
  const shoulderAngle = 36 + Math.sin(frame * 0.035) * 6;
  const elbowAngle = -48 + Math.cos(frame * 0.035) * 8;
  const wristAngle = 20 + Math.sin(frame * 0.035) * 6;

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 600 600"
        style={{
          transform: `rotateY(${rotation}deg)`,
          transformStyle: "preserve-3d",
          overflow: "visible",
        }}
      >
        {/* Turntable Platter */}
        <ellipse cx="300" cy="510" rx="140" ry="24" fill="#0d0d10" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />
        <ellipse cx="300" cy="502" rx="110" ry="18" fill="#18181b" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" />

        {/* Base Pillar */}
        <path d="M265,502 L275,440 L325,440 L335,502 Z" fill="#27272a" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" />

        {/* Shoulder Joint Pivot */}
        <circle cx="300" cy="430" r="28" fill="#18181b" stroke={THEME.accentOrange} strokeWidth="3" />
        <circle cx="300" cy="430" r="10" fill="#f5f5f7" />

        {/* Bicep Link */}
        <g transform={`rotate(${shoulderAngle}, 300, 430)`}>
          <rect x="286" y="270" width="28" height="160" rx="14" fill="#d1d5db" stroke="rgba(0, 0, 0, 0.4)" strokeWidth="2" />
          <line x1="300" y1="285" x2="300" y2="415" stroke="#9ca3af" strokeWidth="4" strokeLinecap="round" />

          {/* Elbow Joint */}
          <g transform="translate(300, 270)">
            <circle cx="0" cy="0" r="22" fill="#18181b" stroke={THEME.accentOrange} strokeWidth="2.5" />
            <circle cx="0" cy="0" r="8" fill="#f5f5f7" />

            {/* Forearm Link */}
            <g transform={`rotate(${elbowAngle})`}>
              <rect x="-11" y="-140" width="22" height="140" rx="11" fill="#4b5563" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" />

              {/* Wrist Joint */}
              <g transform="translate(0, -140)">
                <circle cx="0" cy="0" r="16" fill="#18181b" stroke="#71717a" strokeWidth="2" />
                <circle cx="0" cy="0" r="6" fill="#f5f5f7" />

                {/* Gripper Wrist Assembly */}
                <g transform={`rotate(${wristAngle})`}>
                  <rect x="-14" y="-35" width="28" height="35" rx="6" fill="#27272a" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" />
                  {/* Precision Claw Fingers */}
                  <path d="M-12,-35 L-22,-70 L-14,-70 L-6,-45" fill="#f5f5f7" />
                  <path d="M12,-35 L22,-70 L14,-70 L6,-45" fill="#f5f5f7" />
                  {/* Minimalist Manipulated Cube */}
                  <rect x="-10" y="-82" width="20" height="20" rx="3" fill="rgba(255, 255, 255, 0.95)" stroke="#f56300" strokeWidth="1.5" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

// ─── Reusable Frosted Glass Showcase Card ───
const FrostedSketchCard: React.FC<{
  imageSrc: string;
  badge: string;
  title: string;
  description: string;
  tagNumber: string;
}> = ({ imageSrc, badge, title, description, tagNumber }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  // Gentle subtle zoom on the diagram
  const imageScale = interpolate(frame, [0, 200], [1.0, 1.05], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 220,
        left: "50%",
        transform: `translateX(-50%) translateY(${(1 - enter) * 50}px) scale(${enter})`,
        width: 960,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Category Pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 24px",
          borderRadius: 999,
          background: "rgba(255, 255, 255, 0.06)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          marginBottom: 20,
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: THEME.accentOrange,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            fontFamily: FONT_FAMILY,
          }}
        >
          {badge}
        </span>
        <span style={{ color: THEME.textSecondary, fontSize: 14 }}>•</span>
        <span
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: THEME.textSecondary,
            fontFamily: FONT_FAMILY,
          }}
        >
          {tagNumber}
        </span>
      </div>

      {/* Main Glassmorphic Photo Frame */}
      <div
        style={{
          width: 940,
          borderRadius: 32,
          backgroundColor: THEME.surfaceCard,
          border: `1px solid ${THEME.surfaceCardBorder}`,
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.8)",
          padding: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* The Technical Diagram Card */}
        <div
          style={{
            width: "100%",
            height: 580,
            borderRadius: 22,
            backgroundColor: "#ffffff",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.06)",
          }}
        >
          <Img
            src={staticFile(imageSrc)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transform: `scale(${imageScale})`,
            }}
          />
        </div>

        {/* Caption Info */}
        <div
          style={{
            width: "100%",
            marginTop: 24,
            padding: "0 12px",
            textAlign: "left",
          }}
        >
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              color: THEME.textPrimary,
              letterSpacing: -0.5,
              fontFamily: FONT_FAMILY,
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 6,
              fontSize: 22,
              fontWeight: 400,
              color: THEME.textSecondary,
              fontFamily: FONT_FAMILY,
              lineHeight: 1.35,
            }}
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Scene 1: Intro (0 - 239 frames = 0 - 8.0s) ───
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: enter,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 26px",
          borderRadius: 999,
          background: "rgba(255, 255, 255, 0.06)",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          marginBottom: 28,
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: THEME.accentOrange,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontFamily: FONT_FAMILY,
          }}
        >
          15-Hour Engineering Log
        </span>
      </div>

      <div
        style={{
          fontSize: 88,
          fontWeight: 800,
          color: THEME.textPrimary,
          letterSpacing: -3,
          lineHeight: 1.05,
          textAlign: "center",
          fontFamily: FONT_FAMILY,
        }}
      >
        Valkarye <span style={{ color: THEME.accentOrange }}>V3</span>
      </div>

      <div
        style={{
          marginTop: 18,
          fontSize: 34,
          fontWeight: 500,
          color: THEME.textSecondary,
          letterSpacing: -0.5,
          textAlign: "center",
          fontFamily: FONT_FAMILY,
        }}
      >
        6-Axis Robotic Arm • Architecture & Kinematics
      </div>

      <div style={{ marginTop: 20 }}>
        <MinimalistRoboticArm size={620} />
      </div>
    </div>
  );
};

// ─── Scene 2: Failure Analysis (239 - 445 frames = 8.0 - 14.8s) ───
const FailureAnalysisScene: React.FC = () => {
  return (
    <FrostedSketchCard
      imageSrc="images/hour_01_old_arm_problems.png"
      badge="Failure Teardown"
      tagNumber="Hour 01"
      title="Eliminating Old Arm Weaknesses"
      description="Identified plastic gear stripping, joint flex, USB brownouts, and lack of base bearing."
    />
  );
};

// ─── Scene 3: Architecture & 6-DOF (445 - 790 frames = 14.8 - 26.3s) ───
const ArchitectureScene: React.FC = () => {
  const frame = useCurrentFrame();
  // Transition between system block diagram (Hour 3) and 6-DOF joint anatomy (Hour 4)
  const isSecondPart = frame > 175; // ~5.8s in
  return isSecondPart ? (
    <FrostedSketchCard
      imageSrc="images/hour_04_six_axis_dof.png"
      badge="Mechanical Kinematics"
      tagNumber="Hour 04"
      title="6-DOF Articulated Joint Map"
      description="Base yaw, shoulder pitch, elbow pitch, wrist pitch, wrist roll, and parallel gripper."
    />
  ) : (
    <FrostedSketchCard
      imageSrc="images/hour_03_system_architecture.png"
      badge="Hardware Architecture"
      tagNumber="Hour 03"
      title="ESP32 & PCA9685 Power Pipeline"
      description="I2C servo driver offload paired with external 5V 5A buck converter on common ground."
    />
  );
};

// ─── Scene 4: Torque & WebSockets (790 - 1144 frames = 26.3 - 38.1s) ───
const TorqueAndWirelessScene: React.FC = () => {
  const frame = useCurrentFrame();
  const isSecondPart = frame > 180; // ~6.0s in
  return isSecondPart ? (
    <FrostedSketchCard
      imageSrc="images/hour_09_wireless_pipeline.png"
      badge="Wireless Telemetry"
      tagNumber="Hour 09"
      title="Real-Time 50Hz WebSockets Pipeline"
      description="Under 20ms round-trip latency connecting web companion app to ESP32 firmware."
    />
  ) : (
    <FrostedSketchCard
      imageSrc="images/hour_05_torque_calculations.png"
      badge="Torque Calculations"
      tagNumber="Hour 05"
      title="Shoulder & Elbow Load Calculations"
      description="Calculated worst-case stall torque (>11 kg-cm) to size metal gear servos."
    />
  );
};

// ─── Scene 5: Turntable & Parts BOM (1144 - 1303 frames = 38.1 - 43.4s) ───
const MechanicalAndBOMScene: React.FC = () => {
  const frame = useCurrentFrame();
  const isSecondPart = frame > 80;
  return isSecondPart ? (
    <FrostedSketchCard
      imageSrc="images/hour_15_gripper_and_bom.png"
      badge="BOM Checklist"
      tagNumber="Hour 15"
      title="Parts Sourced & Ready for CAD"
      description="Full hardware checklist locked in: 6x servos, PCA9685, ESP32, and PETG filament."
    />
  ) : (
    <FrostedSketchCard
      imageSrc="images/hour_14_base_turntable.png"
      badge="Mechanical Engineering"
      tagNumber="Hour 14"
      title="Thrust Bearing Turntable Design"
      description="Ball bearing ring supports 100% of vertical weight, offloading the base servo shaft."
    />
  );
};

// ─── Scene 6: Outro (1303 - 1410 frames = 43.4 - 47.0s) ───
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: enter,
      }}
    >
      {/* Monogram Badge */}
      <div
        style={{
          width: 130,
          height: 130,
          borderRadius: 36,
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(40px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.7)",
          marginBottom: 36,
        }}
      >
        <span
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: THEME.textPrimary,
            fontFamily: FONT_FAMILY,
            letterSpacing: -1,
          }}
        >
          V<span style={{ color: THEME.accentOrange }}>3</span>
        </span>
      </div>

      <div
        style={{
          fontSize: 68,
          fontWeight: 800,
          color: THEME.textPrimary,
          fontFamily: FONT_FAMILY,
          letterSpacing: -2,
          textAlign: "center",
          lineHeight: 1.15,
        }}
      >
        15 Hours Complete.
      </div>

      <div
        style={{
          marginTop: 16,
          fontSize: 34,
          fontWeight: 500,
          color: THEME.textSecondary,
          fontFamily: FONT_FAMILY,
          letterSpacing: -0.5,
        }}
      >
        Next: 3D CAD Modeling & Firmware Testing
      </div>

      <div
        style={{
          marginTop: 50,
          padding: "14px 32px",
          borderRadius: 999,
          background: "rgba(255, 255, 255, 0.05)",
          border: `1px solid ${THEME.surfaceCardBorder}`,
          color: THEME.textSecondary,
          fontSize: 22,
          fontWeight: 500,
          fontFamily: FONT_FAMILY,
          letterSpacing: -0.2,
        }}
      >
        Valkarye V3 • Hack Club Half Life
      </div>
    </div>
  );
};

// ─── Apple Subtitle Bar (Synced to Voiceover) ───
const AppleSubtitleBar: React.FC = () => {
  const frame = useCurrentFrame();
  const currentSub = SUBTITLES.find((s) => frame >= s.start && frame < s.end);

  if (!currentSub) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 110,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        maxWidth: 920,
        padding: "16px 36px",
        borderRadius: 999,
        backgroundColor: "rgba(18, 18, 20, 0.88)",
        border: "1px solid rgba(255, 255, 255, 0.14)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontSize: 27,
          fontWeight: 600,
          color: THEME.textPrimary,
          fontFamily: FONT_FAMILY,
          letterSpacing: -0.4,
          lineHeight: 1.3,
        }}
      >
        {currentSub.text}
      </span>
    </div>
  );
};

// ─── Root Composition ───
export const Valkarye15HourReel: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        backgroundColor: THEME.bg,
        overflow: "hidden",
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* Studio Lighting */}
      <StudioStageLight />

      {/* Dynamic Island Header */}
      <DynamicIslandHeader />

      {/* Scene 1: Intro (0 - 239 frames) */}
      <Sequence from={0} durationInFrames={239} name="Intro">
        <IntroScene />
      </Sequence>

      {/* Scene 2: Failure Analysis (239 - 445 frames) */}
      <Sequence from={239} durationInFrames={206} name="Failure Analysis">
        <FailureAnalysisScene />
      </Sequence>

      {/* Scene 3: Architecture & 6-DOF (445 - 790 frames) */}
      <Sequence from={445} durationInFrames={345} name="Architecture & 6-DOF">
        <ArchitectureScene />
      </Sequence>

      {/* Scene 4: Torque & WebSockets (790 - 1144 frames) */}
      <Sequence from={790} durationInFrames={354} name="Torque & Wireless">
        <TorqueAndWirelessScene />
      </Sequence>

      {/* Scene 5: Turntable & Parts BOM (1144 - 1303 frames) */}
      <Sequence from={1144} durationInFrames={159} name="Turntable & BOM">
        <MechanicalAndBOMScene />
      </Sequence>

      {/* Scene 6: Outro (1303 - 1410 frames) */}
      <Sequence from={1303} durationInFrames={107} name="Outro">
        <OutroScene />
      </Sequence>

      {/* Apple Subtitles Bar */}
      <AppleSubtitleBar />

      {/* Voiceover Track */}
      <Audio src={staticFile("valkarye-15h-voice.mp3")} volume={1.0} premountFor={fps} />

      {/* Lo-Fi Background Music */}
      <Audio src={staticFile("bg-music.mp3")} volume={0.08} premountFor={fps} />
    </div>
  );
};
