var canvasX = 0;
var canvasY = 0;

function mobile() {
  const toMatch = [
    /Android/i, /iPhone/i, /BlackBerry/i, /Windows Phone/i
  ];
  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}
function isChrome() {
  const toMatch = [/Chrome/i];
  return toMatch.some((toMatchItem) => {  return navigator.userAgent.match(toMatchItem)
  });
}
if (mobile()) {
  canvasX = 325;
  canvasY = 500;
} else if (isChrome()) {
  canvasX = 1000;
  canvasY = 600;
} else {
  canvasX = 800;
  canvasY = 800;
}

let springData = {
  locationX:[],
  locationY:[],
  velocityX:[],
  velocityY:[],
  id:[],
  connectedTo:[],
  colorRed:[],
  colorGreen:[],
  colorBlue:[]
};

function setup() {
  createCanvas(canvasX,canvasY);
}

function draw() {
  background(220);
}