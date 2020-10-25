var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivaltime = 0, score = 0;

function preload(){

//to load in monkey walking animation
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
//to load in banana and rock image
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}

function setup() {
  
//to create game area
  createCanvas(400, 400);  
  
//to create and give walking animation to monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
 
//to create ground
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;

//to add food and obstacle groups
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
}


function draw() {
  
//to colour the background
  background("lightblue");
  
//to display scores
  stroke("black");
  textSize(20);
  fill("black");
  text("bananas collected:"+ score, 150,80);
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time:"+ survivaltime, 150,50);

if (gameState === PLAY) {
  
//to give ground infinite scroling effect
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
//to make monkey jump when space is pressed
  if (keyDown("space") && monkey.y > 300 ) {
    monkey.velocityY = -18;
  }
  
  //to give gravity to the monkey
  monkey.velocityY = monkey.velocityY + 0.8;
  
//to stop monkey from falling out of game area
  monkey.collide(ground);   
  
//to spawn in food and obstacles
  spawnFood();
  spawnObstacles();
   
//to calculate survival time
  survivaltime= Math.ceil(frameCount/frameRate()); 
    
//to calculate no.of bananas collected
  if(FoodGroup.isTouching(monkey)){ 
    FoodGroup.destroyEach();
    score = score + 1;
  }
  
//to stop game when monkey touches obstacles
  if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
        gameState = END;
   }
}
//to display monkey, bananas, obstacles and ground
  drawSprites();
}

function spawnFood() {
//to spawn in bananas at random y value
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
    banana.lifetime = 300;
    
    banana.addImage(bananaImage);
    banana.scale=0.05;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;   
    
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}