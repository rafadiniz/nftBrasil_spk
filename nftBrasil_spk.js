let img = [];
let capa;

let tr = 0.0;

function preload() {

  capa = loadImage("data/contra-CAPA.png");

  for (let i = 1; i < 7; i++) {
    img[i] = loadImage("data/spk"+i+"-removebg-preview.png");
  }
}

function setup() {
  createCanvas(1400, 900, WEBGL);

  capa.resize(width, height);

  for (let i = 1; i < 7; i++) {
    img[i].resize(img[i].width*2, img[i].height*2);
  }
}

function draw() {
  background(0);

  tr += 0.02;

  push();
  image(capa, -width/2, -height/2);
  pop();

  directionalLight(80, 180, 240, -1, -1, -1);
  directionalLight(240, 240, 240, -1, 1, -1);
  directionalLight(240, 240, 240, 1, -1, -1);

  push();
  rotateY(radians(sin(tr*0.2)*15));
  translate(-width/3, -height/2);
  //translate(-200, 0);
  
  let mi = map(mouseY,0,height,1,6);

  for (let x = 0; x < width; x += 12) {
    for (let y = 0; y < height; y += 12) {

      let c = img[int(mi)].get(x, y);
      let b = brightness(c);
      let z = map(b, 0, 255, 100, 300);

      //float sx = sin(x*0.01+tr)*120;
      //float cy = cos(y*0.017+tr)*120;
      let tz = tan(z*0.017+tr)*20;

      let rotY = map(y, 0, height, -90, 90);
      let rotX = map(x, 0, width, -90, 90);
      let rotZ = map(z, 0, 150, -90, 90);


      if (b != 0) {

        push();
        translate(x, y, z+tz);
        rotateY(radians(rotY+frameCount));
        rotateX(radians(rotX+frameCount));

        stroke(0, 50);
        fill(c);
        box(12);

        pop();
      }
    }
  }
  pop();
}
