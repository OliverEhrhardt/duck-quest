import {LoadQueue} from 'PreloadJS';
import {Stage, Sprite, SpriteSheet, Ticker, Bitmap} from 'EaselJS';
import Character from './Character.js';
// import {checkPixelCollision} from 'CollisionJS';

 
const manifest = [
	{src:"src/json/SpriteSheets/bat.json", id:"bat", type:"spritesheet"},
	{src:"src/json/SpriteSheets/braid.json", id:"braid", type:"spritesheet"},
	{src:"src/json/SpriteSheets/duck.json", id:"duck", type:"spritesheet"},
	{src:"src/img/Characters/Character/duck.png", id:"duck2"},
	{src:"src/img/Characters/Enemies/batright.png", id:"bat2"}
]

document.getElementById("canvas").focus();

const stage = new Stage("canvas");
const loader = new LoadQueue(false);
loader.on('complete', (event)=>{
	let duck = new Bitmap(loader.getResult("bat2"));
	let duck3 = duck.clone();
	let duck4 = duck.clone();
	let duck5 = duck.clone();
	duck4.y = duck5.y = 250;
	duck5.x = 600;
	duck4.x = -800;
	duck.y = 400;
	duck3.x = -200;
	duck3.y = 200;
	let duck2 = new Character(80, 150, 300, 100, loader.getResult("duck"));
	const env = [duck, duck3, duck4, duck5];
	duck2.checkEnvironment(env);

	stage.addChild(duck, duck2, duck3, duck4, duck5);

	Ticker.on("tick", stage);

});

loader.loadManifest(manifest);

if(module.hot) module.hot.accept();
