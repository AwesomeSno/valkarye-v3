import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  Easing,
  interpolate,
  Sequence,
  staticFile,
} from "remotion";
import { Audio } from "@remotion/media";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

// ─── Design Tokens ───
const COLORS = {
  bg: "#07090e",
  surface: "rgba(16, 22, 36, 0.88)",
  surfaceBorder: "rgba(0, 240, 255, 0.28)",
  cyan: "#00f0ff",
  cyanDim: "#00a8b8",
  amber: "#ff9d00",
  purple: "#9d4edd",
  green: "#00ff88",
  white: "#f8fafd",
  textMuted: "#94a3b8",
};

// ─── Particle & Background Elements ───
const CyberGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const offset = (frame * 1.2) % 80;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(to right, rgba(0, 240, 255, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 240, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        backgroundPosition: `0px ${offset}px`,
        pointerEvents: "none",
      }}
    />
  );
};

const RadialGlow: React.FC<{
  color: string;
  x: number;
  y: number;
  size: number;
  opacity?: number;
}> = ({ color, x, y, size, opacity = 0.3 }) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [opacity * 0.8, opacity * 1.2]
  );

  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: pulse,
        filter: `blur(${size * 0.25}px)`,
        pointerEvents: "none",
      }}
    />
  );
};

// ─── Header Badge ───
const TopBadge: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 75,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "12px 28px",
          borderRadius: 999,
          background: "rgba(10, 15, 26, 0.9)",
          border: `1.5px solid ${COLORS.surfaceBorder}`,
          boxShadow: `0 0 25px rgba(0, 240, 255, 0.2)`,
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: COLORS.cyan,
            boxShadow: `0 0 12px ${COLORS.cyan}`,
          }}
        />
        <span
          style={{
            color: COLORS.white,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 2,
            fontFamily,
          }}
        >
          VALKARYE V3
        </span>
        <span style={{ color: "rgba(255,255,255,0.3)" }}>•</span>
        <span
          style={{
            color: COLORS.amber,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 1.5,
            fontFamily,
          }}
        >
          HACK CLUB HALF LIFE
        </span>
      </div>
    </div>
  );
};

// ─── High-Tech Mechanical Robotic Arm SVG ───
const RoboticArmSVG: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();

  // Joint kinematics animations
  const j1Angle = -10 + Math.sin(frame * 0.05) * 15;
  const j2Angle = 45 + Math.cos(frame * 0.04) * 20;
  const j3Angle = -35 + Math.sin(frame * 0.045) * 15;
  const gripperOpen = 16 + Math.sin(frame * 0.06) * 12;

  return (
    <div
      style={{
        position: "relative",
        width: 700,
        height: 640,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        filter: "drop-shadow(0 0 20px rgba(0, 240, 255, 0.25))",
      }}
    >
      <svg
        width="700"
        height="640"
        viewBox="0 0 700 640"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="armLinkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#0077aa" />
          </linearGradient>
          <linearGradient id="forearmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#88ccff" />
          </linearGradient>
          <linearGradient id="jointGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff9d00" />
            <stop offset="100%" stopColor="#ff5500" />
          </linearGradient>
        </defs>

        {/* Circular Coordinate Grid Base */}
        <ellipse
          cx="350"
          cy="550"
          rx="240"
          ry="55"
          fill="none"
          stroke="rgba(0, 240, 255, 0.2)"
          strokeWidth="2"
          strokeDasharray="8 8"
        />
        <ellipse
          cx="350"
          cy="550"
          rx="180"
          ry="40"
          fill="rgba(0, 240, 255, 0.08)"
          stroke={COLORS.cyan}
          strokeWidth="3"
        />

        {/* Heavy Robotic Base Pedestal */}
        <polygon
          points="280,550 420,550 400,480 300,480"
          fill="#141a29"
          stroke={COLORS.cyan}
          strokeWidth="3"
        />
        {/* Base Turntable */}
        <ellipse
          cx="350"
          cy="480"
          rx="52"
          ry="16"
          fill="#1d263b"
          stroke={COLORS.cyan}
          strokeWidth="3"
        />

        {/* Shoulder Joint Pivot (at 350, 480) */}
        <circle cx="350" cy="480" r="24" fill="url(#jointGrad)" stroke="#fff" strokeWidth="3" />

        {/* Arm Assembly Hierarchical Group */}
        <g transform={`translate(350, 480) rotate(${j1Angle})`}>
          {/* Shoulder Linkage Structure (Dual Arm Trusses) */}
          <line x1="-10" y1="0" x2="-6" y2="-170" stroke="url(#armLinkGrad)" strokeWidth="16" strokeLinecap="round" />
          <line x1="10" y1="0" x2="6" y2="-170" stroke="url(#armLinkGrad)" strokeWidth="16" strokeLinecap="round" />
          {/* Hydraulic Cylinder */}
          <line x1="0" y1="-20" x2="0" y2="-150" stroke={COLORS.amber} strokeWidth="8" strokeLinecap="round" />

          {/* Elbow Joint (at 0, -170) */}
          <g transform={`translate(0, -170) rotate(${j2Angle})`}>
            {/* Elbow Gear housing */}
            <circle cx="0" cy="0" r="22" fill="#141a29" stroke={COLORS.cyan} strokeWidth="4" />
            <circle cx="0" cy="0" r="12" fill="url(#jointGrad)" />

            {/* Forearm Linkage */}
            <line x1="0" y1="0" x2="160" y2="-60" stroke="url(#forearmGrad)" strokeWidth="16" strokeLinecap="round" />
            <line x1="0" y1="0" x2="160" y2="-60" stroke={COLORS.cyan} strokeWidth="6" strokeDasharray="6 6" />

            {/* Wrist Joint (at 160, -60) */}
            <g transform={`translate(160, -60) rotate(${j3Angle})`}>
              <circle cx="0" cy="0" r="16" fill="url(#jointGrad)" stroke="#fff" strokeWidth="2" />

              {/* Wrist Extension */}
              <line x1="0" y1="0" x2="50" y2="-10" stroke="#fff" strokeWidth="10" strokeLinecap="round" />

              {/* Gripper End-Effector Assembly */}
              <g transform="translate(50, -10)">
                {/* Gripper Mount */}
                <rect x="-8" y="-18" width="16" height="36" rx="5" fill="#ff9d00" stroke="#fff" strokeWidth="2" />

                {/* Upper Finger */}
                <path
                  d={`M 0 -12 L 35 ${-gripperOpen} L 55 -6`}
                  stroke={COLORS.cyan}
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Lower Finger */}
                <path
                  d={`M 0 12 L 35 ${gripperOpen} L 55 6`}
                  stroke={COLORS.cyan}
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Picked-up Object: Glowing Cyber Core Cube */}
                <g transform="translate(55, -18)">
                  <rect
                    x="0"
                    y="0"
                    width="36"
                    height="36"
                    rx="8"
                    fill="rgba(255, 157, 0, 0.9)"
                    stroke="#ffffff"
                    strokeWidth="3"
                  />
                  <circle cx="18" cy="18" r="6" fill="#fff" />
                </g>
              </g>
            </g>
          </g>
        </g>

        {/* Live HUD Telemetry Card */}
        <g opacity={progress}>
          <rect
            x="30"
            y="60"
            width="220"
            height="140"
            rx="16"
            fill="rgba(12, 18, 30, 0.9)"
            stroke={COLORS.surfaceBorder}
            strokeWidth="2"
          />
          <text x="50" y="98" fill={COLORS.textMuted} fontSize="14" fontWeight="700" letterSpacing="1" fontFamily={fontFamily}>
            REAL-TIME KINEMATICS
          </text>
          <text x="50" y="130" fill={COLORS.cyan} fontSize="20" fontWeight="800" fontFamily={fontFamily}>
            BASE: {(j1Angle + 45).toFixed(1)}°
          </text>
          <text x="50" y="158" fill={COLORS.amber} fontSize="20" fontWeight="800" fontFamily={fontFamily}>
            ELBOW: {j2Angle.toFixed(1)}°
          </text>
          <text x="50" y="186" fill={COLORS.green} fontSize="18" fontWeight="800" fontFamily={fontFamily}>
            SERVO TORQUE: 18.5 kg·cm
          </text>
        </g>
      </svg>
    </div>
  );
};

// ─── Subtitles Component ───
const SUBTITLE_CUES = [
  { start: 0, end: 33, text: "Hey everyone!" },
  {
    start: 33,
    end: 234,
    text: "A few years back, I made a robotic arm just for fun, and today I'm finally bringing it back to life as Valkyrie V3.",
  },
  {
    start: 234,
    end: 555,
    text: "I kind of lost my old one, so I'm trying to remake it, make it even better so that it can actually move objects right now, respond to voice commands, and let you control every single axis of it with an app on your phone or desktop.",
  },
  {
    start: 555,
    end: 611,
    text: "Here's what I've done so far:",
  },
  {
    start: 611,
    end: 675,
    text: "• Laid out the core architecture",
  },
  {
    start: 675,
    end: 766,
    text: "• Planned the multi-axial servo configuration",
  },
  {
    start: 766,
    end: 920,
    text: "• Designed the wireless control pipeline for both the companion app and voice recognition",
  },
  {
    start: 920,
    end: 1188,
    text: "What I'm going to do next is list out the materials which I need to build this entire thing, model the joints of the arm in CAD, and start testing the motor drivers and firmware.",
  },
  {
    start: 1188,
    end: 1233,
    text: "Thank you for listening.",
  },
  {
    start: 1233,
    end: 1300,
    text: "See you in the next one!",
  },
];

const SubtitleBar: React.FC = () => {
  const frame = useCurrentFrame();
  const activeCue = SUBTITLE_CUES.find(
    (c) => frame >= c.start && frame < c.end
  );

  if (!activeCue) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 110,
        left: 40,
        right: 40,
        display: "flex",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <div
        style={{
          background: "rgba(10, 15, 26, 0.94)",
          border: `2px solid ${COLORS.cyan}`,
          boxShadow: `0 0 40px rgba(0, 240, 255, 0.35)`,
          padding: "22px 38px",
          borderRadius: 24,
          backdropFilter: "blur(18px)",
          maxWidth: 960,
          textAlign: "center",
        }}
      >
        <span
          style={{
            color: COLORS.white,
            fontSize: 34,
            fontWeight: 800,
            lineHeight: 1.35,
            fontFamily,
            letterSpacing: 0.5,
          }}
        >
          {activeCue.text}
        </span>
      </div>
    </div>
  );
};

// ─── SCENE 1 & 2: Intro & Return of Valkarye ───
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 180,
        opacity: enter,
      }}
    >
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: COLORS.cyan,
          letterSpacing: 6,
          textTransform: "uppercase",
          fontFamily,
          marginBottom: 12,
        }}
      >
        PROJECT RESURRECTION
      </div>

      <div
        style={{
          fontSize: 84,
          fontWeight: 900,
          color: COLORS.white,
          letterSpacing: -2,
          lineHeight: 1.05,
          textAlign: "center",
          fontFamily,
          maxWidth: 900,
          textShadow: `0 0 50px rgba(0, 240, 255, 0.45)`,
        }}
      >
        VALKARYE <span style={{ color: COLORS.amber }}>V3</span>
      </div>

      <div
        style={{
          marginTop: 16,
          fontSize: 30,
          fontWeight: 600,
          color: COLORS.textMuted,
          textAlign: "center",
          fontFamily,
          maxWidth: 820,
        }}
      >
        Reviving & Rebuilding the Robotic Arm Project
      </div>

      <div style={{ marginTop: 20 }}>
        <RoboticArmSVG progress={enter} />
      </div>
    </div>
  );
};

// ─── SCENE 3: The 3 Core Pillars ───
const CapabilitiesScene: React.FC = () => {
  const frame = useCurrentFrame();

  const card1Progress = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const card2Progress = interpolate(frame, [40, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const card3Progress = interpolate(frame, [75, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 180,
      }}
    >
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: COLORS.cyan,
          letterSpacing: 4,
          fontFamily,
        }}
      >
        THE NEW STANDARD
      </div>
      <div
        style={{
          fontSize: 64,
          fontWeight: 900,
          color: COLORS.white,
          fontFamily,
          marginTop: 8,
          marginBottom: 45,
          textAlign: "center",
        }}
      >
        Bigger, Smarter, Autonomous
      </div>

      {/* Feature 1: Physical Object Manipulation */}
      <div
        style={{
          width: 880,
          padding: "36px 42px",
          borderRadius: 24,
          background: COLORS.surface,
          border: `2px solid ${COLORS.cyan}`,
          display: "flex",
          alignItems: "center",
          gap: 32,
          marginBottom: 28,
          opacity: card1Progress,
          transform: `translateY(${(1 - card1Progress) * 35}px)`,
          boxShadow: "0 10px 40px rgba(0,0,0,0.4), 0 0 25px rgba(0, 240, 255, 0.15)",
        }}
      >
        <div
          style={{
            width: 86,
            height: 86,
            borderRadius: 22,
            background: "rgba(0, 240, 255, 0.15)",
            border: `2px solid ${COLORS.cyan}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 44,
          }}
        >
          🦾
        </div>
        <div>
          <div style={{ color: COLORS.white, fontSize: 36, fontWeight: 800, fontFamily }}>
            Physical Object Manipulation
          </div>
          <div style={{ color: COLORS.textMuted, fontSize: 24, marginTop: 8, fontFamily, lineHeight: 1.3 }}>
            Engineered to grasp, lift, and maneuver real objects in 3D workspace
          </div>
        </div>
      </div>

      {/* Feature 2: Voice Command Engine */}
      <div
        style={{
          width: 880,
          padding: "36px 42px",
          borderRadius: 24,
          background: COLORS.surface,
          border: `2px solid ${COLORS.amber}`,
          display: "flex",
          alignItems: "center",
          gap: 32,
          marginBottom: 28,
          opacity: card2Progress,
          transform: `translateY(${(1 - card2Progress) * 35}px)`,
          boxShadow: "0 10px 40px rgba(0,0,0,0.4), 0 0 25px rgba(255, 157, 0, 0.15)",
        }}
      >
        <div
          style={{
            width: 86,
            height: 86,
            borderRadius: 22,
            background: "rgba(255, 157, 0, 0.15)",
            border: `2px solid ${COLORS.amber}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 44,
          }}
        >
          🎙️
        </div>
        <div>
          <div style={{ color: COLORS.white, fontSize: 36, fontWeight: 800, fontFamily }}>
            Voice Control Recognition
          </div>
          <div style={{ color: COLORS.textMuted, fontSize: 24, marginTop: 8, fontFamily, lineHeight: 1.3 }}>
            Speech recognition pipeline parses commands for hands-free tasks
          </div>
        </div>
      </div>

      {/* Feature 3: Phone & Desktop App */}
      <div
        style={{
          width: 880,
          padding: "36px 42px",
          borderRadius: 24,
          background: COLORS.surface,
          border: `2px solid ${COLORS.purple}`,
          display: "flex",
          alignItems: "center",
          gap: 32,
          opacity: card3Progress,
          transform: `translateY(${(1 - card3Progress) * 35}px)`,
          boxShadow: "0 10px 40px rgba(0,0,0,0.4), 0 0 25px rgba(157, 78, 221, 0.15)",
        }}
      >
        <div
          style={{
            width: 86,
            height: 86,
            borderRadius: 22,
            background: "rgba(157, 78, 221, 0.15)",
            border: `2px solid ${COLORS.purple}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 44,
          }}
        >
          📱
        </div>
        <div>
          <div style={{ color: COLORS.white, fontSize: 36, fontWeight: 800, fontFamily }}>
            Smartphone & Desktop App
          </div>
          <div style={{ color: COLORS.textMuted, fontSize: 24, marginTop: 8, fontFamily, lineHeight: 1.3 }}>
            Granular single-axis manual sliders + automated motion routines
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SCENE 4: What I Have Done So Far ───
const WhatIDidScene: React.FC = () => {
  const frame = useCurrentFrame();

  const item1 = interpolate(frame, [5, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const item2 = interpolate(frame, [35, 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const item3 = interpolate(frame, [65, 88], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 180,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 24px",
          borderRadius: 999,
          background: "rgba(0, 255, 136, 0.12)",
          border: "1px solid rgba(0, 255, 136, 0.4)",
          color: COLORS.green,
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 2,
          fontFamily,
          marginBottom: 14,
        }}
      >
        PROGRESS REPORT
      </div>
      <div
        style={{
          fontSize: 64,
          fontWeight: 900,
          color: COLORS.white,
          fontFamily,
          marginBottom: 44,
        }}
      >
        Here's What I've Done So Far
      </div>

      <div style={{ width: 880, display: "flex", flexDirection: "column", gap: 26 }}>
        {/* Step 1 */}
        <div
          style={{
            padding: "32px 38px",
            borderRadius: 22,
            background: COLORS.surface,
            border: `2px solid ${COLORS.green}`,
            display: "flex",
            alignItems: "center",
            gap: 26,
            opacity: item1,
            transform: `translateX(${(1 - item1) * -40}px)`,
            boxShadow: "0 0 30px rgba(0, 255, 136, 0.12)",
          }}
        >
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              background: COLORS.green,
              color: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 900,
            }}
          >
            ✓
          </div>
          <div>
            <div style={{ color: COLORS.white, fontSize: 34, fontWeight: 800, fontFamily }}>
              Laid Out Core Architecture
            </div>
            <div style={{ color: COLORS.textMuted, fontSize: 23, marginTop: 6, fontFamily }}>
              Complete block diagram, electrical power rail & microcontroller setup
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div
          style={{
            padding: "32px 38px",
            borderRadius: 22,
            background: COLORS.surface,
            border: `2px solid ${COLORS.green}`,
            display: "flex",
            alignItems: "center",
            gap: 26,
            opacity: item2,
            transform: `translateX(${(1 - item2) * -40}px)`,
            boxShadow: "0 0 30px rgba(0, 255, 136, 0.12)",
          }}
        >
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              background: COLORS.green,
              color: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 900,
            }}
          >
            ✓
          </div>
          <div>
            <div style={{ color: COLORS.white, fontSize: 34, fontWeight: 800, fontFamily }}>
              Multi-Axial Servo Joint Layout
            </div>
            <div style={{ color: COLORS.textMuted, fontSize: 23, marginTop: 6, fontFamily }}>
              Full DOF mapping for base turntable, dual arm links & mechanical claw
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div
          style={{
            padding: "32px 38px",
            borderRadius: 22,
            background: COLORS.surface,
            border: `2px solid ${COLORS.green}`,
            display: "flex",
            alignItems: "center",
            gap: 26,
            opacity: item3,
            transform: `translateX(${(1 - item3) * -40}px)`,
            boxShadow: "0 0 30px rgba(0, 255, 136, 0.12)",
          }}
        >
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              background: COLORS.green,
              color: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 900,
            }}
          >
            ✓
          </div>
          <div>
            <div style={{ color: COLORS.white, fontSize: 34, fontWeight: 800, fontFamily }}>
              Wireless Control Pipeline
            </div>
            <div style={{ color: COLORS.textMuted, fontSize: 23, marginTop: 6, fontFamily }}>
              BLE / Wi-Fi telemetry path for companion app & voice recognition
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SCENE 5: What's Next ───
const WhatNextScene: React.FC = () => {
  const frame = useCurrentFrame();

  const step1 = interpolate(frame, [5, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const step2 = interpolate(frame, [35, 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const step3 = interpolate(frame, [65, 88], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 180,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 24px",
          borderRadius: 999,
          background: "rgba(255, 157, 0, 0.12)",
          border: "1px solid rgba(255, 157, 0, 0.4)",
          color: COLORS.amber,
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 2,
          fontFamily,
          marginBottom: 14,
        }}
      >
        NEXT SPRINT
      </div>
      <div
        style={{
          fontSize: 64,
          fontWeight: 900,
          color: COLORS.white,
          fontFamily,
          marginBottom: 44,
        }}
      >
        What I'm Gonna Do Next
      </div>

      <div style={{ width: 880, display: "flex", flexDirection: "column", gap: 26 }}>
        {/* Next 1 */}
        <div
          style={{
            padding: "32px 38px",
            borderRadius: 22,
            background: COLORS.surface,
            border: `2px solid ${COLORS.amber}`,
            display: "flex",
            alignItems: "center",
            gap: 28,
            opacity: step1,
            transform: `translateY(${(1 - step1) * 30}px)`,
            boxShadow: "0 0 30px rgba(255, 157, 0, 0.15)",
          }}
        >
          <div
            style={{
              fontSize: 34,
              fontWeight: 900,
              color: COLORS.amber,
              fontFamily,
              padding: "10px 20px",
              borderRadius: 16,
              background: "rgba(255, 157, 0, 0.15)",
              border: `1.5px solid ${COLORS.amber}`,
            }}
          >
            01
          </div>
          <div>
            <div style={{ color: COLORS.white, fontSize: 34, fontWeight: 800, fontFamily }}>
              List Out All Build Materials
            </div>
            <div style={{ color: COLORS.textMuted, fontSize: 23, marginTop: 6, fontFamily }}>
              Full BOM inventory: MG996R metal-gear servos, bearings & wiring
            </div>
          </div>
        </div>

        {/* Next 2 */}
        <div
          style={{
            padding: "32px 38px",
            borderRadius: 22,
            background: COLORS.surface,
            border: `2px solid ${COLORS.cyan}`,
            display: "flex",
            alignItems: "center",
            gap: 28,
            opacity: step2,
            transform: `translateY(${(1 - step2) * 30}px)`,
            boxShadow: "0 0 30px rgba(0, 240, 255, 0.15)",
          }}
        >
          <div
            style={{
              fontSize: 34,
              fontWeight: 900,
              color: COLORS.cyan,
              fontFamily,
              padding: "10px 20px",
              borderRadius: 16,
              background: "rgba(0, 240, 255, 0.15)",
              border: `1.5px solid ${COLORS.cyan}`,
            }}
          >
            02
          </div>
          <div>
            <div style={{ color: COLORS.white, fontSize: 34, fontWeight: 800, fontFamily }}>
              Model Joints in 3D CAD
            </div>
            <div style={{ color: COLORS.textMuted, fontSize: 23, marginTop: 6, fontFamily }}>
              Designing custom 3D-printable arm brackets, hinges & gripper claw
            </div>
          </div>
        </div>

        {/* Next 3 */}
        <div
          style={{
            padding: "32px 38px",
            borderRadius: 22,
            background: COLORS.surface,
            border: `2px solid ${COLORS.purple}`,
            display: "flex",
            alignItems: "center",
            gap: 28,
            opacity: step3,
            transform: `translateY(${(1 - step3) * 30}px)`,
            boxShadow: "0 0 30px rgba(157, 78, 221, 0.15)",
          }}
        >
          <div
            style={{
              fontSize: 34,
              fontWeight: 900,
              color: COLORS.purple,
              fontFamily,
              padding: "10px 20px",
              borderRadius: 16,
              background: "rgba(157, 78, 221, 0.15)",
              border: `1.5px solid ${COLORS.purple}`,
            }}
          >
            03
          </div>
          <div>
            <div style={{ color: COLORS.white, fontSize: 34, fontWeight: 800, fontFamily }}>
              Test Motor Drivers & Firmware
            </div>
            <div style={{ color: COLORS.textMuted, fontSize: 23, marginTop: 6, fontFamily }}>
              Bench-testing PCA9685 PWM driver, servo angle calibration & limits
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SCENE 6: Outro ───
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
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
          width: 140,
          height: 140,
          borderRadius: 36,
          background: "linear-gradient(135deg, #00f0ff 0%, #ff9d00 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 72,
          boxShadow: `0 0 60px rgba(0, 240, 255, 0.45)`,
          marginBottom: 36,
        }}
      >
        👋
      </div>

      <div
        style={{
          fontSize: 68,
          fontWeight: 900,
          color: COLORS.white,
          fontFamily,
          textAlign: "center",
          lineHeight: 1.15,
        }}
      >
        Thanks For Listening!
      </div>

      <div
        style={{
          marginTop: 18,
          fontSize: 38,
          fontWeight: 800,
          color: COLORS.cyan,
          fontFamily,
        }}
      >
        See You In The Next One 🚀
      </div>

      <div
        style={{
          marginTop: 50,
          padding: "16px 36px",
          borderRadius: 999,
          background: "rgba(10, 16, 28, 0.9)",
          border: `1.5px solid ${COLORS.surfaceBorder}`,
          color: COLORS.textMuted,
          fontSize: 26,
          fontWeight: 700,
          fontFamily,
        }}
      >
        Valkarye V3 • Hack Club Half Life
      </div>
    </div>
  );
};

// ─── MAIN COMPOSITION ───
export const ValkaryeReel: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        backgroundColor: COLORS.bg,
        overflow: "hidden",
        fontFamily,
      }}
    >
      {/* Background Ambience */}
      <CyberGrid />
      <RadialGlow color="#00f0ff" x={220} y={450} size={750} opacity={0.25} />
      <RadialGlow color="#ff9d00" x={860} y={1300} size={750} opacity={0.2} />

      {/* Global Header */}
      <TopBadge />

      {/* Scene 1 & 2: Intro (0 - 234 frames = 0 - 7.8s) */}
      <Sequence from={0} durationInFrames={234} name="Intro">
        <IntroScene />
      </Sequence>

      {/* Scene 3: Core Features (234 - 555 frames = 7.8s - 18.5s) */}
      <Sequence from={234} durationInFrames={321} name="Capabilities">
        <CapabilitiesScene />
      </Sequence>

      {/* Scene 4: What I've Done So Far (555 - 920 frames = 18.5s - 30.7s) */}
      <Sequence from={555} durationInFrames={365} name="WhatIDid">
        <WhatIDidScene />
      </Sequence>

      {/* Scene 5: What's Next (920 - 1188 frames = 30.7s - 39.6s) */}
      <Sequence from={920} durationInFrames={268} name="WhatNext">
        <WhatNextScene />
      </Sequence>

      {/* Scene 6: Outro (1188 - 1300 frames = 39.6s - 43.3s) */}
      <Sequence from={1188} durationInFrames={112} name="Outro">
        <OutroScene />
      </Sequence>

      {/* Dynamic Subtitle Karaoke Overlay */}
      <SubtitleBar />

      {/* Synchronized Voiceover Audio */}
      <Audio src={staticFile("valkarye-voice.mp3")} volume={1.0} premountFor={fps} />

      {/* Background Music */}
      <Audio src={staticFile("bg-music.mp3")} volume={0.16} premountFor={fps} />
    </div>
  );
};
