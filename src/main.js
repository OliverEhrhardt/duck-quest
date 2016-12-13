// import Duck from './Duck.js';
import {LoadQueue} from 'PreloadJS';
import {Stage, Sprite, SpriteSheet, Ticker} from 'EaselJS';
// console.log( PreloadJS);
// console.log(EaselJS);
// console.log(EaselJS);

const queue = new LoadQueue(false);
let sprite = new Sprite();
sprite.ready = false;
queue.on('fileload', (event)=>{

	const w = event.result.width;
	const h = event.result.height;
	console.log(h/2, w/2)
	const src = event.result.src;
	const data = {
		images: [src],
		frames: {width:w/4+3.5, height:h},
		animations: {
			run: [0,1,"run", 0.5],
		}
	};
	const sSheet = new SpriteSheet(data);
	sprite.spriteSheet = sSheet;
	sprite.gotoAndPlay("run");
	sprite.regX = data.frames.width/2; sprite.regY = data.frames.height/2;
	sprite.x = 200;
	sprite.y = 200;
	// sprite.rotation = 45
	stage.addChild(sprite);
	sprite.ready = true;
});
queue.loadFile('src/img/duck.png');
var stage = new Stage("canvas");

// var duck = new Duck(0,0);

// let img = new Image();
// img.src = "src/img/batleft.png";
// img.onload = function(){
// 	const data = {
// 		images: [img.src],
// 		frames: {width:img.width/8, height:img.height, regX:0, regX:0},
// 		animations: {
// 			run: [0,1,"run", 0.5],
// 		}
// 	};
// 	let spriteSheet = new SpriteSheet(data);
// 	let sprite = new Sprite(spriteSheet);
// 	sprite.gotoAndPlay("run");
// 	sprite.scaleX = 0.5;
// 	sprite.scaleY = 0.5;
// 	stage.addChild(sprite);
// }

Ticker.on("tick", ()=>{
	if(sprite.ready) sprite.rotation = ( sprite.rotation- 5)%360;
	stage.update()
});


  
// }