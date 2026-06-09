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

function setup() {
  createCanvas(canvasX,canvasY);
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

var gravityX = 0;
var gravityY = 0.5;
var resistance = 0;
var elasticity = 0;
var stringLength = 100;
var maxLength = 500;
var ballWeight = 5;
var stringResistance = 5;
var anchorAmount = 5;
var ballsAmount = 5;
var highRate = false;
var haveColors = true;
var ballsCollision = false;
var anchorsDraggable = true;
var ballsDraggable = false;

function resetValues() {
  gravityX = 0;
  gravityY = 0.5;
  resistance = 0;
  elasticity = 0;
  stringLength = 100;
  maxLength = 500;
  ballWeight = 5;
  stringResistance = 5;
  anchorAmount = 5;
  ballsAmount = 5;
  highRate = false;
  haveColors = true;
  ballsCollision = false;
  anchorsDraggable = true;
  ballsDraggable = false;
}

// This is going to be a pain in the arse


function draw() {
  background(220);
}



document.getElementById("gravityXSlider").addEventListener("input", function() {
  gravityX = document.getElementById("gravityXSlider").value;
  document.getElementById("gx").textContent = gravityX.toFixed(2);
});
document.getElementById("gravityYSlider").addEventListener("input", function() {
  gravityY = document.getElementById("gravityYSlider").value;
  document.getElementById("gy").textContent = gravityY.toFixed(2);
});
document.getElementById("airResistance").addEventListener("input", function() {
  resistance = document.getElementById("airResistance").value;
  document.getElementById("ar").textContent = resistance.toFixed(2);
});
document.getElementById("elasticity").addEventListener("input", function() {
  elasticity = document.getElementById("elasticity").value;
  document.getElementById("el").textContent = elasticity.toFixed(2);
});
document.getElementById("stringLength").addEventListener("input", function() {
  stringLength = document.getElementById("stringLength").value;
  document.getElementById("sl").textContent = stringLength.toFixed(2);
});
document.getElementById("maxLength").addEventListener("input", function() {
  maxLength = document.getElementById("maxLength").value;
  document.getElementById("ml").textContent = maxLength.toFixed(2);
});
document.getElementById("ballWeight").addEventListener("input", function() {
  ballWeight = document.getElementById("ballWeight").value;
  document.getElementById("bw").textContent = ballWeight.toFixed(2);
});
document.getElementById("stringResistance").addEventListener("input", function() {
  stringResistance = document.getElementById("stringResistance").value;
  document.getElementById("sr").textContent = stringResistance.toFixed(2);
});
document.getElementById("anchorsAmount").addEventListener("input", function() {
  anchorAmount = document.getElementById("anchorsAmount").value;
  document.getElementById("aa").textContent = anchorAmount;
});
document.getElementById("ballsAmount").addEventListener("input", function() {
  ballsAmount = document.getElementById("ballsAmount").value;
  document.getElementById("ba").textContent = ballsAmount;
});
document.getElementById("highRateValues").addEventListener("change", function() {
  highRate = this.checked;
  if (!highRate) {
    highRate = false;
  } else {
    highRate = true;
  }
});
document.getElementById("haveColors").addEventListener("change", function() {
  haveColors = this.checked;
  if (!haveColors) {
    haveColors = false;
  } else {
    haveColors = true;
  }
});
document.getElementById("ballCollision").addEventListener("change", function() {
  ballsCollision = this.checked;
  if (!ballsCollision) {
    ballsCollision = false;
  } else {
    ballsCollision = true;
  }
});
document.getElementById("anchorsDraggable").addEventListener("change", function() {
  anchorsDraggable = this.checked;
  if (!anchorsDraggable) {
    anchorsDraggable = false;
  } else {
    anchorsDraggable = true;
  }
});
document.getElementById("ballsDraggable").addEventListener("change", function() {
  ballsDraggable = this.checked;
  if (!ballsDraggable) {
    ballsDraggable = false;
  } else {
    ballsDraggable = true;
  }
}); 
document.getElementById("resetValues").addEventListener("click",function() {
  resetValues();
});
document.getElementById("highRateValues").addEventListener("click",function() {
  if(!highRate) {
    if(!confirm("Are you sure you want to set values to high rate? Your device may not handle it if you aren't careful. If the simulation crashes, click 'reset values', then 'stop the script' then 'start the script'")) {
      return;
    }
    
  } else if(highRate) {
    
  }
})