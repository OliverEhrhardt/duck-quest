import {LoadQueue} from 'PreloadJS';
import {Stage, Sprite, SpriteSheet, Ticker} from 'EaselJS';
import Character from './Character.js';
import {checkPixelCollision} from 'CollisionJS';

const manifest = [
	{src:"src/img/Characters/Enemies/bat.json", id:"bat", type:"spritesheet"}
]

document.getElementById("canvas").focus();

const stage = new Stage("canvas");
const loader = new LoadQueue(false);
loader.on('fileload', (event)=>{
	let duck = new Character(50,50,50,50,event.result);
	let duck2 = new Character(50, 50, 100, 100, event.result);

	// duck.speed = 20

	duck.giveControl();
	stage.addChild(duck, duck2);
	Ticker.on("tick", () => {
		console.log(duck.checkCollision(duck2));
		stage.update();
	});

});

loader.loadManifest(manifest);
