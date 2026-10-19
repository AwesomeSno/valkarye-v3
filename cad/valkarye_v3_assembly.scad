// ==============================================================================
// Valkarye V3 - 6-Axis Robotic Arm Parametric CAD Model
// OpenSCAD Source File (.scad)
// Project: Valkarye V3 | Hack Club Half Life
// Description: Full parametric assembly with 6-DOF kinematics, bearings & servos
// ==============================================================================

$fn = 64; // High render resolution

// --- GLOBAL PARAMETERS (mm) ---
BASE_DIAMETER       = 160;
BASE_HEIGHT         = 35;
BEARING_OD          = 42.0 + 0.2; // 51105 Thrust Bearing Outer Dia (+0.2mm tolerance)
BEARING_ID          = 25.0;       // 51105 Thrust Bearing Inner Dia
BEARING_THICKNESS   = 12.0;       // 51105 Thickness
WIRE_BORE_DIA       = 14.0;       // Central hollow wire routing bore

BICEP_LENGTH        = 140.0;      // Center-to-center link length
FOREARM_LENGTH      = 130.0;      // Center-to-center link length

BEARING_608_OD      = 22.0 + 0.15; // 608ZZ Ball Bearing
BEARING_608_ID      = 8.0;
BEARING_608_W       = 7.0;

SERVO_MG996R_L      = 40.7 + 0.3;
SERVO_MG996R_W      = 19.7 + 0.3;
SERVO_MG996R_H      = 42.9;

SERVO_MG90S_L       = 22.8 + 0.2;
SERVO_MG90S_W       = 12.2 + 0.2;
SERVO_MG90S_H       = 28.5;

// ==============================================================================
// MODULE: BASE HOUSING (Stationary Lower Base)
// ==============================================================================
module base_housing() {
    difference() {
        // Main base body
        cylinder(d = BASE_DIAMETER, h = BASE_HEIGHT);
        
        // Central hollow bore for cables
        translate([0, 0, -1])
            cylinder(d = WIRE_BORE_DIA, h = BASE_HEIGHT + 2);
            
        // 51105 Thrust bearing recess pocket
        translate([0, 0, BASE_HEIGHT - BEARING_THICKNESS])
            cylinder(d = BEARING_OD, h = BEARING_THICKNESS + 1);
            
        // MG996R Base Servo cutout pocket
        translate([-SERVO_MG996R_L/2, -SERVO_MG996R_W/2, 4])
            cube([SERVO_MG996R_L, SERVO_MG996R_W, BASE_HEIGHT]);
            
        // 4x M4 desk clamping / mounting holes
        for (a = [45, 135, 225, 315]) {
            rotate([0, 0, a])
                translate([BASE_DIAMETER/2 - 14, 0, -1])
                    cylinder(d = 4.5, h = BASE_HEIGHT + 2);
        }
        
        // Weight-reduction internal hollow pockets
        for (a = [0, 90, 180, 270]) {
            rotate([0, 0, a])
                translate([42, 0, -1])
                    cylinder(d = 24, h = BASE_HEIGHT - 6);
        }
    }
}

// ==============================================================================
// MODULE: TURNTABLE ROTATING PLATE (Axis 1 - Base Yaw)
// ==============================================================================
module turntable_plate() {
    difference() {
        union() {
            cylinder(d = BASE_DIAMETER - 10, h = 10);
            // Bearing pilot boss
            translate([0, 0, -6])
                cylinder(d = BEARING_ID - 0.2, h = 6);
        }
        // Central wire hole
        translate([0, 0, -7])
            cylinder(d = WIRE_BORE_DIA, h = 20);
            
        // Shoulder clevis M3 mounting holes
        for (x = [-30, 30]) {
            for (y = [-15, 15]) {
                translate([x, y, -7])
                    cylinder(d = 3.2, h = 20);
            }
        }
    }
}

// ==============================================================================
// MODULE: SHOULDER CLEVIS BRACKET (Axis 2 - Shoulder Pitch)
// ==============================================================================
module shoulder_bracket() {
    difference() {
        union() {
            // Mounting foot
            translate([-35, -20, 0])
                cube([70, 40, 8]);
            // Upright clevis arms
            translate([-35, -20, 8])
                cube([12, 40, 50]);
            translate([23, -20, 8])
                cube([12, 40, 50]);
        }
        // Pivot axle bore (M4)
        translate([-40, 0, 42])
            rotate([0, 90, 0])
                cylinder(d = 4.2, h = 80);
                
        // MG996R Servo horn recess (20mm dia, 3mm deep)
        translate([21, 0, 42])
            rotate([0, 90, 0])
                cylinder(d = 21.0, h = 4);
                
        // Cable routing slot
        translate([-10, -8, -1])
            cube([20, 16, 12]);
    }
}

// ==============================================================================
// MODULE: BICEP LINK (140mm Link with I-Beam Truss)
// ==============================================================================
module bicep_truss() {
    difference() {
        union() {
            // Lower pivot boss (Shoulder joint)
            cylinder(d = 32, h = 22, center = true);
            
            // Upper pivot boss (Elbow joint)
            translate([0, BICEP_LENGTH, 0])
                cylinder(d = 30, h = 22, center = true);
                
            // Main I-Beam connecting spar
            translate([-6, 16, -10])
                cube([12, BICEP_LENGTH - 32, 20]);
                
            // Top and bottom flange ribs
            translate([-14, 16, 8])
                cube([28, BICEP_LENGTH - 32, 3]);
            translate([-14, 16, -11])
                cube([28, BICEP_LENGTH - 32, 3]);
        }
        // Lower pivot axle hole
        cylinder(d = 4.2, h = 30, center = true);
        
        // Upper 608ZZ bearing seats (Dual opposing)
        translate([0, BICEP_LENGTH, 11 - BEARING_608_W + 0.1])
            cylinder(d = BEARING_608_OD, h = BEARING_608_W + 1);
        translate([0, BICEP_LENGTH, -11 - 0.1])
            cylinder(d = BEARING_608_OD, h = BEARING_608_W + 1);
            
        // Upper axle through hole
        translate([0, BICEP_LENGTH, 0])
            cylinder(d = 8.2, h = 30, center = true);
            
        // Weight-reduction cutouts along web
        for (y = [38, 70, 102]) {
            translate([0, y, 0])
                rotate([90, 0, 0])
                    cylinder(d = 12, h = 16, center = true);
        }
    }
}

// ==============================================================================
// MODULE: FOREARM LINK (130mm Link with Elbow Clevis & Wrist Mount)
// ==============================================================================
module forearm_link() {
    difference() {
        union() {
            // Elbow clevis pivot fork
            translate([-15, -15, -13])
                cube([30, 30, 6]);
            translate([-15, -15, 7])
                cube([30, 30, 6]);
                
            // Forearm main tube
            translate([-10, 15, -7])
                cube([20, FOREARM_LENGTH - 30, 14]);
                
            // Wrist mounting head
            translate([0, FOREARM_LENGTH, 0])
                cylinder(d = 26, h = 18, center = true);
        }
        // Elbow pivot axle hole (M4)
        cylinder(d = 4.2, h = 30, center = true);
        
        // MG90S Wrist Servo pocket
        translate([-SERVO_MG90S_L/2, FOREARM_LENGTH - 15, -SERVO_MG90S_W/2])
            cube([SERVO_MG90S_L, SERVO_MG90S_H, SERVO_MG90S_W]);
            
        // Wrist axle hole
        translate([0, FOREARM_LENGTH, 0])
            cylinder(d = 3.2, h = 24, center = true);
    }
}

// ==============================================================================
// MODULE: PARALLEL JAW GRIPPER
// ==============================================================================
module parallel_gripper(jaw_aperture = 25) {
    // Gripper base frame
    difference() {
        cube([55, 35, 14], center = true);
        
        // MG90S pocket
        cube([SERVO_MG90S_L, SERVO_MG90S_W, 20], center = true);
        
        // Dual rack guide channels
        translate([0, -8, 0])
            cube([60, 6, 8], center = true);
        translate([0, 8, 0])
            cube([60, 6, 8], center = true);
    }
    
    // Left Jaw
    translate([-jaw_aperture/2 - 6, 25, 0]) {
        cube([8, 30, 12]);
        // Soft silicone pad slot
        translate([8, 10, 1])
            cube([3, 18, 10]);
    }
    
    // Right Jaw
    translate([jaw_aperture/2 - 2, 25, 0]) {
        cube([8, 30, 12]);
        // Soft silicone pad slot
        translate([-3, 10, 1])
            cube([3, 18, 10]);
    }
}

// ==============================================================================
// FULL ASSEMBLY PREVIEW
// ==============================================================================
module valkarye_v3_full_assembly() {
    // Base
    color([0.2, 0.2, 0.2]) base_housing();
    
    // Turntable
    color([0.8, 0.8, 0.8])
        translate([0, 0, BASE_HEIGHT])
            turntable_plate();
            
    // Shoulder Bracket
    color([0.15, 0.15, 0.15])
        translate([0, 0, BASE_HEIGHT + 10])
            shoulder_bracket();
            
    // Bicep Link (Elevated 45 degrees)
    color([0.85, 0.85, 0.85])
        translate([0, 0, BASE_HEIGHT + 52])
            rotate([45, 0, 0])
                bicep_truss();
                
    // Forearm Link (Positioned at elbow)
    color([0.2, 0.2, 0.2])
        translate([0, BICEP_LENGTH * cos(45), BASE_HEIGHT + 52 + BICEP_LENGTH * sin(45)])
            rotate([-25, 0, 0])
                forearm_link();
                
    // Gripper (Positioned at wrist)
    color([0.8, 0.3, 0.1])
        translate([0, BICEP_LENGTH * cos(45) + FOREARM_LENGTH * cos(20), BASE_HEIGHT + 52 + BICEP_LENGTH * sin(45) - FOREARM_LENGTH * sin(20)])
            parallel_gripper(35);
}

// Render full assembly by default
valkarye_v3_full_assembly();
