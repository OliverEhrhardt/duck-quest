import {LoadQueue} from 'PreloadJS';
import {Stage, Sprite, SpriteSheet, Ticker} from 'EaselJS';
import Character from './Character.js';
// import {checkPixelCollision} from 'CollisionJS';
 
const manifest = [
	{src:"src/json/SpriteSheets/bat.json", id:"bat", type:"spritesheet"},
	{src:"src/json/SpriteSheets/duck.json", id:"duck", type:"spritesheet"},
]

document.getElementById("canvas").focus();

const stage = new Stage("canvas");
const loader = new LoadQueue(false);
loader.on('complete', (event)=>{
	let duck = new Character(50,50,0,0,loader.getResult("bat"));
	let duck2 = new Character(50, 50, 0, 50, loader.getResult("bat"));

	// duck.speed = 20

	duck.giveControl();
	stage.addChild(duck, duck2);
	Ticker.on("tick", () => {
		duck.rotation += 5
		console.log(duck.checkCollision(duck2));
		stage.update();
	});

});

loader.loadManifest(manifest);

if(module.hot) module.hot.accept();
