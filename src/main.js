// import createjs from 'createjs-collection';
import Duck from './Duck.js';
import {LoadQueue} from 'PreloadJS';
import EaselJS, {Stage, SpriteStage} from 'EaselJS';
// console.log( PreloadJS);
// console.log(EaselJS);
console.log(EaselJS);

const queue = new LoadQueue(false);
queue.on('fileload', (event)=>{

	const w = event.result.width;
	const h = event.result.height;
	const src = event.result.src;
	const data = {
		images: [src],
		frames: {width:w/8+1, height:h, regX:0, regX:0},
		animations: {
			run: [0,6,"run", 0.5],
		}
	};
	const spriteSheet = new createjs.SpriteSheet(data);
	let sprite = new createjs.Sprite(spriteSheet);
	sprite.gotoAndPlay("run");
	sprite.scaleX = 10;
	sprite.scaleY = 10;
	stage.addChild(sprite);
});
queue.loadFile('src/img/batright.png');
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
// 	let spriteSheet = new createjs.SpriteSheet(data);
// 	let sprite = new createjs.Sprite(spriteSheet);
// 	sprite.gotoAndPlay("run");
// 	sprite.scaleX = 0.5;
// 	sprite.scaleY = 0.5;
// 	stage.addChild(sprite);
// }

createjs.Ticker.on("tick", ()=>{stage.update()})

// createjs.Ticker.setFPS(30);
// createjs.Ticker.addListener(function()){
  
// }