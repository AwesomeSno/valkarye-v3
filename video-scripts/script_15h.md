# Reel Script 2: First 15 Hours Progress Reel (~47 Seconds)

**Duration:** ~47 seconds (1,410 frames @ 30fps)  
**Resolution:** 1080x1920 (9:16 Vertical Reel)  
**Style:** Apple Minimalist Industrial Design (Frosted glass Bento cards, pure OLED black, overhead studio lighting)  
**Voice:** `en-US-AndrewMultilingualNeural` (Conversational, warm, natural pacing)  
**Rendered Video:** `Videos/valkarye_15h_progress_reel.mp4`

---

## Clean Spoken Narration Script

> "Hey everyone! Quick update on Valkarye V3. I just wrapped up the first 15 hours of planning and engineering, and here is what is done.
>
> I started by tearing down what failed on my old arm: cheap plastic gears, USB power brownouts, and joint flex.
>
> For V3, I mapped out the complete 6-axis architecture with an ESP32 controlling a PCA9685 driver and an external 5-volt buck regulator.
>
> I calculated the torque math for the shoulder, which needs over 11 kilogram-centimeters, locked in the motor specs, and designed the real-time WebSockets pipeline for phone and laptop control.
>
> All the mechanical geometry and parts are ready, and next I am modeling the joints in CAD.
>
> Thanks for watching, see you in the next one!"

---

## Timed Scene & Visual Breakdown

| Time | Frame Range | Spoken Text | Visual Showcase & Diagram Elements |
|---|---|---|---|
| **0:00 - 0:08** | 0 - 239 | "Hey everyone! Quick update on Valkarye V3. I just wrapped up the first 15 hours of planning and engineering, and here is what is done." | **Intro Scene:** Minimalist bead-blasted aluminum CAD arm rotating on turntable with Dynamic Island header ("First 15 Hours Complete"). |
| **0:08 - 0:15** | 239 - 445 | "I started by tearing down what failed on my old arm: cheap plastic gears, USB power brownouts, and joint flex." | **Failure Analysis Scene:** Frosted glass card featuring handmade teardown diagram (`hour_01_old_arm_problems.png`). |
| **0:15 - 0:26** | 445 - 790 | "For V3, I mapped out the complete 6-axis architecture with an ESP32 controlling a PCA9685 driver and an external 5-volt buck regulator." | **Architecture & 6-DOF Scene:** Technical system block diagram (`hour_03_system_architecture.png`) followed by 6-axis joint map (`hour_04_six_axis_dof.png`). |
| **0:26 - 0:38** | 790 - 1144 | "I calculated the torque math for the shoulder, which needs over 11 kilogram-centimeters, locked in the motor specs, and designed the real-time WebSockets pipeline for phone and laptop control." | **Torque & Wireless Scene:** Free-body torque diagram (`hour_05_torque_calculations.png`) and WebSockets 50Hz telemetry pipeline (`hour_09_wireless_pipeline.png`). |
| **0:38 - 0:43** | 1144 - 1303 | "All the mechanical geometry and parts are ready, and next I am modeling the joints in CAD." | **Mechanical & BOM Scene:** Thrust bearing turntable section (`hour_14_base_turntable.png`) and BOM checklist (`hour_15_gripper_and_bom.png`). |
| **0:43 - 0:47** | 1303 - 1410 | "Thanks for watching, see you in the next one!" | **Minimalist Outro:** V3 monogram badge, "15 Hours Complete", "Next: 3D CAD Modeling & Firmware Testing". |

---

## Assets & Output Links

- **Final Rendered MP4:** [`Videos/valkarye_15h_progress_reel.mp4`](file:///Users/harinandanjv/Projects/01HackClub/Half%20Life/Valkarye-v3/Videos/valkarye_15h_progress_reel.mp4)
- **Remotion Composition Code:** [`valkarye-reel/src/Valkarye15HourReel.tsx`](file:///Users/harinandanjv/Projects/01HackClub/Half%20Life/Valkarye-v3/valkarye-reel/src/Valkarye15HourReel.tsx)
- **Audio Voiceover:** [`Videos/valkarye-15h-voice.mp3`](file:///Users/harinandanjv/Projects/01HackClub/Half%20Life/Valkarye-v3/Videos/valkarye-15h-voice.mp3)
- **Subtitles:** [`Videos/subtitles_15h.vtt`](file:///Users/harinandanjv/Projects/01HackClub/Half%20Life/Valkarye-v3/Videos/subtitles_15h.vtt)
