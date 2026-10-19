// ==============================================================================
// Valkarye V3 - Part 01: Base Pedestal & Turntable Housing
// OpenSCAD Parametric Part
// ==============================================================================

$fn = 64;

BASE_DIAMETER    = 165.0;
BASE_HEIGHT      = 35.0;
TURNTABLE_DIA    = 145.0;
BEARING_POCKET_R = 21.1; // 51105 Thrust Bearing Outer Race
BEARING_DEPTH    = 12.0;
WIRE_BORE_R      = 10.0;

module base_pedestal() {
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
            // 4 Desk clamp mounting lugs with M4 slots
            for (a = [45, 135, 225, 315]) {
                rotate([0, 0, a])
                    translate([BASE_DIAMETER/2 - 2, 0, 0])
                        cylinder(r = 15.0, h = 10.0);
            }
        }
        // Central hollow wire routing bore
        translate([0, 0, -1])
            cylinder(r = WIRE_BORE_R, h = BASE_HEIGHT + 2);
        // 51105 Thrust bearing recess pocket
        translate([0, 0, BASE_HEIGHT - BEARING_DEPTH])
            cylinder(r = BEARING_POCKET_R, h = BEARING_DEPTH + 1);
        // MG996R Base Servo cutout cavity
        translate([-20.5, -10.0, 4.0])
            cube([41.0, 20.0, BASE_HEIGHT]);
        // 4 M4 desk clamping bolt holes
        for (a = [45, 135, 225, 315]) {
            rotate([0, 0, a])
                translate([BASE_DIAMETER/2 - 2, 0, -1])
                    cylinder(r = 2.2, h = 16.0);
        }
    }
}

base_pedestal();
