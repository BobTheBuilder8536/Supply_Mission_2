const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground
var dropArea1,dropArea2,dropArea3;

var isClicked = false;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
	groundSprite = createSprite(width/2, 650, width,10);
	groundSprite.shapeColor=color(255);

	
	helicopterSprite=createSprite(0, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG);
	helicopterSprite.scale=0.6;
	helicopterSprite.velocityX = 5;
	
	engine = Engine.create();
	world = engine.world;
	
	
	//Create a Ground
	
	ground = Bodies.rectangle(width/2, 645, width, 10 , {isStatic:true} );
	World.add(world, ground);
	
	dropArea1 = Bodies.rectangle(width/2,633,200,20,{isStatic:true});
	World.add(world,dropArea1);
	
	dropArea2 = Bodies.rectangle(dropArea1.position.x - 110,dropArea1.position.y - 40,20,100,{isStatic:true});
	World.add(world,dropArea2);
	
	dropArea3 = Bodies.rectangle(dropArea1.position.x + 110,dropArea1.position.y - 40,20,100,{isStatic:true});
	World.add(world,dropArea3);

	Engine.run(engine);
	
}



function draw() {	
	rectMode(CENTER);
	background(0);
	
	
	if(isClicked === true){
		packageSprite.y = packageBody.position.y;
		packageSprite.x = packageBody.position.x;	
	}
	push();
	fill("red");
	noStroke();
	rect(dropArea1.position.x,dropArea1.position.y,200,20);
	rect(dropArea2.position.x,dropArea2.position.y,20,100);
	rect(dropArea3.position.x,dropArea3.position.y,20,100);
	pop();

	keyPressed();
	drawSprites();
}

function keyPressed() {
	if (keyWentDown("s")) {
		packageBody = Bodies.rectangle(helicopterSprite.x , 200 , 25 ,25, {restitution:0.8});
		World.add(world, packageBody);
		
		packageSprite=createSprite(packageBody.position.x, packageBody.position.y, 10,10);
		packageSprite.addImage(packageIMG);
		packageSprite.scale=0.2;
		
		isClicked = true;
	}
}



