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
  createCanvas(canvasX, canvasY);
}

// Data structures
let anchors = [];
let balls = [];
let isRunning = false;

// Anchor class
class Anchor {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dragging = false;
  }
  
  display() {
    fill(100);
    stroke(0);
    strokeWeight(2);
    rect(this.x - 8, this.y - 8, 16, 16);
  }
}

// Ball class
class Ball {
  constructor(x, y, anchorIndex) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.anchorIndex = anchorIndex;
    this.restLength = stringLength;
    this.color = haveColors ? [random(255), random(255), random(255)] : [100, 100, 100];
    this.dragging = false;
  }
  
  applyForce(fx, fy) {
    this.vx += fx / ballWeight;
    this.vy += fy / ballWeight;
  }
  
  update() {
    if (!this.dragging) {
      // Apply gravity
      this.applyForce(gravityX * ballWeight, gravityY * ballWeight);
      
      // Apply air resistance
      this.vx *= (1 - resistance);
      this.vy *= (1 - resistance);
      
      // Update position
      this.x += this.vx;
      this.y += this.vy;
    }
    
    // Apply spring constraint
    this.applySpringConstraint();
  }
  
  applySpringConstraint() {
    let anchor = anchors[this.anchorIndex];
    let dx = this.x - anchor.x;
    let dy = this.y - anchor.y;
    let distance = sqrt(dx * dx + dy * dy);
    
    if (distance > maxLength) {
      let angle = atan2(dy, dx);
      this.x = anchor.x + cos(angle) * maxLength;
      this.y = anchor.y + sin(angle) * maxLength;
      distance = maxLength;
    }
    
    if (distance > 0.1) {
      let force = (distance - this.restLength) * (elasticity / 100);
      let fx = (dx / distance) * force * stringResistance;
      let fy = (dy / distance) * force * stringResistance;
      
      this.vx -= fx / ballWeight;
      this.vy -= fy / ballWeight;
    }
  }
  
  display() {
    let anchor = anchors[this.anchorIndex];
    
    // Draw string
    stroke(200);
    strokeWeight(1);
    line(this.x, this.y, anchor.x, anchor.y);
    
    // Draw ball
    if (haveColors) {
      fill(this.color[0], this.color[1], this.color[2]);
    } else {
      fill(150);
    }
    stroke(0);
    strokeWeight(1);
    circle(this.x, this.y, 8);
  }
}

var gravityX = 0;
var gravityY = 0.5;
var resistance = 0;
var elasticity = 50;
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

function initializeSystem() {
  anchors = [];
  balls = [];
  
  // Create anchors evenly distributed across top of canvas
  let spacing = canvasX / (anchorAmount + 1);
  for (let i = 0; i < anchorAmount; i++) {
    anchors.push(new Anchor(spacing * (i + 1), 50));
  }
  
  // Create balls attached to each anchor
  for (let i = 0; i < anchors.length; i++) {
    for (let j = 0; j < ballsAmount; j++) {
      let angle = (j / ballsAmount) * TWO_PI;
      let x = anchors[i].x + cos(angle) * stringLength;
      let y = anchors[i].y + sin(angle) * stringLength;
      balls.push(new Ball(x, y, i));
    }
  }
}

function scatterBalls() {
  balls.forEach(ball => {
    ball.vx = random(-5, 5);
    ball.vy = random(-5, 5);
  });
}

function stopMovement() {
  balls.forEach(ball => {
    ball.vx = 0;
    ball.vy = 0;
  });
}

function draw() {
  background(220);
  
  if (isRunning) {
    // Update all balls
    balls.forEach(ball => ball.update());
  }
  
  // Display springs and balls
  balls.forEach(ball => ball.display());
  anchors.forEach(anchor => anchor.display());
}



// Event listeners for sliders
document.getElementById("gravityXSlider").addEventListener("input", function() {
  gravityX = parseFloat(this.value);
  document.getElementById("gx").textContent = gravityX.toFixed(2);
});

document.getElementById("gravityYSlider").addEventListener("input", function() {
  gravityY = parseFloat(this.value);
  document.getElementById("gy").textContent = gravityY.toFixed(2);
});

document.getElementById("airResistance").addEventListener("input", function() {
  resistance = parseFloat(this.value);
  document.getElementById("ar").textContent = resistance.toFixed(2);
});

document.getElementById("elasticity").addEventListener("input", function() {
  elasticity = parseFloat(this.value);
  document.getElementById("el").textContent = elasticity.toFixed(2);
});

document.getElementById("stringLength").addEventListener("input", function() {
  stringLength = parseFloat(this.value);
  document.getElementById("sl").textContent = stringLength.toFixed(0);
  balls.forEach(ball => ball.restLength = stringLength);
});

document.getElementById("maxLength").addEventListener("input", function() {
  maxLength = parseFloat(this.value);
  document.getElementById("ml").textContent = maxLength.toFixed(0);
});

document.getElementById("ballWeight").addEventListener("input", function() {
  ballWeight = parseFloat(this.value);
  document.getElementById("bw").textContent = ballWeight.toFixed(2);
});

document.getElementById("stringResistance").addEventListener("input", function() {
  stringResistance = parseFloat(this.value);
  document.getElementById("sr").textContent = stringResistance.toFixed(2);
});

document.getElementById("anchorsAmount").addEventListener("input", function() {
  anchorAmount = parseInt(this.value);
  document.getElementById("aa").textContent = anchorAmount;
});

document.getElementById("ballsAmount").addEventListener("input", function() {
  ballsAmount = parseInt(this.value);
  document.getElementById("ba").textContent = ballsAmount;
});

document.getElementById("haveColors").addEventListener("change", function() {
  haveColors = this.checked;
});

document.getElementById("ballCollision").addEventListener("change", function() {
  ballsCollision = this.checked;
});

document.getElementById("anchorsDraggable").addEventListener("change", function() {
  anchorsDraggable = this.checked;
});

document.getElementById("ballsDraggable").addEventListener("change", function() {
  ballsDraggable = this.checked;
});

// Button listeners
document.getElementById("scatter").addEventListener("click", scatterBalls);
document.getElementById("stopMovement").addEventListener("click", stopMovement);

document.getElementById("start").addEventListener("click", function() {
  if (!isRunning) {
    initializeSystem();
    isRunning = true;
  }
});

document.getElementById("stop").addEventListener("click", function() {
  isRunning = false;
});

document.getElementById("resetValues").addEventListener("click", function() {
  gravityX = 0;
  gravityY = 0.5;
  resistance = 0;
  elasticity = 50;
  stringLength = 100;
  maxLength = 500;
  ballWeight = 5;
  stringResistance = 5;
  anchorAmount = 5;
  ballsAmount = 5;
  haveColors = true;
  
  document.getElementById("gravityXSlider").value = 0;
  document.getElementById("gravityYSlider").value = 0.5;
  document.getElementById("airResistance").value = 0;
  document.getElementById("elasticity").value = 50;
  document.getElementById("stringLength").value = 100;
  document.getElementById("maxLength").value = 500;
  document.getElementById("ballWeight").value = 5;
  document.getElementById("stringResistance").value = 5;
  document.getElementById("anchorsAmount").value = 5;
  document.getElementById("ballsAmount").value = 5;
  document.getElementById("haveColors").checked = true;
  
  document.getElementById("gx").textContent = "0";
  document.getElementById("gy").textContent = "0.5";
  document.getElementById("ar").textContent = "0";
  document.getElementById("el").textContent = "50";
  document.getElementById("sl").textContent = "100";
  document.getElementById("ml").textContent = "500";
  document.getElementById("bw").textContent = "5";
  document.getElementById("sr").textContent = "5";
  document.getElementById("aa").textContent = "5";
  document.getElementById("ba").textContent = "5";
});

document.getElementById("highRateValues").addEventListener("click", function() {
  gravityY = 2;
  elasticity = 80;
  stringLength = 50;
  ballWeight = 1;
  stringResistance = 8;
  
  document.getElementById("gravityYSlider").value = 2;
  document.getElementById("elasticity").value = 80;
  document.getElementById("stringLength").value = 50;
  document.getElementById("ballWeight").value = 1;
  document.getElementById("stringResistance").value = 8;
  
  document.getElementById("gy").textContent = "2";
  document.getElementById("el").textContent = "80";
  document.getElementById("sl").textContent = "50";
  document.getElementById("bw").textContent = "1";
  document.getElementById("sr").textContent = "8";
  
  balls.forEach(ball => ball.restLength = stringLength);
});