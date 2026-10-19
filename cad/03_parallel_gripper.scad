// Valkarye V3 - Part 03: Parallel Jaw Gripper Mechanism
// OpenSCAD Parametric Part

$fn = 64;

module gripper_assembly(aperture = 30) {
    // Base Frame
    difference() {
        cube([55, 35, 14], center = true);
        cube([23.0, 12.4, 20], center = true); // MG90S pocket
        translate([0, -8, 0]) cube([60, 6, 8], center = true);
        translate([0, 8, 0]) cube([60, 6, 8], center = true);
    }
    // Left Jaw
    translate([-aperture/2 - 6, 25, -6]) {
        cube([8, 30, 12]);
        translate([8, 10, 1]) cube([3, 18, 10]); // Silicone pad
    }
    // Right Jaw
    translate([aperture/2 - 2, 25, -6]) {
        cube([8, 30, 12]);
        translate([-3, 10, 1]) cube([3, 18, 10]); // Silicone pad
    }
}

gripper_assembly();
