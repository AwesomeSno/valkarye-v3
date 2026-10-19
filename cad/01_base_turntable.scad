// Valkarye V3 - Part 01: Base Turntable & Thrust Bearing Housing
// OpenSCAD Parametric Part

$fn = 64;

BASE_DIAMETER     = 160;
BASE_HEIGHT       = 35;
BEARING_OD        = 42.2; // 51105 Thrust Bearing Pocket
BEARING_ID        = 25.0;
BEARING_DEPTH     = 12.0;
WIRE_BORE         = 14.0;
SERVO_L           = 41.0;
SERVO_W           = 20.0;

module base_housing() {
    difference() {
        cylinder(d = BASE_DIAMETER, h = BASE_HEIGHT);
        // Center hollow bore
        translate([0, 0, -1]) cylinder(d = WIRE_BORE, h = BASE_HEIGHT + 2);
        // Thrust bearing seat
        translate([0, 0, BASE_HEIGHT - BEARING_DEPTH])
            cylinder(d = BEARING_OD, h = BEARING_DEPTH + 1);
        // Servo pocket
        translate([-SERVO_L/2, -SERVO_W/2, 4])
            cube([SERVO_L, SERVO_W, BASE_HEIGHT]);
        // Desk mounting holes (4x M4)
        for (a = [45, 135, 225, 315]) {
            rotate([0, 0, a])
                translate([BASE_DIAMETER/2 - 14, 0, -1])
                    cylinder(d = 4.5, h = BASE_HEIGHT + 2);
        }
    }
}

base_housing();
