import {LoadQueue} from 'PreloadJS';
import {Stage, Sprite, SpriteSheet, Ticker, Bitmap} from 'EaselJS';
import Character from './Character.js';
// import {checkPixelCollision} from 'CollisionJS';

 
const manifest = [
	{src:"src/json/SpriteSheets/braid.json", id:"braid", type:"spritesheet"},
	{src:"src/json/SpriteSheets/duck.json", id:"duck", type:"spritesheet"},
	{src:"src/img/Characters/Enemies/batright.png", id:"duck2"}
]

document.getElementById("canvas").focus();

const stage = new Stage("canvas");
const loader = new LoadQueue(false);
loader.on('complete', (event)=>{
	let duck = new Bitmap(loader.getResult("duck2"));
	let duck3 = duck.clone();
	duck3.rotation = 90;
	duck.y = 400;
	duck3.x = 400;
	duck3.y = 30;
	let duck2 = new Character(100, 100, 300, 100, loader.getResult("braid"));
	const env = [duck, duck3];

	stage.addChild(duck, duck2, duck3);
	duck2.speed = 5
	Ticker.on("tick", () => {
		// console.log(duck2.box);
		// const collision = duck2.checkCollision(duck);
		// if(collision) console.log(collision, duck2.box);

		duck2.checkEnvironment(env);
		stage.update();
	});

});

loader.loadManifest(manifest);

if(module.hot) module.hot.accept();
