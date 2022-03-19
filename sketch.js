const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var fruit_con_4;
var rope3;

var bg_img;
var food;
var rabbit;

var button,button2,button3,button4;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;

var starobj, starimg
var star2
var baloon, baloonImg

var zeroPontos, umPonto,doisPontos
var PontosObj

var ground2
var ground3

var rope4

var baloonXimg, baloonX

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  starimg = loadImage('star.png');
  baloonImg = loadImage('baloon2.png');
  zeroPontos = loadAnimation('empty.png')
  umPonto = loadAnimation('one_star.png')
  doisPontos = loadAnimation('stars.png')
  baloonXimg = loadImage('balloon.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");


  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //botão 1
  button = createImg('cut_btn.png');
  button.position(110,90);
  button.size(50,50);
  button.mouseClicked(drop);

   //botão 2
   button2 = createImg('cut_btn.png');
   button2.position(390,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);

   button3 = createImg('cut_btn.png');
   button3.position(110,500);
   button3.size(50,50);
   button3.mouseClicked(drop3);

   button4 = createImg('cut_btn.png');
   button4.position(390,500);
   button4.size(50,50);
   button4.mouseClicked(drop4);
 
   rope = new Rope(7,{x:130,y:90});
   rope2 = new Rope(7,{x:420,y:90});
   rope3 = new Rope(9,{x:130,y:500});
   rope4 = new Rope(9,{x:420,y:500});

   starobj=createSprite(300,70,30,30)
   starobj.addImage(starimg)
   starobj.scale= 0.02

   star2=createSprite(90,height/2-30,30,30)
   star2.addImage(starimg)
   star2.scale= 0.02

  mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  ground = new Ground(250,height,width,20);
  ground2 = new Ground(250,height/10,width,20);
  ground3 = new Ground(50,height/2,width/3,20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(25,height/2-70,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

 baloon = createImg('baloon2.png')
 baloon.position(240,450)
 baloon.size(100,100)
 baloon.mouseClicked(baloonAir)

 baloonX = createImg('balloon.png')
 baloonX.position(height/2+50,250)
 baloonX.size(100,100)
 baloonX.mouseClicked(baloonAirX)


PontosObj = createSprite(50,30,30,30)
PontosObj.addAnimation('zero',zeroPontos)
PontosObj.addAnimation('um',umPonto)
PontosObj.addAnimation('dois',doisPontos)
PontosObj.scale= 0.2

  fruit = Bodies.circle(300,400,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);
  fruit_con_3 = new Link(rope3,fruit);
  fruit_con_4 = new Link(rope4,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();
  rope4.show();

  Engine.update(engine);
  ground.show();
  ground2.show();
  ground3.show();

  drawSprites();

if(collide(fruit,starobj)){
  starobj.visible=false 
  PontosObj.changeAnimation('um')
}

if(collide(fruit,star2)){
  star2.destroy()
  PontosObj.changeAnimation('dois')
}

  if(collide(fruit,bunny)==true)
  {
    World.remove(engine.world,fruit);
    fruit = null;
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
   }
  
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}

function drop3()
{
  cut_sound.play();
  rope3.break();
  fruit_con_3.dettach();
  fruit_con_3 = null;
}

function drop4()
{
  cut_sound.play();
  rope4.break();
  fruit_con_4.dettach();
  fruit_con_4 = null;
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

function baloonAir(){
  Matter.Body.applyForce(fruit,fruit.body,{x:0,y:-0.03})
}

function baloonAirX(){
  Matter.Body.applyForce(fruit,fruit.body,{x:-0.03,y:0})
}