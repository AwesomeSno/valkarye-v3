import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const THEME = {
  bg: "#000000",
  cardBg: "rgba(255, 255, 255, 0.04)",
  cardBorder: "rgba(255, 255, 255, 0.10)",
  textPrimary: "#f5f5f7",
  textSecondary: "#86868b",
  accentOrange: "#f56300",
  accentCopper: "#e0823c",
  accentGreen: "#30d158",
  accentBlue: "#2997ff",
};

const FONT_FAMILY =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif";

const SUBTITLES = [
  { start: 2, end: 32, text: "Hey everyone!" },
  {
    start: 32,
    end: 240,
    text: "The 20-hour sprint for Valkarye V3 is officially in the books, and here is how the final machine came together.",
  },
  {
    start: 240,
    end: 440,
    text: "Over the last five hours, we turned all the torque math and kinematic sketches into real, printable hardware.",
  },
  {
    start: 440,
    end: 812,
    text: "We modeled the 51105 thrust-bearing turntable, the bicep I-beam trusses with dual 608ZZ bearings, and a synchronized parallel gripper with soft silicone pads.",
  },
  {
    start: 812,
    end: 953,
    text: "All 3D printable STLs and parametric CAD files are ready.",
  },
  {
    start: 953,
    end: 1428,
    text: "On the electronics bench, the ESP32 firmware is dialed in at 50 hertz with S-curve smoothing, talking to the PCA9685 driver, and the live WebSockets dashboard responds on phone and laptop with under 16 millisecond latency.",
  },
  {
    start: 1428,
    end: 1546,
    text: "Twenty hours in, and Valkarye V3 is ready to build.",
  },
  {
    start: 1546,
    end: 1600,
    text: "Thanks for watching!",
  },
];

// ─── Studio Stage Light ───
const StudioStageLight: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: -150,
        left: "50%",
        transform: "translateX(-50%)",
        width: 1100,
        height: 850,
        background:
          "radial-gradient(circle, rgba(224, 130, 60, 0.08) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 75%)",
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
        transform: `translateX(-50%) scale(${enter})`,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 22px",
        borderRadius: 9999,
        background: "rgba(20, 20, 22, 0.85)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: THEME.accentGreen,
          boxShadow: `0 0 12px ${THEME.accentGreen}`,
        }}
      />
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 14,
          fontWeight: 600,
          color: THEME.textPrimary,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Valkarye V3 • 20h Sprint Complete
      </span>
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 13,
          fontWeight: 500,
          color: THEME.accentCopper,
          padding: "2px 8px",
          borderRadius: 6,
          background: "rgba(224, 130, 60, 0.15)",
        }}
      >
        Final Milestone
      </span>
    </div>
  );
};

// ─── Subtitle Caption Pill ───
const SubtitleDisplay: React.FC = () => {
  const frame = useCurrentFrame();
  const currentSub = SUBTITLES.find(
    (s) => frame >= s.start && frame < s.end
  );

  if (!currentSub) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: "50%",
        transform: "translateX(-50%)",
        width: 920,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          padding: "18px 28px",
          borderRadius: 20,
          background: "rgba(10, 10, 12, 0.88)",
          backdropFilter: "blur(28px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8)",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 27,
            fontWeight: 500,
            color: THEME.textPrimary,
            lineHeight: 1.35,
            letterSpacing: "-0.01em",
          }}
        >
          {currentSub.text}
        </span>
      </div>
    </div>
  );
};

// ─── Scene 1: 20-Hour Milestone Hero Card (Frames 0 - 240) ───
const Scene1Hero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardEnter = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 100 },
  });

  const imgScale = interpolate(frame, [0, 240], [1.0, 1.05], {
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
        padding: "0 60px",
        zIndex: 10,
        transform: `scale(${cardEnter})`,
        opacity: interpolate(frame, [0, 20, 220, 240], [0, 1, 1, 0]),
      }}
    >
      <div
        style={{
          width: "100%",
          borderRadius: 36,
          background: THEME.cardBg,
          backdropFilter: "blur(40px)",
          border: `1px solid ${THEME.cardBorder}`,
          padding: 24,
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.7)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 720,
            borderRadius: 24,
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <img
            src={staticFile("assets/valkarye_cover_image.jpg")}
            alt="Valkarye V3 Cover"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${imgScale})`,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 200,
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 28,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 14,
                fontWeight: 600,
                color: THEME.accentCopper,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Hardware Complete
            </span>
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 34,
                fontWeight: 700,
                color: THEME.textPrimary,
                letterSpacing: "-0.02em",
              }}
            >
              Valkarye V3 Desktop Arm
            </span>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 16,
            marginTop: 20,
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderRadius: 18,
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span style={{ fontFamily: FONT_FAMILY, fontSize: 13, color: THEME.textSecondary }}>
              Kinematic Axes
            </span>
            <span style={{ fontFamily: FONT_FAMILY, fontSize: 26, fontWeight: 700, color: THEME.textPrimary }}>
              6 Degrees
            </span>
          </div>
          <div
            style={{
              padding: "16px 20px",
              borderRadius: 18,
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span style={{ fontFamily: FONT_FAMILY, fontSize: 13, color: THEME.textSecondary }}>
              Total Time
            </span>
            <span style={{ fontFamily: FONT_FAMILY, fontSize: 26, fontWeight: 700, color: THEME.accentCopper }}>
              20h Sprint
            </span>
          </div>
          <div
            style={{
              padding: "16px 20px",
              borderRadius: 18,
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span style={{ fontFamily: FONT_FAMILY, fontSize: 13, color: THEME.textSecondary }}>
              Latency
            </span>
            <span style={{ fontFamily: FONT_FAMILY, fontSize: 26, fontWeight: 700, color: THEME.accentGreen }}>
              &lt;16 ms
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Scene 2: Kinematics to 3D CAD Morph (Frames 240 - 520) ───
const Scene2CADTransition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = frame - 240;
  if (relFrame < 0 || relFrame > 280) return null;

  const cardEnter = spring({
    frame: relFrame,
    fps,
    config: { damping: 16, stiffness: 100 },
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
        padding: "0 60px",
        zIndex: 10,
        transform: `scale(${cardEnter})`,
        opacity: interpolate(relFrame, [0, 20, 260, 280], [0, 1, 1, 0]),
      }}
    >
      <div
        style={{
          width: "100%",
          borderRadius: 36,
          background: THEME.cardBg,
          backdropFilter: "blur(40px)",
          border: `1px solid ${THEME.cardBorder}`,
          padding: 30,
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.7)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <span style={{ fontFamily: FONT_FAMILY, fontSize: 14, fontWeight: 600, color: THEME.accentBlue, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Kinematic Transformation
            </span>
            <h2 style={{ fontFamily: FONT_FAMILY, fontSize: 32, fontWeight: 700, color: THEME.textPrimary, margin: "4px 0 0 0" }}>
              Math to 3D CAD Hardware
            </h2>
          </div>
          <span style={{ fontFamily: FONT_FAMILY, fontSize: 13, color: THEME.textSecondary, padding: "6px 14px", borderRadius: 8, background: "rgba(255, 255, 255, 0.05)" }}>
            Hours 16 - 18
          </span>
        </div>

        <div
          style={{
            width: "100%",
            height: 680,
            borderRadius: 24,
            overflow: "hidden",
            background: "#1e222a",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={staticFile("assets/cad_model_preview.png")}
            alt="3D CAD Assembly"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transform: `scale(${interpolate(relFrame, [0, 280], [1.02, 1.07])})`,
            }}
          />
        </div>

        <div style={{ marginTop: 22, display: "flex", gap: 14 }}>
          <div style={{ flex: 1, padding: "14px 18px", borderRadius: 14, background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
            <span style={{ fontFamily: FONT_FAMILY, fontSize: 12, color: THEME.textSecondary }}>Bicep Truss</span>
            <p style={{ fontFamily: FONT_FAMILY, fontSize: 16, fontWeight: 600, color: THEME.textPrimary, margin: "2px 0 0 0" }}>
              140mm I-Beam (82g)
            </p>
          </div>
          <div style={{ flex: 1, padding: "14px 18px", borderRadius: 14, background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
            <span style={{ fontFamily: FONT_FAMILY, fontSize: 12, color: THEME.textSecondary }}>Elbow Pivot</span>
            <p style={{ fontFamily: FONT_FAMILY, fontSize: 16, fontWeight: 600, color: THEME.textPrimary, margin: "2px 0 0 0" }}>
              Dual 608ZZ Bearings
            </p>
          </div>
          <div style={{ flex: 1, padding: "14px 18px", borderRadius: 14, background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
            <span style={{ fontFamily: FONT_FAMILY, fontSize: 12, color: THEME.textSecondary }}>Reach Envelope</span>
            <p style={{ fontFamily: FONT_FAMILY, fontSize: 16, fontWeight: 600, color: THEME.textPrimary, margin: "2px 0 0 0" }}>
              330mm Spherical
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Scene 3: Bearing Turntable & Gripper Mechanics (Frames 520 - 870) ───
const Scene3Mechanics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = frame - 520;
  if (relFrame < 0 || relFrame > 350) return null;

  const cardEnter = spring({
    frame: relFrame,
    fps,
    config: { damping: 16, stiffness: 100 },
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
        padding: "0 60px",
        zIndex: 10,
        transform: `scale(${cardEnter})`,
        opacity: interpolate(relFrame, [0, 20, 330, 350], [0, 1, 1, 0]),
      }}
    >
      <div
        style={{
          width: "100%",
          borderRadius: 36,
          background: THEME.cardBg,
          backdropFilter: "blur(40px)",
          border: `1px solid ${THEME.cardBorder}`,
          padding: 30,
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.7)",
        }}
      >
        <span style={{ fontFamily: FONT_FAMILY, fontSize: 14, fontWeight: 600, color: THEME.accentCopper, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Mechanical Architecture
        </span>
        <h2 style={{ fontFamily: FONT_FAMILY, fontSize: 32, fontWeight: 700, color: THEME.textPrimary, margin: "4px 0 20px 0" }}>
          Thrust Turntable &amp; Parallel Gripper
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Left: Turntable Cross Section */}
          <div
            style={{
              borderRadius: 20,
              background: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              padding: 12,
              height: 480,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <span style={{ fontFamily: FONT_FAMILY, fontSize: 14, fontWeight: 600, color: "#111111", margin: "4px 0 8px 0" }}>
              51105 Thrust Bearing Base
            </span>
            <img
              src={staticFile("assets/base_turntable_section.png")}
              alt="Turntable"
              style={{ width: "100%", height: "85%", objectFit: "contain" }}
            />
          </div>

          {/* Right: Gripper Mechanism */}
          <div
            style={{
              borderRadius: 20,
              background: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              padding: 12,
              height: 480,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <span style={{ fontFamily: FONT_FAMILY, fontSize: 14, fontWeight: 600, color: "#111111", margin: "4px 0 8px 0" }}>
              Dual-Rack Parallel Jaws
            </span>
            <img
              src={staticFile("assets/gripper_mechanism.png")}
              alt="Gripper"
              style={{ width: "100%", height: "85%", objectFit: "contain" }}
            />
          </div>
        </div>

        <div style={{ marginTop: 22, display: "flex", gap: 14 }}>
          <div style={{ flex: 1, padding: "14px 18px", borderRadius: 14, background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
            <span style={{ fontFamily: FONT_FAMILY, fontSize: 12, color: THEME.textSecondary }}>Base Rigidity</span>
            <p style={{ fontFamily: FONT_FAMILY, fontSize: 16, fontWeight: 600, color: THEME.textPrimary, margin: "2px 0 0 0" }}>
              Zero Servo Wobble
            </p>
          </div>
          <div style={{ flex: 1, padding: "14px 18px", borderRadius: 14, background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
            <span style={{ fontFamily: FONT_FAMILY, fontSize: 12, color: THEME.textSecondary }}>Grip Force</span>
            <p style={{ fontFamily: FONT_FAMILY, fontSize: 16, fontWeight: 600, color: THEME.textPrimary, margin: "2px 0 0 0" }}>
              ~1.45 kg Pinch
            </p>
          </div>
          <div style={{ flex: 1, padding: "14px 18px", borderRadius: 14, background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
            <span style={{ fontFamily: FONT_FAMILY, fontSize: 12, color: THEME.textSecondary }}>Jaw Stroke</span>
            <p style={{ fontFamily: FONT_FAMILY, fontSize: 16, fontWeight: 600, color: THEME.textPrimary, margin: "2px 0 0 0" }}>
              0 to 65 mm Wide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Scene 4: 3D Printable Models & CAD Files (Frames 870 - 1040) ───
const Scene4PrintableCAD: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = frame - 870;
  if (relFrame < 0 || relFrame > 170) return null;

  const cardEnter = spring({
    frame: relFrame,
    fps,
    config: { damping: 16, stiffness: 100 },
  });

  const checklist = [
    { title: "01_base_housing.stl", sub: "Flared 165mm pedestal with M4 clamp lugs", pass: true },
    { title: "02_turntable_plate.stl", sub: "51105 thrust race pilot boss", pass: true },
    { title: "03_shoulder_bracket.stl", sub: "Double-shear clevis with servo lock", pass: true },
    { title: "04_bicep_truss.stl", sub: "140mm I-beam truss with 608ZZ seats", pass: true },
    { title: "08_gripper_frame.stl", sub: "Synchronized dual-rack linear guides", pass: true },
    { title: "valkarye_v3_assembly.step", sub: "Universal ISO 10303-21 STEP CAD", pass: true },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
        zIndex: 10,
        transform: `scale(${cardEnter})`,
        opacity: interpolate(relFrame, [0, 15, 155, 170], [0, 1, 1, 0]),
      }}
    >
      <div
        style={{
          width: "100%",
          borderRadius: 36,
          background: THEME.cardBg,
          backdropFilter: "blur(40px)",
          border: `1px solid ${THEME.cardBorder}`,
          padding: 36,
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.7)",
        }}
      >
        <span style={{ fontFamily: FONT_FAMILY, fontSize: 14, fontWeight: 600, color: THEME.accentGreen, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Exported Assets
        </span>
        <h2 style={{ fontFamily: FONT_FAMILY, fontSize: 34, fontWeight: 700, color: THEME.textPrimary, margin: "4px 0 24px 0" }}>
          Full 3D Printable STL &amp; CAD Suite
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {checklist.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderRadius: 16,
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "rgba(48, 209, 88, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: THEME.accentGreen,
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  ✓
                </div>
                <div>
                  <p style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 600, color: THEME.textPrimary, margin: 0 }}>
                    {item.title}
                  </p>
                  <p style={{ fontFamily: FONT_FAMILY, fontSize: 13, color: THEME.textSecondary, margin: "2px 0 0 0" }}>
                    {item.sub}
                  </p>
                </div>
              </div>
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 12,
                  fontWeight: 600,
                  color: THEME.accentGreen,
                  padding: "4px 10px",
                  borderRadius: 6,
                  background: "rgba(48, 209, 88, 0.1)",
                }}
              >
                READY
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Scene 5: Bench Electronics & WebSockets Loop (Frames 1040 - 1428) ───
const Scene5ElectronicsWebSockets: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = frame - 1040;
  if (relFrame < 0 || relFrame > 388) return null;

  const cardEnter = spring({
    frame: relFrame,
    fps,
    config: { damping: 16, stiffness: 100 },
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
        padding: "0 60px",
        zIndex: 10,
        transform: `scale(${cardEnter})`,
        opacity: interpolate(relFrame, [0, 20, 368, 388], [0, 1, 1, 0]),
      }}
    >
      <div
        style={{
          width: "100%",
          borderRadius: 36,
          background: THEME.cardBg,
          backdropFilter: "blur(40px)",
          border: `1px solid ${THEME.cardBorder}`,
          padding: 30,
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.7)",
        }}
      >
        <span style={{ fontFamily: FONT_FAMILY, fontSize: 14, fontWeight: 600, color: THEME.accentGreen, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Bench Calibration
        </span>
        <h2 style={{ fontFamily: FONT_FAMILY, fontSize: 32, fontWeight: 700, color: THEME.textPrimary, margin: "4px 0 20px 0" }}>
          50Hz WebSockets &amp; PCA9685
        </h2>

        <div
          style={{
            width: "100%",
            height: 480,
            borderRadius: 20,
            overflow: "hidden",
            background: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={staticFile("assets/wiring_schematic.png")}
            alt="Wiring Schematic"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>

        {/* Telemetry live status strip */}
        <div
          style={{
            marginTop: 20,
            padding: "16px 22px",
            borderRadius: 18,
            background: "rgba(10, 10, 12, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: THEME.accentGreen, boxShadow: `0 0 10px ${THEME.accentGreen}` }} />
            <span style={{ fontFamily: "monospace", fontSize: 15, color: THEME.textPrimary }}>
              ws://192.168.4.1/ws (50Hz)
            </span>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ fontFamily: FONT_FAMILY, fontSize: 14, color: THEME.accentGreen, fontWeight: 600 }}>
              14ms Round-Trip
            </span>
            <span style={{ fontFamily: FONT_FAMILY, fontSize: 14, color: THEME.accentCopper, fontWeight: 600 }}>
              5.18V Steady Rail
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Scene 6: Grand Outro (Frames 1428 - 1650) ───
const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = frame - 1428;
  if (relFrame < 0) return null;

  const enter = spring({
    frame: relFrame,
    fps,
    config: { damping: 18, stiffness: 100 },
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
        padding: "0 60px",
        zIndex: 10,
        transform: `scale(${enter})`,
        opacity: interpolate(relFrame, [0, 20], [0, 1]),
      }}
    >
      <div
        style={{
          width: "100%",
          borderRadius: 36,
          background: THEME.cardBg,
          backdropFilter: "blur(40px)",
          border: `1px solid ${THEME.cardBorder}`,
          padding: 48,
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.7)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: 26,
            background: "linear-gradient(135deg, #e0823c 0%, #f56300 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 16px 36px rgba(245, 99, 0, 0.35)",
            marginBottom: 28,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 42,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.03em",
            }}
          >
            V3
          </span>
        </div>

        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 14,
            fontWeight: 600,
            color: THEME.accentCopper,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Hack Club Half Life
        </span>

        <h1
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 44,
            fontWeight: 800,
            color: THEME.textPrimary,
            letterSpacing: "-0.02em",
            margin: "0 0 12px 0",
          }}
        >
          Valkarye V3
        </h1>

        <p
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 20,
            color: THEME.textSecondary,
            maxWidth: 580,
            lineHeight: 1.4,
            margin: "0 0 32px 0",
          }}
        >
          20 Hours Complete • Full 3D CAD, STLs, ESP32 Firmware &amp; WebSockets Control
        </p>

        <div
          style={{
            padding: "14px 28px",
            borderRadius: 9999,
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontFamily: FONT_FAMILY, fontSize: 16, fontWeight: 600, color: THEME.textPrimary }}>
            github.com/AwesomeSno/valkarye-v3
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN COMPOSITION: ValkaryeFinishingReel ───
export const ValkaryeFinishingReel: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.bg,
        fontFamily: FONT_FAMILY,
        overflow: "hidden",
      }}
    >
      {/* Cinematic Background Audio Bed */}
      <Audio src={staticFile("bg-music.mp3")} volume={0.07} />

      {/* High-Fidelity Voiceover Audio */}
      <Audio
        src={staticFile("valkarye-finishing-voice.mp3")}
        volume={1.0}
      />

      {/* Studio Stage Light */}
      <StudioStageLight />

      {/* Floating Dynamic Island Header */}
      <DynamicIslandHeader />

      {/* Scene Transitions */}
      <Scene1Hero />
      <Scene2CADTransition />
      <Scene3Mechanics />
      <Scene4PrintableCAD />
      <Scene5ElectronicsWebSockets />
      <Scene6Outro />

      {/* Dynamic Subtitle Caption Pill */}
      <SubtitleDisplay />
    </AbsoluteFill>
  );
};
