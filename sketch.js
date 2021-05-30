var car, road, roadimg, carimg, mimg, cimg, fimg;
var coins=0;
var kills=0;
gameState="play"

function preload(){
  roadimg=loadImage("road 2.jpg"); 
  carimg=loadImage("car.jpg"); 
  mimg=loadImage("monster.jpg");
  cimg=loadImage("coin.jpg");
  fimg=loadImage("fireball.jpg");
}

function setup() {
  createCanvas(600, 600);
  
  road=createSprite(300, 300, 300, 600);
  road.addImage("r", roadimg);
  road.scale=3;
  
   car=createSprite(300, 550, 10, 10);
   car.addImage("c", carimg)
   car.scale=0.2
  
   monsterGroup=new Group();
   coinGroup=new Group();
   fireGroup=new Group();
 
}

function draw() {
 background("white");
  drawSprites();
  if(gameState==="play"){
  
    road.velocityY=6;
    if(road.y>400){
     road.y=road.height/2
    }
  
    textSize(30)
    fill("white")
    text("Coins: "+ coins, 450, 50);
    
    textSize(30)
    fill("white")
    text("Kills: "+ kills, 350, 50);
  
    spwanMonsters();
    spwanCoins()
  
    car.x=mouseX;
    if(keyDown("space")){
     createFire();
    }
    
    if(fireGroup.isTouching(monsterGroup)){
      monsterGroup.destroyEach();
      fireGroup.destroyEach();
      kills=kills+1;
    }
    
    if(fireGroup.isTouching(monsterGroup)){
      monsterGroup.destroyEach();
      fireGroup.destroyEach();
      kills=kills+1;
    }
    
    if(coinGroup.isTouching(car)){
      coinGroup.destroyEach();
      coins=coins+1;
    }
    
    if(monsterGroup.isTouching(car)){
      gameState="end"
    }
  }
  
  else if(gameState==="end"){
    monsterGroup.destroyEach()
    coinGroup.destroyEach()
    fireGroup.destroyEach()
    
    road.velocityY=0;
    
    textSize(50);
    fill("white");
    text("Game Over", 150, 250);
    
    textSize(30);
    fill("white");
    text("press r to restart", 170, 280);
    
    if(keyDown("r")){
      gameState="play";
    }
  }
}

function spwanMonsters(){
  if(frameCount%100==0){
    var monster=createSprite(random(50, 550), 0, 10, 10);
    monster.addImage("m", mimg);
    monster.scale=0.4;
    monster.velocityY=6
    monster.lifetime=90;
    monsterGroup.add(monster);
  }
}

function spwanCoins(){
  if(frameCount%150==0){
    var coin=createSprite(random(50, 550), 0, 10, 10);
    coin.addImage("c", cimg);
    coin.scale=0.05;
    coin.velocityY=6
    coin.lifetime=90;
    coinGroup.add(coin);
  }
}

function createFire(){
  fire=createSprite(30, 550, 10, 10);
  fire.velocityY=-4
  fire.addImage("f", fimg);
  fire.scale=0.1
  fire.x=car.x;
  fireGroup.add(fire);
}

