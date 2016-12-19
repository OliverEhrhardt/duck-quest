import {LoadQueue} from 'PreloadJS';
import {Stage, Sprite, SpriteSheet, Ticker, Bitmap} from 'EaselJS';
import Character from './Character.js';
// import {checkPixelCollision} from 'CollisionJS';

console.log(window.innerWidth);
 
const manifest = [
	{src:"src/json/SpriteSheets/bat.json", id:"bat", type:"spritesheet"},
	{src:"src/json/SpriteSheets/braid.json", id:"braid", type:"spritesheet"},
	{src:"src/json/SpriteSheets/duckarm.json", id:"duck", type:"spritesheet"},
	{src:"src/img/Characters/Enemies/batright.png", id:"duck2"}
]

document.getElementById("canvas").focus();

const stage = new Stage("canvas");
const loader = new LoadQueue(false);
loader.on('complete', (event)=>{
	let duck = new Character(200,200,1000,500,loader.getResult("duck"));
	// let braid = new Character(100,100,0,0, loader.getResult("braid"));
	let duck2 = new Bitmap(loader.getResult("duck2"));

	duck2.x = 0; duck2.y = 0;

	// duck.speed = 20

	duck.giveControl();
	stage.addChild(duck, duck2);
	Ticker.on("tick", () => {
		duck2.rotation += 5
		// console.log(duck.checkCollision(duck2));
		stage.update();
	});

});

loader.loadManifest(manifest);

if(module.hot) module.hot.accept();
