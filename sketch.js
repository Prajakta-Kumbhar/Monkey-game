//to declare variables of game states
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//variables of sprites and images
var monkey , monkey_running, monkey_collided; 
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0;


function preload()
{
  //to load the animation of running monkey
  monkey_running =                loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png",  "sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png"  )
  
  //to load the image of banana,obstacle and a collided monkey
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_collided = loadAnimation("sprite_7.png");
}


function setup() 
{
  //to create a canvas
  createCanvas(400,400); 

  //to create monkey sprite,to add animation to monkey and scale of it's     image
  monkey = createSprite(60,150,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale = 0.2;
  
  //to create ground sprite
  ground = createSprite(0,400,400,10);
  //to move the ground when it's half of the canvas
  ground.x = ground.width/2;
  
  //to create(declare) groups
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  // monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  // monkey.debug = true;
}


function draw() 
{
  //to add colour to background
  background("black");
  
  //to show survival time(score) and to fill that text
  fill("yellow");
  text("Survival Time: "+ score,300,50);
   
  //if the gamestate is play then...
  if(gameState === PLAY)
  {
    //increase the score
    score = score + Math.round(getFrameRate()/60);
    
    //if 'space' is pressed and if the monkey's y position is greater or       equal to 100 then...
    if(keyDown("space") && monkey.y >= 100)
    {
      //velocity of the monkey will be -12 (i.e. it will jump)
      monkey.velocityY = -12;
    }
      //when the monkey jumps it should also come down so should add             velocity so it comes down
      monkey.velocityY = monkey.velocityY + 0.5;
  
    //if ground's x position is less than 0 then...
    if(ground.x < 0)
    {
      //to move the ground
      ground.x = ground.width/2;
    }
    
    //if monkey is touching the bananas then..
    if(bananaGroup.isTouching(monkey))
    {
      //the bananas will be detroyed
      bananaGroup.destroyEach();
    }
    
      //the obstacles and bananas will be created
      spawnObstacle();
      spawnBanana();
   
    //if the monkey is touching the obstacles then...
    if(obstacleGroup.isTouching(monkey))
    {
      //the banana will be destroyed and the gamestate will change to end
      bananaGroup.destroyEach();
      gameState = END;
    }
    
    //but it the gamestate is end then...
  }else if(gameState === END)
    {
      //display a text as game over in white colour ans size 30
      fill("white")
      textSize(30);
      text("Game Over!",140,200);
      
      //the velocity of ground and monkey should be 0
      ground.velocityX = 0;
      monkey.velocityX = 0;
      
      //monkey's animation should be changed to collided monkey
      monkey.changeAnimation("collided", monkey_collided);
      
      //the obstlaces,and banana's grp's velocity will be 0 and lifetime         will decrease later
      obstacleGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
    }

  //the monkey should be collided to the ground all time
  monkey.collide(ground);
  
  //to display everything 
  drawSprites();
}


//to spawn(create) obstacles
function spawnObstacle()
{
  //if the frame is 300(after 300th frame)...
  if (frameCount % 300 === 0)
  {
    //obstacles will be created
    var obstacle = createSprite(390,358,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    obstacle.lifeTime = 200;
    
    //to add image of obstacle 
    obstacleGroup.add(obstacle);
  }
}


//to spawn(create) bananas
function spawnBanana()
{
  //if frame is 80(after 80th frame)
  if (frameCount % 80 === 0)
  {
    //bananas will be created
    var banana = createSprite(390,200,10,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifeTime = 200;
    
    //to add image of obstacle 
    bananaGroup.add(banana);
  }
}