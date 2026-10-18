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
  accentPurple: "#af52de",
};

const FONT_FAMILY =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif";

// ─── Subtitles Timed Cues (From Edge-TTS v2 audio) ───
const SUBTITLES_V2 = [
  {
    start: 2,
    end: 144,
    text: "What does the first 15 hours of building a 6-axis robotic arm look like?",
  },
  {
    start: 144,
    end: 364,
    text: "For Valkarye V3, it came down to solving three major engineering problems before touching any 3D printer.",
  },
  { start: 364, end: 400, text: "First was torque." },
  {
    start: 400,
    end: 594,
    text: "At full reach with a 250-gram payload, the shoulder demands over 11 kilogram-centimeters.",
  },
  { start: 594, end: 639, text: "Plastic gears were out." },
  {
    start: 639,
    end: 821,
    text: "We are using metal gear servos and a thrust ball bearing base so the motor shaft never takes vertical weight.",
  },
  { start: 821, end: 862, text: "Second was power." },
  {
    start: 862,
    end: 953,
    text: "Six servos under load can pull 4 amps peak.",
  },
  {
    start: 953,
    end: 1147,
    text: "I designed a dedicated 5-volt buck circuit with heavy smoothing capacitors to prevent brownouts.",
  },
  { start: 1147, end: 1215, text: "And third was wireless control." },
  {
    start: 1215,
    end: 1490,
    text: "I built a low-latency WebSockets pipeline on the ESP32 for sub-20-millisecond response to phone sliders and voice commands.",
  },
  {
    start: 1490,
    end: 1576,
    text: "15 hours down, architecture locked in.",
  },
  {
    start: 1576,
    end: 1663,
    text: "Next up is CAD modeling the joints.",
  },
  {
    start: 1663,
    end: 1720,
    text: "Stay tuned!",
  },
];

// ─── Overhead Studio Lighting ───
const StudioStageLight: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: -220,
        left: "50%",
        transform: "translateX(-50%)",
        width: 1050,
        height: 850,
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
          backgroundColor: THEME.accentOrange,
          boxShadow: `0 0 10px ${THEME.accentOrange}`,
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
        Engineering Deep Dive
      </span>
    </div>
  );
};

// ─── Dual Split Showcase Component ───
const DeepDiveSplitCard: React.FC<{
  leftImage: string;
  rightImage?: string;
  pillNumber: string;
  pillTitle: string;
  metricBadge: string;
  headline: string;
  subtext: string;
}> = ({
  leftImage,
  rightImage,
  pillNumber,
  pillTitle,
  metricBadge,
  headline,
  subtext,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 110 },
  });

  const subtleZoom = interpolate(frame, [0, 200], [1.0, 1.04], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 190,
        left: "50%",
        transform: `translateX(-50%) translateY(${(1 - enter) * 45}px) scale(${enter})`,
        width: 980,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Pillar Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "8px 24px",
          borderRadius: 999,
          background: "rgba(255, 255, 255, 0.06)",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          marginBottom: 18,
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
          {pillNumber}
        </span>
        <span style={{ color: THEME.textSecondary, fontSize: 14 }}>•</span>
        <span
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: THEME.textPrimary,
            fontFamily: FONT_FAMILY,
          }}
        >
          {pillTitle}
        </span>
        <span style={{ color: THEME.textSecondary, fontSize: 14 }}>•</span>
        <span
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: THEME.accentGreen,
            fontFamily: FONT_FAMILY,
          }}
        >
          {metricBadge}
        </span>
      </div>

      {/* Main Glassmorphic Photo Frame */}
      <div
        style={{
          width: 960,
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
        {/* Diagram Area: Single or Side-by-Side */}
        <div
          style={{
            width: "100%",
            height: 620,
            borderRadius: 22,
            backgroundColor: "#ffffff",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: rightImage ? 12 : 0,
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.06)",
          }}
        >
          {rightImage ? (
            <>
              <div
                style={{
                  flex: 1,
                  height: "100%",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Img
                  src={staticFile(leftImage)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    transform: `scale(${subtleZoom})`,
                  }}
                />
              </div>
              <div
                style={{
                  width: 2,
                  height: "80%",
                  backgroundColor: "rgba(0,0,0,0.1)",
                }}
              />
              <div
                style={{
                  flex: 1,
                  height: "100%",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Img
                  src={staticFile(rightImage)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    transform: `scale(${subtleZoom})`,
                  }}
                />
              </div>
            </>
          ) : (
            <Img
              src={staticFile(leftImage)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                transform: `scale(${subtleZoom})`,
              }}
            />
          )}
        </div>

        {/* Headline & Description */}
        <div
          style={{
            width: "100%",
            marginTop: 24,
            padding: "0 10px",
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
            {headline}
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
            {subtext}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Scene 1: Hook (0 - 144 frames = 0 - 4.8s) ───
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
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
        padding: "0 60px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 28px",
          borderRadius: 999,
          background: "rgba(255, 255, 255, 0.06)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          marginBottom: 36,
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
          Robotics Architecture
        </span>
      </div>

      <div
        style={{
          fontSize: 78,
          fontWeight: 800,
          color: THEME.textPrimary,
          letterSpacing: -3,
          textAlign: "center",
          lineHeight: 1.1,
          fontFamily: FONT_FAMILY,
        }}
      >
        What Does 15 Hours of Robotics Look Like?
      </div>

      <div
        style={{
          marginTop: 24,
          fontSize: 34,
          fontWeight: 400,
          color: THEME.textSecondary,
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          lineHeight: 1.4,
          maxWidth: 820,
        }}
      >
        Engineering Valkarye V3 from the ground up to eliminate all previous failure points.
      </div>
    </div>
  );
};

// ─── Scene 2: The 3 Core Problems (144 - 364 frames = 4.8 - 12.1s) ───
const ThreeProblemsIntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const p1 = spring({ frame: frame - 10, fps, config: { damping: 16 } });
  const p2 = spring({ frame: frame - 35, fps, config: { damping: 16 } });
  const p3 = spring({ frame: frame - 60, fps, config: { damping: 16 } });

  const cards = [
    {
      num: "01",
      title: "Torque & Joint Load",
      desc: "Shoulder torque calculation and base thrust bearing",
      accent: THEME.accentOrange,
      anim: p1,
    },
    {
      num: "02",
      title: "High-Current Power",
      desc: "Buck step-down circuit & brownout protection",
      accent: THEME.accentBlue,
      anim: p2,
    },
    {
      num: "03",
      title: "Low-Latency Wireless",
      desc: "50Hz real-time WebSockets & voice intent pipeline",
      accent: THEME.accentGreen,
      anim: p3,
    },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 240,
        left: "50%",
        transform: "translateX(-50%)",
        width: 960,
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <div
        style={{
          fontSize: 44,
          fontWeight: 800,
          color: THEME.textPrimary,
          letterSpacing: -1,
          fontFamily: FONT_FAMILY,
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        3 Major Problems to Solve
      </div>

      {cards.map((c, i) => (
        <div
          key={i}
          style={{
            padding: "36px 44px",
            borderRadius: 28,
            backgroundColor: THEME.surfaceCard,
            border: `1px solid ${THEME.surfaceCardBorder}`,
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            display: "flex",
            alignItems: "center",
            gap: 32,
            opacity: c.anim,
            transform: `translateY(${(1 - c.anim) * 40}px)`,
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: c.accent,
              padding: "12px 24px",
              borderRadius: 18,
              background: "rgba(255, 255, 255, 0.08)",
              fontFamily: FONT_FAMILY,
            }}
          >
            {c.num}
          </div>
          <div>
            <div
              style={{
                fontSize: 34,
                fontWeight: 700,
                color: THEME.textPrimary,
                letterSpacing: -0.5,
                fontFamily: FONT_FAMILY,
              }}
            >
              {c.title}
            </div>
            <div
              style={{
                marginTop: 6,
                fontSize: 22,
                color: THEME.textSecondary,
                fontFamily: FONT_FAMILY,
              }}
            >
              {c.desc}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Scene 3: Problem 1 - Torque (364 - 821 frames = 12.1 - 27.4s) ───
const Problem1TorqueScene: React.FC = () => {
  const frame = useCurrentFrame();
  const showBearing = frame > 230; // ~7.6s in
  return (
    <DeepDiveSplitCard
      leftImage="images/hour_05_torque_calculations.png"
      rightImage={showBearing ? "images/hour_14_base_turntable.png" : undefined}
      pillNumber="Problem 01"
      pillTitle="Torque & Mechanical Load"
      metricBadge="> 11.3 kg-cm"
      headline="Eliminating Joint Flex & Gear Stripping"
      subtext="Worst-case torque at 27cm reach requires heavy metal gears and a 51105 thrust bearing base."
    />
  );
};

// ─── Scene 4: Problem 2 - Power (821 - 1147 frames = 27.4 - 38.2s) ───
const Problem2PowerScene: React.FC = () => {
  return (
    <DeepDiveSplitCard
      leftImage="images/hour_07_power_distribution.png"
      rightImage="images/hour_03_system_architecture.png"
      pillNumber="Problem 02"
      pillTitle="Power Delivery & Brownouts"
      metricBadge="5.2V 5A Peak"
      headline="Decoupled Servo Power Supply"
      subtext="High-current buck regulator with 1000uF smoothing capacitors prevents MCU reset brownouts."
    />
  );
};

// ─── Scene 5: Problem 3 - Wireless (1147 - 1490 frames = 38.2 - 49.7s) ───
const Problem3WirelessScene: React.FC = () => {
  return (
    <DeepDiveSplitCard
      leftImage="images/hour_09_wireless_pipeline.png"
      rightImage="images/hour_10_packet_structure.png"
      pillNumber="Problem 03"
      pillTitle="Wireless Pipeline"
      metricBadge="< 18ms Latency"
      headline="50Hz WebSockets & JSON Telemetry"
      subtext="Sub-20ms real-time control loop connecting mobile/web apps and voice commands to the ESP32."
    />
  );
};

// ─── Scene 6: Milestone & Outro (1490 - 1720 frames = 49.7 - 57.3s) ───
const DeepDiveOutroScene: React.FC = () => {
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
          fontSize: 72,
          fontWeight: 800,
          color: THEME.textPrimary,
          fontFamily: FONT_FAMILY,
          letterSpacing: -2,
          textAlign: "center",
          lineHeight: 1.15,
        }}
      >
        Architecture Locked.
      </div>

      <div
        style={{
          marginTop: 18,
          fontSize: 34,
          fontWeight: 500,
          color: THEME.textSecondary,
          fontFamily: FONT_FAMILY,
          letterSpacing: -0.5,
        }}
      >
        Next Sprint: 3D CAD Modeling & Firmware
      </div>

      <div
        style={{
          marginTop: 48,
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
        15 Hours Logged • Hack Club Half Life
      </div>
    </div>
  );
};

// ─── Apple Subtitles Bar (Synced to Voiceover v2) ───
const AppleSubtitleBarV2: React.FC = () => {
  const frame = useCurrentFrame();
  const currentSub = SUBTITLES_V2.find((s) => frame >= s.start && frame < s.end);

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
export const Valkarye15HourDeepDive: React.FC = () => {
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

      {/* Scene 1: Hook (0 - 144 frames) */}
      <Sequence from={0} durationInFrames={144} name="Hook">
        <HookScene />
      </Sequence>

      {/* Scene 2: The 3 Problems Overview (144 - 364 frames) */}
      <Sequence from={144} durationInFrames={220} name="3 Problems Overview">
        <ThreeProblemsIntroScene />
      </Sequence>

      {/* Scene 3: Problem 1 - Torque (364 - 821 frames) */}
      <Sequence from={364} durationInFrames={457} name="Problem 1: Torque">
        <Problem1TorqueScene />
      </Sequence>

      {/* Scene 4: Problem 2 - Power (821 - 1147 frames) */}
      <Sequence from={821} durationInFrames={326} name="Problem 2: Power">
        <Problem2PowerScene />
      </Sequence>

      {/* Scene 5: Problem 3 - Wireless (1147 - 1490 frames) */}
      <Sequence from={1147} durationInFrames={343} name="Problem 3: Wireless">
        <Problem3WirelessScene />
      </Sequence>

      {/* Scene 6: Outro (1490 - 1720 frames) */}
      <Sequence from={1490} durationInFrames={230} name="Outro">
        <DeepDiveOutroScene />
      </Sequence>

      {/* Apple Subtitles Bar */}
      <AppleSubtitleBarV2 />

      {/* Voiceover Track */}
      <Audio src={staticFile("valkarye-15h-v2-voice.mp3")} volume={1.0} premountFor={fps} />

      {/* Lo-Fi Background Music */}
      <Audio src={staticFile("bg-music.mp3")} volume={0.08} premountFor={fps} />
    </div>
  );
};
