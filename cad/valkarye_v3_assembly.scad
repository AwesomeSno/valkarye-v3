// ==============================================================================
// Valkarye V3 - High-Fidelity 6-Axis Robotic Arm Parametric CAD Model
// OpenSCAD Source File (.scad)
// Project: Valkarye V3 | Hack Club Half Life
// Description: Fully articulated 6-DOF robotic arm assembly with actuators,
//              bearings, kinematics hierarchy, and structural reinforcement.
// ==============================================================================

$fn = 48; // Circle smoothness

// --- KINEMATIC JOINT ANGLES (Degrees) ---
JOINT_1_YAW         =  15.0;  // Base rotation (0 to 180 deg)
JOINT_2_PITCH       =  42.0;  // Shoulder elevation (-15 to 105 deg)
JOINT_3_ELBOW       = -68.0;  // Elbow flexion (0 to 135 deg)
JOINT_4_WRIST_PITCH =  35.0;  // Wrist tilt (-90 to 90 deg)
JOINT_5_WRIST_ROLL  =  20.0;  // Wrist rotation (0 to 180 deg)
GRIPPER_APERTURE    =  28.0;  // Jaw opening in mm (0 to 65 mm)

// --- DIMENSIONS & TOLERANCES (mm) ---
BASE_DIAMETER       = 165.0;
BASE_HEIGHT         = 35.0;
TURNTABLE_DIA       = 145.0;
TURNTABLE_HEIGHT    = 10.0;
BICEP_LENGTH        = 140.0;
FOREARM_LENGTH      = 130.0;

// Color Palette for Industrial Aesthetic
COLOR_BASE_PETG     = [0.15, 0.15, 0.17]; // Matte Dark Slate
COLOR_ARM_ALU       = [0.82, 0.83, 0.85]; // Bead-blasted Silver PETG
COLOR_SERVO_BODY    = [0.10, 0.10, 0.10]; // Black Servo Casing
COLOR_SERVO_HORN    = [0.20, 0.45, 0.85]; // Blue Anodized Aluminum Horn
COLOR_BEARING       = [0.90, 0.90, 0.92]; // Chrome Steel
COLOR_ACCENT        = [0.95, 0.55, 0.15]; // Safety Amber Accent

// ==============================================================================
// 1. ACTUATOR MODULES (Servos)
// ==============================================================================

module mg996r_servo() {
    color(COLOR_SERVO_BODY) {
        // Main rectangular case
        translate([-20.35, -9.85, 0])
            cube([40.7, 19.7, 36.5]);
        // Mounting flanges
        translate([-27.0, -9.85, 26.0])
            cube([54.0, 19.7, 2.5]);
        // Upper gear tier
        translate([-10.0, 0, 36.5])
            cylinder(r = 9.5, h = 5.0);
        translate([8.0, 0, 36.5])
            cylinder(r = 6.0, h = 3.0);
    }
    // Spline & Horn
    color(COLOR_SERVO_HORN) {
        translate([-10.0, 0, 41.5])
            cylinder(r = 3.0, h = 4.0);
        translate([-10.0, 0, 45.5])
            cylinder(r = 10.5, h = 2.5);
        // Center screw
        translate([-10.0, 0, 48.0])
            cylinder(r = 2.5, h = 1.5);
    }
}

module mg90s_servo() {
    color(COLOR_SERVO_BODY) {
        translate([-11.4, -6.1, 0])
            cube([22.8, 12.2, 22.5]);
        translate([-16.1, -6.1, 16.0])
            cube([32.2, 12.2, 2.0]);
        translate([-5.5, 0, 22.5])
            cylinder(r = 5.75, h = 4.0);
    }
    color(COLOR_SERVO_HORN) {
        translate([-5.5, 0, 26.5])
            cylinder(r = 2.3, h = 3.0);
        translate([-14.0, -3.0, 29.0])
            cube([20.0, 6.0, 1.8]);
    }
}

// ==============================================================================
// 2. BASE PEDESTAL & TURNTABLE (Axis 1 - Base Yaw)
// ==============================================================================

module base_pedestal() {
    color(COLOR_BASE_PETG) {
        difference() {
            union() {
                // Lower flared foundation
                cylinder(r = BASE_DIAMETER/2, h = 12.0);
                // Tapered middle transition
                translate([0, 0, 12.0])
                    cylinder(r1 = BASE_DIAMETER/2, r2 = 75.0, h = 8.0);
                // Upper bearing housing
                translate([0, 0, 20.0])
                    cylinder(r = 75.0, h = 15.0);
                // 4 Desk clamp mounting lugs
                for (a = [45, 135, 225, 315]) {
                    rotate([0, 0, a])
                        translate([BASE_DIAMETER/2 - 2, 0, 0])
                            cylinder(r = 15.0, h = 10.0);
                }
            }
            // Central wire routing pass-through
            translate([0, 0, -1])
                cylinder(r = 10.0, h = BASE_HEIGHT + 2);
            // 51105 Thrust Bearing Pocket (42.2mm dia, 12mm deep)
            translate([0, 0, BASE_HEIGHT - 12.0])
                cylinder(r = 21.1, h = 13.0);
            // 4 M4 desk mounting bolt holes
            for (a = [45, 135, 225, 315]) {
                rotate([0, 0, a])
                    translate([BASE_DIAMETER/2 - 2, 0, -1])
                        cylinder(r = 2.2, h = 16.0);
            }
        }
    }
}

module turntable_disc() {
    color(COLOR_ARM_ALU) {
        difference() {
            union() {
                // Rotating plate
                cylinder(r = TURNTABLE_DIA/2, h = TURNTABLE_HEIGHT);
                // Pilot boss mating with 51105 bearing
                translate([0, 0, -8.0])
                    cylinder(r = 12.4, h = 8.0);
                // Upper bevel
                translate([0, 0, TURNTABLE_HEIGHT])
                    cylinder(r1 = TURNTABLE_DIA/2, r2 = TURNTABLE_DIA/2 - 4, h = 3.0);
            }
            translate([0, 0, -9.0])
                cylinder(r = 9.0, h = 25.0);
        }
    }
}

// ==============================================================================
// 3. SHOULDER CLEVIS & PIVOT (Axis 2 - Shoulder Pitch)
// ==============================================================================

module shoulder_clevis() {
    color(COLOR_BASE_PETG) {
        difference() {
            union() {
                // Mounting platform
                translate([-37, -25, 0])
                    cube([74, 50, 8]);
                // Left clevis stanchion
                translate([-37, -22, 8])
                    cube([14, 44, 58]);
                translate([-30, 0, 66])
                    rotate([0, 90, 0])
                        cylinder(r = 22.0, h = 7.0, center = true);
                // Right clevis stanchion (with servo cutouts)
                translate([23, -22, 8])
                    cube([14, 44, 58]);
                translate([30, 0, 66])
                    rotate([0, 90, 0])
                        cylinder(r = 22.0, h = 7.0, center = true);
                // Stiffening gusset ribs
                translate([-37, -25, 8])
                    rotate([0, -45, 0])
                        cube([10, 10, 20]);
            }
            // Pivot axle through-bore
            translate([-40, 0, 66])
                rotate([0, 90, 0])
                    cylinder(r = 4.2, h = 80);
            // Servo horn recess pocket
            translate([22, 0, 66])
                rotate([0, 90, 0])
                    cylinder(r = 11.0, h = 6.0);
        }
    }
}

// ==============================================================================
// 4. BICEP LINKAGE (140mm Link with I-Beam Truss)
// ==============================================================================

module bicep_truss() {
    color(COLOR_ARM_ALU) {
        difference() {
            union() {
                // Lower shoulder pivot boss
                rotate([0, 90, 0])
                    cylinder(r = 18.0, h = 22.0, center = true);
                // Upper elbow pivot boss
                translate([0, 0, BICEP_LENGTH])
                    rotate([0, 90, 0])
                        cylinder(r = 17.0, h = 22.0, center = true);
                // Main I-Beam central web
                translate([0, 0, BICEP_LENGTH/2])
                    cube([8.0, 14.0, BICEP_LENGTH - 34.0], center = true);
                // Front and rear structural flanges
                translate([0, 10.0, BICEP_LENGTH/2])
                    cube([26.0, 4.0, BICEP_LENGTH - 34.0], center = true);
                translate([0, -10.0, BICEP_LENGTH/2])
                    cube([26.0, 4.0, BICEP_LENGTH - 34.0], center = true);
                // Side bracket to mount elbow MG996R servo
                translate([12.0, 0, 60.0])
                    cube([14.0, 22.0, 44.0], center = true);
            }
            // Lower shoulder pivot hole
            rotate([0, 90, 0])
                cylinder(r = 4.2, h = 30.0, center = true);
            // Upper elbow axle hole
            translate([0, 0, BICEP_LENGTH])
                rotate([0, 90, 0])
                    cylinder(r = 4.2, h = 30.0, center = true);
            // Dual 608ZZ bearing recesses at elbow
            translate([-11.0, 0, BICEP_LENGTH])
                rotate([0, 90, 0])
                    cylinder(r = 11.1, h = 7.5);
            translate([11.0, 0, BICEP_LENGTH])
                rotate([0, -90, 0])
                    cylinder(r = 11.1, h = 7.5);
            // 3 Weight-reduction organic truss cutouts
            for (z = [38, 70, 102]) {
                translate([0, 0, z])
                    rotate([90, 0, 0])
                        cylinder(r = 6.5, h = 18.0, center = true);
            }
        }
    }
}

// ==============================================================================
// 5. FOREARM LINKAGE (130mm Link with Elbow Clevis & Wrist)
// ==============================================================================

module forearm_link() {
    color(COLOR_BASE_PETG) {
        difference() {
            union() {
                // Double-shear elbow fork wrapping around bicep hub
                translate([-14.0, 0, 0])
                    rotate([0, 90, 0])
                        cylinder(r = 16.0, h = 6.0, center = true);
                translate([14.0, 0, 0])
                    rotate([0, 90, 0])
                        cylinder(r = 16.0, h = 6.0, center = true);
                translate([0, -10.0, 0])
                    cube([28.0, 12.0, 24.0], center = true);
                    
                // Tapered forearm body (from dia=26 down to dia=20)
                translate([0, 0, FOREARM_LENGTH/2])
                    cylinder(r1 = 13.0, r2 = 10.0, h = FOREARM_LENGTH - 20.0, center = true);
                    
                // Wrist mounting head at z = FOREARM_LENGTH
                translate([0, 0, FOREARM_LENGTH])
                    rotate([0, 90, 0])
                        cylinder(r = 11.0, h = 18.0, center = true);
            }
            // Elbow pivot bolt hole
            rotate([0, 90, 0])
                cylinder(r = 4.2, h = 36.0, center = true);
            // Wrist pivot axle hole
            translate([0, 0, FOREARM_LENGTH])
                rotate([0, 90, 0])
                    cylinder(r = 3.2, h = 24.0, center = true);
            // Recessed pocket for MG90S wrist servo
            translate([0, 0, 75.0])
                cube([14.0, 24.0, 28.0], center = true);
        }
    }
}

// ==============================================================================
// 6. WRIST ASSEMBLY & PARALLEL GRIPPER (Axis 4, 5, 6)
// ==============================================================================

module wrist_assembly() {
    color(COLOR_ARM_ALU) {
        // Wrist pitch yoke fork
        difference() {
            union() {
                translate([0, 0, 4])
                    cube([22.0, 16.0, 16.0], center = true);
                // Rotating roll barrel
                translate([0, 0, 16])
                    cylinder(r = 12.0, h = 16.0);
                // End-effector tool flange
                translate([0, 0, 32])
                    cylinder(r = 16.0, h = 4.0);
            }
            // Central wire bore
            translate([0, 0, -5])
                cylinder(r = 4.0, h = 45.0);
        }
    }
}

module parallel_gripper(aperture = 28.0) {
    // Gripper chassis shell holding MG90S servo
    color(COLOR_BASE_PETG) {
        difference() {
            union() {
                cube([52.0, 34.0, 16.0], center = true);
                translate([0, 0, 10.0])
                    cylinder(r1 = 17.0, r2 = 14.0, h = 6.0);
            }
            // Internal servo cavity
            cube([23.0, 12.5, 20.0], center = true);
            // Gear rack sliding tracks
            translate([0, -8.0, 0])
                cube([60.0, 6.0, 8.0], center = true);
            translate([0, 8.0, 0])
                cube([60.0, 6.0, 8.0], center = true);
        }
    }
    
    // Internal MG90S Servo
    translate([0, 0, -2.0])
        mg90s_servo();

    // Dual Linear Jaws
    color(COLOR_ARM_ALU) {
        // Left Jaw Linkage
        translate([-aperture/2, 0, 14.0]) {
            translate([-4.0, 0, 0])
                cube([8.0, 24.0, 12.0], center = true);
            translate([-3.5, 0, 16.0])
                cube([7.0, 10.0, 32.0], center = true);
            translate([-3.5, 0, 34.0])
                cube([7.0, 8.0, 14.0], center = true);
        }
        // Right Jaw Linkage
        translate([aperture/2, 0, 14.0]) {
            translate([4.0, 0, 0])
                cube([8.0, 24.0, 12.0], center = true);
            translate([3.5, 0, 16.0])
                cube([7.0, 10.0, 32.0], center = true);
            translate([3.5, 0, 34.0])
                cube([7.0, 8.0, 14.0], center = true);
        }
    }
    
    // Silicone High-Friction Grip Pads
    color([0.25, 0.25, 0.25]) {
        translate([-aperture/2 + 0.5, 0, 48.0])
            cube([2.0, 7.0, 12.0], center = true);
        translate([aperture/2 - 0.5, 0, 48.0])
            cube([2.0, 7.0, 12.0], center = true);
    }
    
    // Gripped Object (Amber Cylindrical Test Gear)
    color(COLOR_ACCENT) {
        translate([0, 0, 48.0])
            cylinder(r = 12.0, h = 18.0, center = true);
    }
}

// ==============================================================================
// 7. FULL 6-AXIS KINEMATIC ROBOTIC ARM ASSEMBLY
// ==============================================================================

module valkarye_v3_full_assembly() {
    // --- AXIS 1: BASE PEDESTAL & YAW ---
    base_pedestal();
    
    // Internal Base MG996R Servo
    translate([0, 0, 6.0])
        mg996r_servo();
        
    // Rotating Turntable (Yaw)
    rotate([0, 0, JOINT_1_YAW]) {
        translate([0, 0, BASE_HEIGHT])
            turntable_disc();
            
        // Shoulder Clevis Bracket on Turntable
        translate([0, 0, BASE_HEIGHT + TURNTABLE_HEIGHT]) {
            shoulder_clevis();
            
            // Shoulder MG996R Servo mounted horizontally
            translate([24.0, 0, 66.0])
                rotate([0, -90, 0])
                    mg996r_servo();

            // --- AXIS 2: SHOULDER PITCH ---
            translate([0, 0, 66.0])
            rotate([0, JOINT_2_PITCH, 0]) {
                bicep_truss();
                
                // Elbow MG996R Servo mounted on bicep
                translate([12.0, 0, 60.0])
                    rotate([0, -90, 0])
                        mg996r_servo();

                // --- AXIS 3: ELBOW PITCH ---
                translate([0, 0, BICEP_LENGTH])
                rotate([0, JOINT_3_ELBOW, 0]) {
                    forearm_link();

                    // --- AXIS 4: WRIST PITCH ---
                    translate([0, 0, FOREARM_LENGTH])
                    rotate([0, JOINT_4_WRIST_PITCH, 0]) {
                        
                        // --- AXIS 5 & 6: WRIST ROLL & PARALLEL GRIPPER ---
                        rotate([0, 0, JOINT_5_WRIST_ROLL]) {
                            wrist_assembly();
                            
                            translate([0, 0, 36.0])
                                parallel_gripper(GRIPPER_APERTURE);
                        }
                    }
                }
            }
        }
    }
}

// Render complete robotic arm
valkarye_v3_full_assembly();
