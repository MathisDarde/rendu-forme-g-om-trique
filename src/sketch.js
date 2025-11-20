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
  if (key == " ") {
    // Sauvegarder les états originaux
    let originalSvg = _SVG_;
    let originalSvgElmt = svgElmt;
    let originalSvgTranslate = svgTranslate;
    let originalSvgVertices = svgVertices;
    let originalSvgStrokeColor = svgStrokeColor;

    // Créer un élément SVG temporaire sans toucher au canvas
    _SVG_ = true;
    width = NP;
    height = NP;
    svgTranslate = {
      x: 0,
      y: 0,
      add: function (x, y) {
        this.x += x;
        this.y += y;
      },
    };
    svgElmt = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElmt.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgElmt.setAttribute("version", "1.1");
    svgElmt.setAttribute("viewBox", `0 0 ${NP} ${NP}`);
    svgElmt.setAttribute("width", NP);
    svgElmt.setAttribute("height", NP);
    svgElmt.style.backgroundColor = BG_COLOR;
    svgVertices = [];
    svgStrokeColor = STROKE_COLOR;

    // Redessiner en mode SVG
    dessiner();

    // Générer le fichier SVG
    let filename = "IIyanJude_BainTrimbach_dessin.svg";

    let svgData = svgElmt.outerHTML;
    let preface = '<?xml version="1.0" standalone="no"?>\r\n';
    let svgBlob = new Blob([preface, svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    let svgUrl = window.URL.createObjectURL(svgBlob);
    let downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Restaurer l'état original
    _SVG_ = originalSvg;
    svgElmt = originalSvgElmt;
    svgTranslate = originalSvgTranslate;
    svgVertices = originalSvgVertices;
    svgStrokeColor = originalSvgStrokeColor;
  } else if (key == "f" || key == "F") {
    // Sauvegarder en PNG
    let filename = "IIyanJude_BainTrimbach_dessin.png";
    save(filename);
  }
}
