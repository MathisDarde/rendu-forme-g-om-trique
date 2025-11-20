function setup() {
  createCanvas(520, 520);
  angleMode(RADIANS);
  background(8);
  noFill();
  strokeWeight(1);

  drawFractalShape();
}

function drawFractalShape() {
  translate(width / 2, height / 2);

  let layers = 70; // Complexité verticale
  let points = 32; // Complexité horizontale
  let radius = 12;

  for (let i = 0; i < layers; i++) {
    beginShape();

    for (let p = 0; p < points; p++) {
      let baseAngle = (TWO_PI / points) * p;

      // oscillation radiale pour complexité
      let offset = sin(i * 0.22 + p * 0.45) * 14 + cos(i * 0.11 + p * 0.32) * 8;

      let r = radius + offset;
      let angle = baseAngle + sin(i * 0.05) * 0.6;

      stroke(
        150 + 105 * sin(i * 0.12 + p * 0.5),
        100 + 80 * cos(i * 0.2),
        200 + 55 * sin(p * 0.28),
        200
      );

      vertex(cos(angle) * r, sin(angle) * r);
    }

    endShape(CLOSE);

    radius += 4; // expansion
    rotate(0.045); // légère spirale
  }
}

function keyPressed() {
  if (key === " " || key === "Spacebar") {
    // Save as SVG
    saveCanvas("mon_fractal", "svg");
  } else if (key == "f" || key == "F") {
    // Sauvegarder en PNG
    let filename = "IIyanJude_BainTrimbach_dessin.png";
    save(filename);
  }
}

