var ball;
var playerPaddle;
var computerPaddle;
var gameState = "serve";
var compScore = 0;
var playerScore = 0;
var topEdge,bottomEdge;

function preload(){
 
}

function setup() {
  createCanvas(400, 400);
  ball = createSprite(200,200,10,10);
  playerPaddle = createSprite(390,200,10,80);
  computerPaddle= createSprite(10,200,10,80);
  topEdge = createSprite(200,1,400,1);
  bottomEdge = createSprite(200,399,400,1);
  ball.shapeColor = "white";
  playerPaddle.shapeColor = "white";
  computerPaddle.shapeColor = "white";
  bottomEdge.visible = false;
  topEdge.visible = false;


}

function draw() {
  background("black");
  textSize(20);

text(compScore,170,20);
  text(playerScore, 230,20);
  if (gameState === "serve") {
    text("Press Space to Serve",110,180);
  } 
  //draw dotted lines
  for (var i = 0; i < 400; i+=20) {
    stroke("white");
     line(200,i,200,i+10);
  }
  
  
  
  if (gameState === "over") {
    text("Game Over!",170,160);
    text("Press 'R' to Restart",150,180);
  }
  
  if (keyDown("r")) {
    gameState = "serve";
    compScore = 0;
    playerScore = 0;
  }
  
  
  //give velocity to the ball when the user presses play
  //assign random velocities later for fun
  if (keyDown("space") && gameState == "serve") {
    ball.velocityX = 5;
    ball.velocityY = 5;
    gameState = "play";
  }
  
  //make the playerPaddle move with the mouse
  playerPaddle.y = World.mouseY;
  
  
  
  //make the ball bounce off the user paddle
  if(ball.isTouching(playerPaddle)){
    ball.x = ball.x - 5;
    ball.velocityX = -ball.velocityX;
  }
  
  //make the ball bounce off the computer paddle
  if(ball.isTouching(computerPaddle)){
   
    ball.x = ball.x + 5;
    ball.velocityX = -ball.velocityX;
  }
  
  //place the ball back in the centre if it crosses the screen
  if(ball.x > 400 || ball.x < 0){
      
    if (ball.x < 0) {
      playerScore++;
    }
    else {
      compScore++;
    }
      
    ball.x = 200;
    ball.y = 200;
    ball.velocityX = 0;
    ball.velocityY = 0;
    gameState = "serve";
    
    if (compScore=== 5 || playerScore === 5){
      gameState = "over";
    }
  }
  
  //make the ball bounce off the top and bottom walls
  if (ball.isTouching(topEdge) || ball.isTouching(bottomEdge)) {
    ball.bounceOff(topEdge);
    ball.bounceOff(bottomEdge);
     
  }
  
  //add AI to the computer paddle so that it always hits the ball
  computerPaddle.y = ball.y;
  drawSprites();
}