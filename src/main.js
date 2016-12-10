import createjs from 'createjs-collection';
import Duck from './Duck.js';




var stage = new createjs.Stage("canvas");


// var img1 = new Image();
// img1.src = 'src/img/duck.png';
// img1.onload = function(){
//     var data = {
//         images: [img1.src],
//         frames: {width:img1.width, height:img1.height, regX:0, regY:0},
//         animations: {
//             stand:0,
//             run:[1,5],
//             jump:[6,8,"run"]
//         }
//     };
//     var spriteSheet = new createjs.SpriteSheet(data);
//     var animation = new createjs.Sprite(spriteSheet, "run");
// 	animation.gotoAndStop("stand");
// 	stage.addChild(animation);
// 	console.log(stage);
// 	stage.update();	
// 	 createjs.Ticker.addEventListener("tick", handleTick);
// 	 function handleTick(event) {
// 	     animation.regX -= 10;
// 	     stage.update();
// 	 }
// }




