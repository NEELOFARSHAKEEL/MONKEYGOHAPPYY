  //game state
  var PLAY = 1;
  var END = 0;
  var gameState = "SERVE";
  var gameState = PLAY;
  var score=0;
  var survivalTime=0;
  var BananasCollected=0;
  
 
  //monkey
  var player = createSprite(80, 315,20,20);
    player.scale=0.10;

  var finish=createSprite(200,200);
  finish.setAnimation("textGameOver_1");
  finish.scale=0.5;
  //restart icon);
  var restart=createSprite(190,265,10,10);
  restart.setAnimation("restart");
  
  //ground
  var ground = createSprite(200, 350,400,10);
  ground.shapeColor="black";

  //groups
  var FoodGroup=createGroup();
  var EnemyGroup=createGroup();
 
  //points
  var survivalTime=0;
  //background
   var BG = createSprite(200,270,100,100);
  BG.setAnimation("BG");
  //BG.scale=1.5;
   BG.velocityX=-2;

  function draw(){
    
    //background
    background("180");
    
    
         
                  if ((BG.x < 200)){
         BG.x = BG.width/2;
         
        }
      

   
   //colliding
    player.collide(ground);
    
    //game state is in play
    
    
      
    if (gameState === PLAY){
      //it means that the game over and restart icon will not be visible for whole game
      restart.visible=false;
      finish.visible=false;
      player.visible=true;
      BG.visible=true;
      BG.velocityX=-2;
      
       stroke("white");
        textSize(15);
      fill("blue");
      text("Game is loading!! please wait...",20,50);
      
      
     
     
    
    //animation of monkey
      player.setAnimation("monkey");
      
      //to makesure that banana and stone is visible in our game
      spawnBananas();
      spawnEnemies();
      
      //when space key is pressed the monkey will jump
      if(keyDown("space")&& player.y >= 305){
       player.velocityY=-18;
       playSound("sound://category_jump/arcade_game_jump_18.mp3", false);
       
       }
       
       //gravity to make our monkey jump
      player.velocityY=player.velocityY+1;
       //to text score in our game
      stroke("black");
      textSize(20);
      fill("black");
      survivalTime=Math.ceil(frameCount/frameRate());
      text("Score = "+score,295,30);
      
      
       stroke("black");
      textSize(20);
      fill("black");
      survivalTime=Math.ceil(frameCount/frameRate());
      
      
      //if monkey is touching banana then it get destroyed
      if (player.isTouching(FoodGroup)){
        playSound("sound://category_collect/energy_bar_recharge_4.mp3", false);
        
        FoodGroup.destroyEach();
        survivalTime=survivalTime+10;
        score=score+2;
        BananasCollected = BananasCollected+1;
      }
       
       //if monkey is touching stone then game state = end
      if(player.isTouching(EnemyGroup)){
         playSound("sound://category_female_voiceover/game_over_female.mp3", false);
         gameState=END;
         
       }
      
      //game state = END
    }else if(gameState === END){
      finish.visible =true;
       restart.visible =true;
       BG.visible=false;
       
       //to text our points
       stroke("black");
      textSize(20);
      fill("black");
      text("Survival Time : "+survivalTime,100,50);
      text("Bananas collected ="+BananasCollected,120,120);
      //groups that are getting destroyed
      EnemyGroup.destroyEach();
      FoodGroup.destroyEach();
      
      //groups that dont have velocity in end state
      EnemyGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      
      //in end state thr restart icon and game over will be visible
      restart.visible=true;
      finish.visible=true;
      
      //in end state the monkey will become stop
      player.setAnimation("monkey_copy_1");
      
      //the restart icon will work when it is pressed
      if(mousePressedOver(restart)){
        reset();
      }
    }
    
    drawSprites();
  }
  
  function spawnBananas(){
    
    //the frame count of banana
    if (frameCount % 80 === 0) {
       
       //banana
      var banana = createSprite(600,250,40,10);
      banana.y = random(120,200);    
      banana.velocityX = -5;
      
      //assign lifetime to the variable
      banana.lifetime = 500;
      player.depth = banana.depth + 1;
      
      //add image of banana
       banana.setAnimation("Banana");
      banana.scale=0.05;
      
      
      
      //add each banana to the group
      FoodGroup.add(banana);
      
     }
  }
  
  function spawnEnemies(){
    
    //frame count
    if(World.frameCount%80===0){
      
      //stone
      var obstacle = createSprite(430, 318);
      obstacle.setAnimation("Stone");
      obstacle.scale=0.15;
      
      //lifetime of stone
      obstacle.lifetime=500;
      
      //velocity of stone
      obstacle.velocityX=-5;
      
      //ai of obstacle
      obstacle.setCollider("circle",0,0,130);
  
      EnemyGroup.add(obstacle);
      
   }
  }
  function reset(){
        
        gameState=PLAY;
        score=0;
        
        
       
    
  }
  
  






