var balloon,balloonImage1,balloonImage2;
var db,positon;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

function setup() {

  db = firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  db.ref("Balloon/Position").on("value", readPosition, showError);
  
}

function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    changePosition(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  
  }
  else if(keyDown(RIGHT_ARROW)){
    changePosition(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  
  }
  else if(keyDown(UP_ARROW)){
    changePosition(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale -0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    changePosition(0,10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale +0.01;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function changePosition(x,y){

db.ref("Balloon/Position").set({
  X: position.X + x,
  Y: position.Y + y
});

}


function readPosition(data){
  position = data.val(); 

  balloon.x = position.X;
  balloon.y = position.Y;
}

function showError(){
  console.log("ERROR IN DATABASE");
}
