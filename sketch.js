var gameState = "Play";
var ground, groundImage, bg, bgImage;
var mario, mAnimation;
var obstacle, obstacleAnimation, coin, coinsImage;
var score;
var obstaclesGroup, coinsGroup;
var jumpSound, dieSound, checkPointSound;
var collidedAnimation;
var gameOver, gameOverImage, restart, restartImage;
var highScore=0;
var score= 0 


function preload() {
bgImg = loadImage("bg.png")
mAnimation = loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png")
mCollision = loadAnimation("collided.png")
groundImg = loadImage("ground2.png")
obstacleAnimation = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png")
obstacle2img = loadImage("bullet3.png")
coinImg = loadImage("coin.png")
gameOverimg = loadImage("gameOver.png")
restartimg = loadImage("restart.png")
bAnimation = loadAnimation("bird1.png","bird2.png","bird3.png","bird4.png","bird 5.png")


}

function setup() {
  createCanvas(600, 400);
  bg = createSprite(200,200,600,400)
  bg.addImage(bgImg)
  bg.x = bg.width/2
  bg.scale = 1.1

  ground = createSprite(200,370,250,10)
  ground.addImage(groundImg)
  ground.scale = 1.0

  mario = createSprite(50,210,10,40)
  mario.addAnimation('running',mAnimation)
  mario.addAnimation('collision',mCollision)
  mario.scale = 1.4

  obstacleGroup = new Group()
  coinGroup = new Group()
  birdGroup = new Group()

  mario.setCollider("rectangle", 0, 0, 35,35)
  mario.debug= false

  gameover = createSprite(290,160)
  gameover.addImage(gameOverimg)
  gameover.scale = 0.7

  restart = createSprite(300,200)
  restart.addImage(restartimg)
  restart.scale = 0.7


}

function draw() {
  background(210);
  if (gameState === "Play") {
    gameover.visible = false
    restart.visible = false
    ground.velocityX = -10;

    if (keyDown("space") && mario.y > 150) {
      mario.velocityY = -10;
      

    }
    mario.velocityY = mario.velocityY + 0.8;


    if (ground.x < 0) {
      ground.x = ground.width / 2;

    }


  

  for (i = 0; i < obstacleGroup.length; i++) {
    if (mario.isTouching(obstacleGroup.get(i))) {
 gameState="End"
      mario.changeAnimation("collision")
    

    
 obstacleGroup.get(i).destroy();
    }
  }
  for (i = 0; i < birdGroup.length; i++) {
    if (mario.isTouching(birdGroup.get(i))) {
 gameState="End"
      mario.changeAnimation("collision")
    
      
    
 birdGroup.get(i).destroy();
    }
  }


    for (i = 0; i < coinGroup.length; i++) {
      if (mario.isTouching(coinGroup.get(i))) {
        score = score + 1;
        
        if(highScore<score){
          highScore=score;
        }
        
       coinGroup.get(i).destroy();
      }
    }

 
    obstacles();
    spawnPoints();
     birds()
   

  }
 else if(gameState==="End"){
  gameover.visible = true
  restart.visible = true
  ground.velocityX = 0
  mario.velocityY = 0
  coinGroup.setVelocityXEach(0)

  obstacleGroup.setVelocityXEach(0);

  coinGroup.setLifetimeEach(-1)
  obstacleGroup.setLifetimeEach(-1)
  
  if(mousePressedOver(restart)){
    resetButton()
  }

  
 }

  mario.collide(ground)

  drawSprites()
  textSize(18);
  fill(0)
  text("SCORE: " + score, 350, 40);
  textSize(16);
  fill(120);
  text("HighestScore:" + highScore,350,60);

}


function resetButton(){
gameState = "Play"
score = 0
obstacleGroup.destroyEach()
coinGroup.destroyEach()
mario.changeAnimation("running", mAnimation)
}


function obstacles(){
if(frameCount%100=== 0){
  obstacle = createSprite(600,315,10,30)
  obstacle.velocityX = -10
  
  //obstacle.addAnimation('obs', obstacleAnimation)
 // obstacle.addImage(obstacle2img)

var rand = Math.round(random(1,6));
switch(rand) {
  case 1: obstacle.addAnimation('obs',obstacleAnimation);
          break;
  case 2: obstacle.addImage(obstacle2img);
          break;
  case 3: obstacle.addAnimation('obs',obstacleAnimation);
          break;
  case 4: obstacle.addImage(obstacle2img);
          break;
  case 5: obstacle.addAnimation('obs',obstacleAnimation);
          break;
  case 6: obstacle.addImage(obstacle2img);
          break;
  default: break;
}
obstacle.scale = 0.7
obstacle.lifetime = 170
obstacleGroup.add(obstacle)
}
}




function spawnPoints(){
  if(frameCount%100=== 0){
    coin = createSprite(600,300,10,10)
    coin.velocityX = -3
    coin.addImage(coinImg)
    coin.scale = 0.7
    coin.lifetime= 200
   coin.y=Math.round(random(170,200))
   coinGroup.add(coin)


}
}
function birds(){
  if(frameCount%150=== 0){
    bird = createSprite(650,200,10,10)
    bird.velocityX = -4
    bird.addAnimation("bird", bAnimation)
    bird.scale = 0.2
    bird.lifetime = 200
    bird.y=Math.round(random(120,250))
    birdGroup.add(bird)
  }
}
