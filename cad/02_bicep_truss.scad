// Valkarye V3 - Part 02: 140mm Bicep I-Beam Truss Link
// OpenSCAD Parametric Part

$fn = 64;

BICEP_LEN     = 140.0;
BEARING_608_OD = 22.15;
BEARING_608_W  = 7.0;

module bicep_truss() {
    difference() {
        union() {
            cylinder(d = 32, h = 22, center = true);
            translate([0, BICEP_LEN, 0]) cylinder(d = 30, h = 22, center = true);
            translate([-6, 16, -10]) cube([12, BICEP_LEN - 32, 20]);
            translate([-14, 16, 8]) cube([28, BICEP_LEN - 32, 3]);
            translate([-14, 16, -11]) cube([28, BICEP_LEN - 32, 3]);
        }
        cylinder(d = 4.2, h = 30, center = true);
        translate([0, BICEP_LEN, 11 - BEARING_608_W + 0.1])
            cylinder(d = BEARING_608_OD, h = BEARING_608_W + 1);
        translate([0, BICEP_LEN, -11 - 0.1])
            cylinder(d = BEARING_608_OD, h = BEARING_608_W + 1);
        translate([0, BICEP_LEN, 0])
            cylinder(d = 8.2, h = 30, center = true);
        for (y = [38, 70, 102]) {
            translate([0, y, 0])
                rotate([90, 0, 0])
                    cylinder(d = 12, h = 16, center = true);
        }
    }
}

bicep_truss();
