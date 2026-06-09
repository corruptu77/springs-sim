function setup() {
  createCanvas(400,400);
}
var gravity = 1;
var springX = 0;
var springY = 0;
var velocityX = 0;
var velocityY = 0;
var springLength = 25;
function calculatePosition() {
  springX += velocityX;
  springY += velocityY;
  calculateVelocity();
}
function calculateVelocity() {
  if (springX > mouseX) {
    velocityX --;
  } else if (springX < mouseX) {
    velocityX ++;
  } else {
    velocityX += 0;
  }
  if (springY > mouseY+50) {
    velocityY --;
  } else if (springY < mouseY+50) {
    velocityY ++;
  } else {
    velocityY += 0;
  }
}
function draw() {
  background(220);
  noFill();
  stroke(0);
  strokeWeight(1);
  //fuck
  rect(mouseX-5,mouseY-5,10,10);
  line(mouseX,mouseY,springX,springY);
  ellipse(springX,springY,25,25);
  calculatePosition();
  if (mouseIsPressed) {
    console.log(`X: ${springX} \nY: ${springY} \nVX: ${velocityX} \nVY: ${velocityY}`);
  }
}