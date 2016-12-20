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
	let duck = new Bitmap(loader.getResult("duck2"));
	let duck3 = duck.clone();
	duck.y = 400;
	duck3.x = -800;
	duck3.y = 150;
	let duck2 = new Character(80, 150, 300, 50, loader.getResult("duck"));
	const env = [duck, duck3];
	duck2.checkEnvironment(env);

	stage.addChild(duck, duck2, duck3);

	Ticker.on("tick", stage);

});

loader.loadManifest(manifest);

if(module.hot) module.hot.accept();
