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

// ─── Apple Typography & Color Palette ───
const FONT_FAMILY =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Inter, sans-serif';

const THEME = {
  bg: "#000000",
  bgSubtle: "#0a0a0c",
  cardBg: "rgba(255, 255, 255, 0.04)",
  cardBgHover: "rgba(255, 255, 255, 0.07)",
  cardBorder: "rgba(255, 255, 255, 0.1)",
  cardBorderSubtle: "rgba(255, 255, 255, 0.06)",
  textPrimary: "#ffffff",
  textSecondary: "#86868b", // Iconic Apple muted gray
  textTertiary: "#515154",
  accentTitanium: "linear-gradient(180deg, #ffffff 0%, #a1a1a6 100%)",
  accentOrange: "#f56300", // Apple Watch Ultra Action Orange
  accentBlue: "#2997ff",   // Apple Pro Blue
  accentGreen: "#30d158",  // Apple iOS Green
};

// ─── Ambient Studio Lighting (Apple Keynote Dark Stage) ───
const StudioStageLight: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame * 0.03) * 20;

  return (
    <>
      {/* Top subtle overhead spotlight */}
      <div
        style={{
          position: "absolute",
          top: -200 + drift,
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 700,
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.015) 45%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      {/* Ultra-soft bottom ambient floor reflection */}
      <div
        style={{
          position: "absolute",
          bottom: -150,
          left: "50%",
          transform: "translateX(-50%)",
          width: 1000,
          height: 500,
          background:
            "radial-gradient(ellipse, rgba(41, 151, 255, 0.04) 0%, transparent 65%)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />
    </>
  );
};

// ─── Dynamic Island / Apple Pill Header ───
const DynamicIslandHeader: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.8, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: 65,
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
          gap: 16,
          padding: "10px 24px",
          borderRadius: 999,
          background: "rgba(20, 20, 22, 0.8)",
          border: `1px solid ${THEME.cardBorder}`,
          backdropFilter: "blur(30px)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: THEME.accentOrange,
            opacity: pulse,
            boxShadow: "0 0 10px rgba(245, 99, 0, 0.6)",
          }}
        />
        <span
          style={{
            color: THEME.textPrimary,
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: -0.2,
            fontFamily: FONT_FAMILY,
          }}
        >
          Valkarye V3
        </span>
        <span style={{ color: "rgba(255, 255, 255, 0.15)", fontSize: 16 }}>|</span>
        <span
          style={{
            color: THEME.textSecondary,
            fontSize: 18,
            fontWeight: 500,
            fontFamily: FONT_FAMILY,
            letterSpacing: -0.2,
          }}
        >
          Half Life Sprint 2
        </span>
      </div>
    </div>
  );
};

// ─── Apple Industrial Hardware CAD Robotic Arm ───
// Precision engineered: bead-blasted aluminum, chamfered titanium joints, obsidian gripper
const MinimalistRoboticArm: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();

  const j1Angle = -8 + Math.sin(frame * 0.04) * 12;
  const j2Angle = 42 + Math.cos(frame * 0.035) * 16;
  const j3Angle = -30 + Math.sin(frame * 0.04) * 14;
  const clawWidth = 14 + Math.sin(frame * 0.05) * 8;

  return (
    <div
      style={{
        position: "relative",
        width: 720,
        height: 620,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width="720"
        height="620"
        viewBox="0 0 720 620"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Matte Silver Aluminum Link Gradient */}
          <linearGradient id="silverAluminum" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e5e5ea" />
            <stop offset="35%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#d1d1d6" />
            <stop offset="100%" stopColor="#8e8e93" />
          </linearGradient>

          {/* Space Gray Link Gradient */}
          <linearGradient id="spaceGray" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#48484a" />
            <stop offset="50%" stopColor="#636366" />
            <stop offset="100%" stopColor="#3a3a3c" />
          </linearGradient>

          {/* Polished Titanium Joint Pivot */}
          <linearGradient id="titaniumRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f56300" />
            <stop offset="100%" stopColor="#d04800" />
          </linearGradient>

          {/* Soft Hardware Shadow */}
          <radialGradient id="stageShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.05)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.01)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Studio Ground Pedestal Ring */}
        <ellipse cx="360" cy="540" rx="220" ry="40" fill="url(#stageShadow)" />
        <ellipse
          cx="360"
          cy="540"
          rx="170"
          ry="32"
          fill="none"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1.5"
        />
        <ellipse
          cx="360"
          cy="540"
          rx="110"
          ry="20"
          fill="rgba(255, 255, 255, 0.03)"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1.5"
        />

        {/* Machined Aluminum Turntable Base */}
        <path
          d="M 310 540 L 410 540 L 395 485 L 325 485 Z"
          fill="#1c1c1e"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1.5"
        />
        <ellipse
          cx="360"
          cy="485"
          rx="45"
          ry="12"
          fill="#2c2c2e"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1.5"
        />

        {/* Shoulder Joint Pivot with Orange Accent Chamfer */}
        <circle cx="360" cy="485" r="22" fill="#1c1c1e" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" />
        <circle cx="360" cy="485" r="14" fill="url(#titaniumRing)" />
        <circle cx="360" cy="485" r="5" fill="#ffffff" />

        {/* ─── Arm Kinematic Structure ─── */}
        <g transform={`translate(360, 485) rotate(${j1Angle})`}>
          {/* Main Bicep Arm (Single Machined Unibody Link) */}
          <rect
            x="-11"
            y="-180"
            width="22"
            height="180"
            rx="11"
            fill="url(#silverAluminum)"
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="1"
          />
          {/* Center Matte Inset Channel */}
          <rect
            x="-4"
            y="-165"
            width="8"
            height="150"
            rx="4"
            fill="#3a3a3c"
          />

          {/* Elbow Joint (at 0, -180) */}
          <g transform={`translate(0, -180) rotate(${j2Angle})`}>
            {/* Elbow Hub */}
            <circle cx="0" cy="0" r="20" fill="#1c1c1e" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" />
            <circle cx="0" cy="0" r="12" fill="url(#titaniumRing)" />
            <circle cx="0" cy="0" r="4" fill="#ffffff" />

            {/* Forearm Linkage (Space Gray Aluminum) */}
            <rect
              x="-8"
              y="-10"
              width="170"
              height="20"
              rx="10"
              transform="rotate(-25)"
              fill="url(#spaceGray)"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1"
            />

            {/* Wrist Assembly */}
            <g transform="translate(150, -68) rotate(${j3Angle})">
              {/* Wrist Pivot */}
              <circle cx="0" cy="0" r="14" fill="#2c2c2e" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="8" fill="url(#titaniumRing)" />

              {/* End-Effector Mount */}
              <rect x="10" y="-12" width="16" height="24" rx="5" fill="#1c1c1e" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

              {/* Upper Precision Finger */}
              <path
                d={`M 26 -8 L 52 ${-clawWidth} L 68 -2`}
                stroke="url(#silverAluminum)"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
              {/* Lower Precision Finger */}
              <path
                d={`M 26 8 L 52 ${clawWidth} L 68 2`}
                stroke="url(#silverAluminum)"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />

              {/* Micro Manipulator Cube */}
              <g transform="translate(68, -14)">
                <rect
                  x="0"
                  y="0"
                  width="28"
                  height="28"
                  rx="7"
                  fill="rgba(255, 255, 255, 0.95)"
                  boxShadow="0 4px 15px rgba(255,255,255,0.3)"
                />
                <circle cx="14" cy="14" r="4" fill="#1c1c1e" />
              </g>
            </g>
          </g>
        </g>

        {/* Minimalist Apple Spec Card */}
        <g opacity={progress}>
          <rect
            x="40"
            y="70"
            width="200"
            height="110"
            rx="18"
            fill="rgba(255, 255, 255, 0.04)"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
          />
          <text x="60" y="104" fill={THEME.textSecondary} fontSize="13" fontWeight="600" letterSpacing="0.8" fontFamily={FONT_FAMILY}>
            DEGREES OF FREEDOM
          </text>
          <text x="60" y="138" fill={THEME.textPrimary} fontSize="26" fontWeight="700" letterSpacing="-0.5" fontFamily={FONT_FAMILY}>
            5-Axis Multi-DOF
          </text>
          <text x="60" y="162" fill={THEME.accentOrange} fontSize="15" fontWeight="600" fontFamily={FONT_FAMILY}>
            High-Payload Servos
          </text>
        </g>
      </svg>
    </div>
  );
};

// ─── Apple Subtitles Bar (Frosted Glass Pill) ───
const SUBTITLE_CUES = [
  { start: 0, end: 32, text: "Hey everyone!" },
  {
    start: 32,
    end: 265,
    text: "A few years back, I made a robotic arm just for fun, and today I'm finally bringing it back to life as Valkyrie V3.",
  },
  {
    start: 265,
    end: 660,
    text: "I kind of lost my old one, so I'm trying to remake it, make it even better so that it can actually move objects right now, respond to voice commands, and let you control every single axis of it with an app on your phone or desktop.",
  },
  {
    start: 660,
    end: 711,
    text: "Here's what I've done so far:",
  },
  {
    start: 711,
    end: 772,
    text: "Laid out the core architecture.",
  },
  {
    start: 772,
    end: 865,
    text: "Planned the multi-axial servo configuration.",
  },
  {
    start: 865,
    end: 1032,
    text: "And designed the wireless control pipeline for both the companion app and voice recognition.",
  },
  {
    start: 1032,
    end: 1319,
    text: "What I'm going to do next is list out the materials which I need to build this entire thing, model the joints of the arm in CAD, and start testing the motor drivers and firmware.",
  },
  {
    start: 1319,
    end: 1355,
    text: "Thank you for listening.",
  },
  {
    start: 1355,
    end: 1410,
    text: "See you in the next one!",
  },
];

const AppleSubtitleBar: React.FC = () => {
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
        left: 50,
        right: 50,
        display: "flex",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <div
        style={{
          background: "rgba(22, 22, 26, 0.75)",
          border: `1px solid ${THEME.cardBorder}`,
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
          padding: "22px 40px",
          borderRadius: 28,
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          maxWidth: 960,
          textAlign: "center",
        }}
      >
        <span
          style={{
            color: THEME.textPrimary,
            fontSize: 34,
            fontWeight: 600,
            lineHeight: 1.35,
            fontFamily: FONT_FAMILY,
            letterSpacing: -0.4,
          }}
        >
          {activeCue.text}
        </span>
      </div>
    </div>
  );
};

// ─── SCENE 1 & 2: Clean Apple Keynote Intro ───
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
      {/* Eyebrow */}
      <div
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: THEME.textSecondary,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontFamily: FONT_FAMILY,
          marginBottom: 12,
        }}
      >
        Project Valkarye
      </div>

      {/* Hero Title */}
      <div
        style={{
          fontSize: 96,
          fontWeight: 800,
          color: THEME.textPrimary,
          letterSpacing: -3,
          lineHeight: 1.0,
          textAlign: "center",
          fontFamily: FONT_FAMILY,
        }}
      >
        Valkarye{" "}
        <span
          style={{
            color: THEME.accentOrange,
          }}
        >
          V3
        </span>
      </div>

      {/* Subhead */}
      <div
        style={{
          marginTop: 18,
          fontSize: 32,
          fontWeight: 400,
          color: THEME.textSecondary,
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          maxWidth: 800,
          letterSpacing: -0.5,
        }}
      >
        The desktop robotic arm. Re-engineered.
      </div>

      {/* Hardware Centerpiece */}
      <div style={{ marginTop: 25 }}>
        <MinimalistRoboticArm progress={enter} />
      </div>
    </div>
  );
};

// ─── SCENE 3: Apple Keynote 3-Card Bento ───
const CapabilitiesScene: React.FC = () => {
  const frame = useCurrentFrame();

  const card1 = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const card2 = interpolate(frame, [35, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const card3 = interpolate(frame, [65, 90], [0, 1], {
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
          fontSize: 20,
          fontWeight: 600,
          color: THEME.textSecondary,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontFamily: FONT_FAMILY,
        }}
      >
        CAPABILITIES
      </div>
      <div
        style={{
          fontSize: 70,
          fontWeight: 800,
          color: THEME.textPrimary,
          fontFamily: FONT_FAMILY,
          letterSpacing: -2,
          marginTop: 6,
          marginBottom: 50,
          textAlign: "center",
        }}
      >
        Built for precision.
      </div>

      {/* Card 1: Physical Object Manipulation */}
      <div
        style={{
          width: 880,
          padding: "36px 44px",
          borderRadius: 30,
          background: THEME.cardBg,
          border: `1px solid ${THEME.cardBorder}`,
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          display: "flex",
          alignItems: "center",
          gap: 32,
          marginBottom: 24,
          opacity: card1,
          transform: `translateY(${(1 - card1) * 30}px)`,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: 22,
            background: "rgba(255, 255, 255, 0.06)",
            border: `1px solid ${THEME.cardBorder}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 38,
          }}
        >
          🦾
        </div>
        <div>
          <div style={{ color: THEME.textPrimary, fontSize: 34, fontWeight: 700, letterSpacing: -0.5, fontFamily: FONT_FAMILY }}>
            Physical Object Manipulation
          </div>
          <div style={{ color: THEME.textSecondary, fontSize: 24, marginTop: 6, fontFamily: FONT_FAMILY, lineHeight: 1.35, letterSpacing: -0.2 }}>
            Engineered to pick, position, and place real objects with repeatability
          </div>
        </div>
      </div>

      {/* Card 2: Voice Control */}
      <div
        style={{
          width: 880,
          padding: "36px 44px",
          borderRadius: 30,
          background: THEME.cardBg,
          border: `1px solid ${THEME.cardBorder}`,
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          display: "flex",
          alignItems: "center",
          gap: 32,
          marginBottom: 24,
          opacity: card2,
          transform: `translateY(${(1 - card2) * 30}px)`,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: 22,
            background: "rgba(245, 99, 0, 0.1)",
            border: "1px solid rgba(245, 99, 0, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 38,
          }}
        >
          🎙️
        </div>
        <div>
          <div style={{ color: THEME.textPrimary, fontSize: 34, fontWeight: 700, letterSpacing: -0.5, fontFamily: FONT_FAMILY }}>
            Hands-Free Voice Commands
          </div>
          <div style={{ color: THEME.textSecondary, fontSize: 24, marginTop: 6, fontFamily: FONT_FAMILY, lineHeight: 1.35, letterSpacing: -0.2 }}>
            Natural language intent parsing for voice-directed tasks
          </div>
        </div>
      </div>

      {/* Card 3: Unified App Control */}
      <div
        style={{
          width: 880,
          padding: "36px 44px",
          borderRadius: 30,
          background: THEME.cardBg,
          border: `1px solid ${THEME.cardBorder}`,
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          display: "flex",
          alignItems: "center",
          gap: 32,
          opacity: card3,
          transform: `translateY(${(1 - card3) * 30}px)`,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: 22,
            background: "rgba(41, 151, 255, 0.1)",
            border: "1px solid rgba(41, 151, 255, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 38,
          }}
        >
          📱
        </div>
        <div>
          <div style={{ color: THEME.textPrimary, fontSize: 34, fontWeight: 700, letterSpacing: -0.5, fontFamily: FONT_FAMILY }}>
            Unified App Ecosystem
          </div>
          <div style={{ color: THEME.textSecondary, fontSize: 24, marginTop: 6, fontFamily: FONT_FAMILY, lineHeight: 1.35, letterSpacing: -0.2 }}>
            Instant wireless control across iPhone, iPad, and desktop
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SCENE 4: What I've Done (Apple Milestone Cards) ───
const WhatIDidScene: React.FC = () => {
  const frame = useCurrentFrame();

  const item1 = interpolate(frame, [5, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const item2 = interpolate(frame, [30, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const item3 = interpolate(frame, [56, 78], [0, 1], {
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
          fontSize: 20,
          fontWeight: 600,
          color: THEME.accentGreen,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontFamily: FONT_FAMILY,
        }}
      >
        PROGRESS
      </div>
      <div
        style={{
          fontSize: 70,
          fontWeight: 800,
          color: THEME.textPrimary,
          fontFamily: FONT_FAMILY,
          letterSpacing: -2,
          marginTop: 6,
          marginBottom: 50,
          textAlign: "center",
        }}
      >
        What I've Done So Far
      </div>

      <div style={{ width: 880, display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Item 1 */}
        <div
          style={{
            padding: "34px 42px",
            borderRadius: 28,
            background: THEME.cardBg,
            border: `1px solid ${THEME.cardBorder}`,
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            display: "flex",
            alignItems: "center",
            gap: 28,
            opacity: item1,
            transform: `translateY(${(1 - item1) * 25}px)`,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "rgba(48, 209, 88, 0.15)",
              border: "1px solid rgba(48, 209, 88, 0.4)",
              color: THEME.accentGreen,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            ✓
          </div>
          <div>
            <div style={{ color: THEME.textPrimary, fontSize: 32, fontWeight: 700, letterSpacing: -0.5, fontFamily: FONT_FAMILY }}>
              Core System Architecture
            </div>
            <div style={{ color: THEME.textSecondary, fontSize: 23, marginTop: 4, fontFamily: FONT_FAMILY }}>
              Microcontroller specification, power distribution & kinematics map
            </div>
          </div>
        </div>

        {/* Item 2 */}
        <div
          style={{
            padding: "34px 42px",
            borderRadius: 28,
            background: THEME.cardBg,
            border: `1px solid ${THEME.cardBorder}`,
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            display: "flex",
            alignItems: "center",
            gap: 28,
            opacity: item2,
            transform: `translateY(${(1 - item2) * 25}px)`,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "rgba(48, 209, 88, 0.15)",
              border: "1px solid rgba(48, 209, 88, 0.4)",
              color: THEME.accentGreen,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            ✓
          </div>
          <div>
            <div style={{ color: THEME.textPrimary, fontSize: 32, fontWeight: 700, letterSpacing: -0.5, fontFamily: FONT_FAMILY }}>
              Multi-Axial Servo Joint Layout
            </div>
            <div style={{ color: THEME.textSecondary, fontSize: 23, marginTop: 4, fontFamily: FONT_FAMILY }}>
              Calculated joint ratios for base, shoulder, elbow, wrist & claw
            </div>
          </div>
        </div>

        {/* Item 3 */}
        <div
          style={{
            padding: "34px 42px",
            borderRadius: 28,
            background: THEME.cardBg,
            border: `1px solid ${THEME.cardBorder}`,
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            display: "flex",
            alignItems: "center",
            gap: 28,
            opacity: item3,
            transform: `translateY(${(1 - item3) * 25}px)`,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "rgba(48, 209, 88, 0.15)",
              border: "1px solid rgba(48, 209, 88, 0.4)",
              color: THEME.accentGreen,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            ✓
          </div>
          <div>
            <div style={{ color: THEME.textPrimary, fontSize: 32, fontWeight: 700, letterSpacing: -0.5, fontFamily: FONT_FAMILY }}>
              Wireless Control Pipeline
            </div>
            <div style={{ color: THEME.textSecondary, fontSize: 23, marginTop: 4, fontFamily: FONT_FAMILY }}>
              Low-latency telemetry protocol for companion app & voice recognition
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SCENE 5: What's Next (Apple Roadmap Cards) ───
const WhatNextScene: React.FC = () => {
  const frame = useCurrentFrame();

  const step1 = interpolate(frame, [5, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const step2 = interpolate(frame, [30, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const step3 = interpolate(frame, [56, 78], [0, 1], {
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
          fontSize: 20,
          fontWeight: 600,
          color: THEME.accentOrange,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontFamily: FONT_FAMILY,
        }}
      >
        NEXT PHASE
      </div>
      <div
        style={{
          fontSize: 70,
          fontWeight: 800,
          color: THEME.textPrimary,
          fontFamily: FONT_FAMILY,
          letterSpacing: -2,
          marginTop: 6,
          marginBottom: 50,
          textAlign: "center",
        }}
      >
        What I'm Gonna Do Next
      </div>

      <div style={{ width: 880, display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Next 1 */}
        <div
          style={{
            padding: "34px 42px",
            borderRadius: 28,
            background: THEME.cardBg,
            border: `1px solid ${THEME.cardBorder}`,
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            display: "flex",
            alignItems: "center",
            gap: 28,
            opacity: step1,
            transform: `translateY(${(1 - step1) * 25}px)`,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: THEME.textPrimary,
              fontFamily: FONT_FAMILY,
              padding: "10px 22px",
              borderRadius: 16,
              background: "rgba(255, 255, 255, 0.08)",
            }}
          >
            01
          </div>
          <div>
            <div style={{ color: THEME.textPrimary, fontSize: 32, fontWeight: 700, letterSpacing: -0.5, fontFamily: FONT_FAMILY }}>
              List All Build Materials (BOM)
            </div>
            <div style={{ color: THEME.textSecondary, fontSize: 23, marginTop: 4, fontFamily: FONT_FAMILY }}>
              Sourcing high-torque metal-gear servos, bearings, fasteners & wiring
            </div>
          </div>
        </div>

        {/* Next 2 */}
        <div
          style={{
            padding: "34px 42px",
            borderRadius: 28,
            background: THEME.cardBg,
            border: `1px solid ${THEME.cardBorder}`,
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            display: "flex",
            alignItems: "center",
            gap: 28,
            opacity: step2,
            transform: `translateY(${(1 - step2) * 25}px)`,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: THEME.textPrimary,
              fontFamily: FONT_FAMILY,
              padding: "10px 22px",
              borderRadius: 16,
              background: "rgba(255, 255, 255, 0.08)",
            }}
          >
            02
          </div>
          <div>
            <div style={{ color: THEME.textPrimary, fontSize: 32, fontWeight: 700, letterSpacing: -0.5, fontFamily: FONT_FAMILY }}>
              Model Joints in 3D CAD
            </div>
            <div style={{ color: THEME.textSecondary, fontSize: 23, marginTop: 4, fontFamily: FONT_FAMILY }}>
              Designing lightweight unibody brackets, pivots & precision end-effector
            </div>
          </div>
        </div>

        {/* Next 3 */}
        <div
          style={{
            padding: "34px 42px",
            borderRadius: 28,
            background: THEME.cardBg,
            border: `1px solid ${THEME.cardBorder}`,
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            display: "flex",
            alignItems: "center",
            gap: 28,
            opacity: step3,
            transform: `translateY(${(1 - step3) * 25}px)`,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: THEME.textPrimary,
              fontFamily: FONT_FAMILY,
              padding: "10px 22px",
              borderRadius: 16,
              background: "rgba(255, 255, 255, 0.08)",
            }}
          >
            03
          </div>
          <div>
            <div style={{ color: THEME.textPrimary, fontSize: 32, fontWeight: 700, letterSpacing: -0.5, fontFamily: FONT_FAMILY }}>
              Test Motor Drivers & Firmware
            </div>
            <div style={{ color: THEME.textSecondary, fontSize: 23, marginTop: 4, fontFamily: FONT_FAMILY }}>
              Validating PWM signal timing, torque thresholds & feedback telemetry
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SCENE 6: Apple Minimalist Outro ───
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
      {/* Precision Apple-Style Monogram */}
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
        Thank You For Listening.
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
        See you in the next one.
      </div>

      <div
        style={{
          marginTop: 50,
          padding: "14px 32px",
          borderRadius: 999,
          background: "rgba(255, 255, 255, 0.05)",
          border: `1px solid ${THEME.cardBorder}`,
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

// ─── MAIN COMPOSITION ───
export const ValkaryeReel: React.FC = () => {
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

      {/* Scene 1 & 2: Intro (0 - 265 frames = 0 - 8.8s) */}
      <Sequence from={0} durationInFrames={265} name="Intro">
        <IntroScene />
      </Sequence>

      {/* Scene 3: Core Features (265 - 660 frames = 8.8s - 22.0s) */}
      <Sequence from={265} durationInFrames={395} name="Capabilities">
        <CapabilitiesScene />
      </Sequence>

      {/* Scene 4: What I've Done So Far (660 - 1032 frames = 22.0s - 34.4s) */}
      <Sequence from={660} durationInFrames={372} name="WhatIDid">
        <WhatIDidScene />
      </Sequence>

      {/* Scene 5: What's Next (1032 - 1319 frames = 34.4s - 44.0s) */}
      <Sequence from={1032} durationInFrames={287} name="WhatNext">
        <WhatNextScene />
      </Sequence>

      {/* Scene 6: Outro (1319 - 1410 frames = 44.0s - 47.0s) */}
      <Sequence from={1319} durationInFrames={91} name="Outro">
        <OutroScene />
      </Sequence>

      {/* Apple Frosted Glass Subtitles */}
      <AppleSubtitleBar />

      {/* Voiceover Track */}
      <Audio src={staticFile("valkarye-voice.mp3")} volume={1.0} premountFor={fps} />

      {/* Chill Lo-Fi Soundtrack */}
      <Audio src={staticFile("bg-music.mp3")} volume={0.08} premountFor={fps} />
    </div>
  );
};
