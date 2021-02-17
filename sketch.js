//Create variables here
var dog,dogImg;
var  happyDog,happyDogImg;
var foodS;
var foodStock;
var database;
function preload()
{
  happyDogImg=loadImage("happydog.png");
  dogImg=loadImage("Dog.png");
}

function setup() {
  createCanvas(500, 500);
  dog=createSprite(250,250,10,10);
  dog.scale=0.1;
  dog.addImage("dog1",dogImg);

  database=firebase.database();

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  
  
}


function draw() {  
 background(46,139,87);
 if(keyDown(UP_ARROW)){
   writeStock();
   dog.addImage("happyDog",happyDogImg);

 }


  drawSprites();
  fill ("black");
  textSize(20);
  text("press up arrow to feed the dog ",20,20);

  fill("black");
  textSize(10);
  text("food remaining :" + foodS,90,60)

dog.display();
  

}

//function to read 

function readStock(data){
  food=data.val();
}


//function to write 

function writeStock(foodS){
  if(foodS<=0){
    foodS=0;
  }
  else{
    foodS=foodS-1;
  }
  database.ref('/').update({
    food:foodS
  })
}

