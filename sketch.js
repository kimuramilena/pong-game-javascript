//ball variables
let xBall =  300;
let yBall = 200;
let diameter = 25;
let radius = diameter /2;

//speed ball
let speedXBall = 3;
let speedYBall = 3;

//racket variables
let xRacket = 5;
let yRacket = 150;
let widthRacket = 5;
let heightRacket = 70;

// opponents variable
let xOpponentRacket = 590;
let yOpponentRacket = 150;
let opponentYspeed;

//game score
let myPoints = 0;
let opponentPoints = 0;

//game soundtrack
let racketTune;
let pointsTune;
let soundtrackTune;


function showTheBall(){
    circle(xBall, yBall, diameter);
}

function ballSpeed() {
    xBall += speedXBall;
    yBall += speedYBall;
}

function checkboardcollision () {
   if (xBall + radius > width ||
     xBall - radius < 0) {
     speedXBall *= -1;
  }
  if (yBall + radius > height ||
     yBall - radius < 0) {
     speedYBall *= -1;
  }
}

function myRacketMovement () { 
  if (keyIsDown(UP_ARROW)) {
    yRacket -=10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRacket +=10;
  }
  yRacket = constrain(yRacket, 10, 325);
}

function checkRacketCollision () {
  let parte_de_cima_da_bolinha = yBall - radius
  let parte_de_baixo_da_bolinha = yBall + radius
  let parte_de_baixo_da_raquete = yRacket + heightRacket
  let parte_de_cima_da_raquete = yRacket
  
  if (xBall - radius < xRacket + widthRacket && parte_de_cima_da_bolinha < parte_de_baixo_da_raquete && parte_de_baixo_da_bolinha > parte_de_cima_da_raquete) {
    speedXBall *= -1;
    racketTune.play();
  }
}

function showTheRacket(x,y) {
  rect(x, y, widthRacket, heightRacket);
}


function setup() {
  createCanvas(600, 400);
  soundtrackTune.loop();
}

function opponentRacketMovement () {
  opponentYspeed = yBall - yOpponentRacket - widthRacket / 2 - 30;
  yOpponentRacket += opponentYspeed;
  yOpponentRacket = constrain(yOpponentRacket, 10, 325);
}

function checkOpponentRacketCollision () {
  if( xBall + radius > xOpponentRacket && yBall + radius < yOpponentRacket + heightRacket && yBall + radius > yOpponentRacket - heightRacket) {
    speedXBall *= -1;
   racketTune.play();
  }
}
function addGameScore() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(138,43,226));
  rect(150, 10, 40, 30);
  fill(255);
  text(myPoints, 170, 30);
  fill(color(138,43,226));
  rect(450, 10, 40, 30);
  fill(255);
  text(opponentPoints, 470, 30);
}
function scorePoints() {
  if (xBall > 585) {
    myPoints += 1;
    pointsTune.play();
  }
  if (xBall < 15) {
    opponentPoints += 1;
    pointsTune.play();
  }
}

function preload( ) {
  soundtrackTune = loadSound("trilha.mp3");
  pointsTune = loadSound("ponto.mp3");
  racketTune = loadSound("raquetada.mp3");
}

function draw() {
  background(0);
  showTheBall();
  ballSpeed();
  checkboardcollision();
  showTheRacket(xRacket, yRacket);
  showTheRacket(xOpponentRacket, yOpponentRacket);
  myRacketMovement();
  checkRacketCollision();
  opponentRacketMovement();
  checkOpponentRacketCollision();
  addGameScore();
  scorePoints();
}
