var trex,chao,subchao,nuvem,cacto,escolhacacto,tempojogo;

var imagemNuvem,imagemchao,trexCorre

var imagemcacto1,imagemcacto2,imagemcacto3,imagemcacto4,imagemcacto5,imagemcacto,imagemfim,imagemrevive;

var sompulo,sommorri,somsafe

const jogar = 1
const encerrar = 0
var estadojogo=jogar

function preload(){
trexCorre = loadAnimation("trex1.png","trex2.png","trex3.png")

trexcollade = loadAnimation('trex_collided.png')

imagemchao = loadAnimation("ground2.png")
imagemNuvem = loadAnimation("cloud.png")


imagemcacto1 = loadImage("obstacle1.png")
imagemcacto2 = loadImage("obstacle2.png")
imagemcacto3 = loadImage("obstacle3.png")
imagemcacto4 = loadImage("obstacle4.png")
imagemcacto5 = loadImage("obstacle5.png")
imagemcacto6 = loadImage("obstacle6.png")

imagemfim = loadImage("gameOver.png")//gameOver Escrito errado
imagemrevive = loadImage("restart.png")
  
sompulo = loadSound("jump.mp3")
sommorri = loadSound("die.mp3")
somsafe = loadSound("checkPoint.mp3")

} 
function setup() {
 createCanvas(600,200)
  trex = createSprite(50,100,20,40)
subchao = createSprite(200,190,500,10)
subchao.visible = false

fimdejogo = createSprite(300,80,30,30)
fimdejogo.addAnimation('fimdejogo',imagemfim)
fimdejogo.scale = 0.5
  
  
  
revive = createSprite(300,120,30,30)
revive.addAnimation('reniciar',imagemrevive)
revive.scale = 0.5



tempojogo=0;

trex.setCollider('circle',0,0,40)
trex.debug = false

grupodenuvens = new Group();
grupodecactos = new Group();

trex.addAnimation("correndo",trexCorre)

trex.addAnimation("colidiu",trexcollade)

trex.scale = 0.5

chao =createSprite(200,180,500,10)
chao.addAnimation("chao",imagemchao)



}
function draw() {
background(180)

text('tempo: '+ tempojogo,500,30)


if(estadojogo == jogar){

tempojogo = tempojogo+1;

if(tempojogo > 0 && tempojogo %100 == 0){
somsafe.play()
}

fimdejogo.visible = false
revive.visible = false

chao.velocityX = -(3 + tempojogo / 100)

if(chao.x < 0){
chao.x =chao.width / 2
}

if(keyDown("space") && trex.y > 161){
trex.velocityY = -10
sompulo.play()
}
  

gerarNuvens()
gerarCactos()  
  
if(grupodecactos.isTouching(trex)){
estadojogo = encerrar;

sommorri.play()

grupodecactos.setVelocityXEach(0);
grupodenuvens.setVelocityXEach(0);
grupodenuvens.setLifetimeEach(-1);
grupodecactos.setLifetimeEach(-1);


trex.velocityX = 0;
}

} else if(estadojogo == encerrar){
chao.velocityX = 0
trex.changeAnimation('colidiu',trexcollade)
fimdejogo.visible = true
revive.visible = true
  
  if(mousePressedOver(revive) ){
restart()

}
  
}



 


 

  
trex.velocityY =trex.velocityY + 0.5


trex.collide(subchao)
  

drawSprites()
}

function restart(){
estadojogo=jogar
fimdejogo.visble = false;
revive.visble = false;

grupodecactos.destroyEach()
grupodenuvens.destroyEach()
trex.changeAnimation('correndo',trexCorre)
tempojogo = 0;
}



function gerarNuvens(){
if(frameCount % 60 == 0){
nuvem = createSprite(600,100,50,10)
nuvem.velocityX =-(3 + tempojogo / 100)
nuvem.addAnimation("nuvem passada",imagemNuvem)
nuvem.y = Math.round(random(60,100))
nuvem.depth = trex.depth
nuvem.scale = 0.4
trex.depth = trex.depth + 1 
nuvem.lifetime = 300;
grupodenuvens.add(nuvem);
} 
}
function gerarCactos(){
if(frameCount % 60 == 0){
cacto = createSprite(600,165,10,40)
cacto.velocityX =  -(3 + tempojogo / 100)
escolhacacto = Math.round(random(1,6)) 
  
switch(escolhacacto){
  case 1 : cacto.addImage(imagemcacto1)
           break;
  case 2 : cacto.addImage(imagemcacto2)
           break;
  case 3 : cacto.addImage(imagemcacto3)
           break;
  case 4 : cacto.addImage(imagemcacto4)
           break;         
  case 5 : cacto.addImage(imagemcacto5)
           break;         
  case 6 : cacto.addImage(imagemcacto6)
           break;         
  default : break ;           
}
cacto.scale = 0.4
cacto.lifetime = 300;
grupodecactos.add(cacto);

}
}