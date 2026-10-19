// ==============================================================================
// Valkarye V3 - Part 03: Parallel Jaw Gripper Mechanism
// OpenSCAD Parametric Part
// ==============================================================================

$fn = 64;

module parallel_gripper(aperture = 28.0) {
    // Aerodynamic gripper chassis shell holding MG90S micro servo
    difference() {
        union() {
            cube([52.0, 34.0, 16.0], center = true);
            translate([0, 0, 10.0])
                cylinder(r1 = 17.0, r2 = 14.0, h = 6.0);
        }
        // Internal MG90S servo pocket (23 x 12.5 x 20 mm)
        cube([23.0, 12.5, 20.0], center = true);
        // Dual linear gear rack guide tracks
        translate([0, -8.0, 0])
            cube([60.0, 6.0, 8.0], center = true);
        translate([0, 8.0, 0])
            cube([60.0, 6.0, 8.0], center = true);
    }

    // Left Linear Jaw Linkage with Silicone Grip Pad
    translate([-aperture/2, 0, 14.0]) {
        translate([-4.0, 0, 0])
            cube([8.0, 24.0, 12.0], center = true);
        translate([-3.5, 0, 16.0])
            cube([7.0, 10.0, 32.0], center = true);
        translate([-3.5, 0, 34.0])
            cube([7.0, 8.0, 14.0], center = true);
        // Silicone friction pad
        translate([0.5, 0, 34.0])
            cube([2.0, 7.0, 12.0], center = true);
    }
    
    // Right Linear Jaw Linkage with Silicone Grip Pad
    translate([aperture/2, 0, 14.0]) {
        translate([4.0, 0, 0])
            cube([8.0, 24.0, 12.0], center = true);
        translate([3.5, 0, 16.0])
            cube([7.0, 10.0, 32.0], center = true);
        translate([3.5, 0, 34.0])
            cube([7.0, 8.0, 14.0], center = true);
        // Silicone friction pad
        translate([-0.5, 0, 34.0])
            cube([2.0, 7.0, 12.0], center = true);
    }
}

parallel_gripper(30.0);
