import {LoadQueue, proxy} from 'PreloadJS';
import {Stage, Sprite, SpriteSheet, Ticker, Bitmap, Shape} from 'EaselJS';
import mapData from "./json/maps.json";
import manifest from "./json/manifest.json";
import Environment from "./Environment.js";
// import MapLoader from "./MapLoader.js"
import Character from './Character.js';
// import {checkPixelCollision} from 'CollisionJS';
// 
// 

// manifest.push({src:"src/images/characters/character/duckwalk.png"})


// const manifest = [
// 	{src: mapData.ground3.image, id: "ground", type: "image"}
// ];
// 
// 
document.getElementById("canvas").focus();

// console.log(mapData)

const stage = new Stage("canvas");
const loader =  new LoadQueue(false);
loader.loadManifest(manifest);
loader.on('complete', (event)=>{
	const map = new Environment(mapData['1ground']);

	const char = new Character(loader.getResult("duck"));
	const bounds = stage.getBounds();
	char.x = stage.canvas.width/2;
	char.y = stage.canvas.height/2;

	char.checkEnvironment(map);

	const polyline = new Shape();
	const g = polyline.graphics;
	g.beginStroke("red")
	map.data.forEach((p)=>{
		g.moveTo(p[0].x, p[0].y);
		const len = p.length;
		let i;
		for(i=1; i<len; i++){
			g.lineTo(p[i].x, p[i].y);
		}
		g.lineTo(p[0].x, p[0].y)
	});


	const box = char.box;
	const points = [
		{x: box.x, y: box.y},
		{x: box.x2, y: box.y},
		{x: box.x2, y: box.y2},
		{x: box.x, y: box.y2},
	];

	let i, len;
	len = points.length;
	g.moveTo(points[0].x, points[0].y);
	for(i=1; i<len; i++){
		g.lineTo(points[i].x, points[i].y);
	}
	g.lineTo(points[0].x, points[0].y)
	// polyline.graphics = g;
	stage.addChild(map, char);
	
	// Ticker.framerate = 30;

	Ticker.on('tick', (event)=>{
		stage.update();
		// debugger;
	});
});


if(module.hot) module.hot.accept();
