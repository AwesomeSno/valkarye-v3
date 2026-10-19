// ==============================================================================
// Valkarye V3 - Part 02: 140mm Bicep Linkage with I-Beam Truss
// OpenSCAD Parametric Part
// ==============================================================================

$fn = 64;

BICEP_LENGTH = 140.0; // Center-to-center

module bicep_truss() {
    difference() {
        union() {
            // Lower shoulder pivot boss (M4 axle, dia=36)
            rotate([0, 90, 0])
                cylinder(r = 18.0, h = 22.0, center = true);
            // Upper elbow pivot boss (Dual 608ZZ bearing seats)
            translate([0, 0, BICEP_LENGTH])
                rotate([0, 90, 0])
                    cylinder(r = 17.0, h = 22.0, center = true);
            // Main I-Beam central web
            translate([0, 0, BICEP_LENGTH/2])
                cube([8.0, 14.0, BICEP_LENGTH - 34.0], center = true);
            // Front and rear structural reinforcement flanges
            translate([0, 10.0, BICEP_LENGTH/2])
                cube([26.0, 4.0, BICEP_LENGTH - 34.0], center = true);
            translate([0, -10.0, BICEP_LENGTH/2])
                cube([26.0, 4.0, BICEP_LENGTH - 34.0], center = true);
            // Side bracket to mount elbow MG996R servo
            translate([12.0, 0, 60.0])
                cube([14.0, 22.0, 44.0], center = true);
        }
        // Lower shoulder pivot hole (M4)
        rotate([0, 90, 0])
            cylinder(r = 4.2, h = 30.0, center = true);
        // Upper elbow axle hole
        translate([0, 0, BICEP_LENGTH])
            rotate([0, 90, 0])
                cylinder(r = 4.2, h = 30.0, center = true);
        // Dual 608ZZ bearing recesses (22.15mm dia x 7.5mm depth)
        translate([-11.0, 0, BICEP_LENGTH])
            rotate([0, 90, 0])
                cylinder(r = 11.1, h = 7.5);
        translate([11.0, 0, BICEP_LENGTH])
            rotate([0, -90, 0])
                cylinder(r = 11.1, h = 7.5);
        // 3 Organic weight-reduction truss cutouts
        for (z = [38, 70, 102]) {
            translate([0, 0, z])
                rotate([90, 0, 0])
                    cylinder(r = 6.5, h = 18.0, center = true);
        }
    }
}

bicep_truss();
