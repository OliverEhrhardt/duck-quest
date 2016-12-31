import {LoadQueue, proxy} from 'PreloadJS';
import {Stage, Sprite, SpriteSheet, Ticker, Bitmap, Shape} from 'EaselJS';
import mapData from "./json/Maps/maps.json";
import manifest from "./json/manifest.json";
import Environment from "./Environment.js";
// import MapLoader from "./MapLoader.js"
// import Character from './Character.js';
// import {checkPixelCollision} from 'CollisionJS';
// 
// 



// const manifest = [
// 	{src: mapData.ground3.image, id: "ground", type: "image"}
// ];
// 

console.log(mapData)

const stage = new Stage("canvas");
const loader =  new LoadQueue(false);
loader.loadManifest(manifest);
loader.on('complete', (event)=>{
	const map = new Environment(mapData['2ground'], 10, 10);

	const map2 = new Environment(mapData['ground3'], 10, 10);


	map.posX = -500;
	// map.posY = -500;
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

	})

	// polyline.graphics = g;
	stage.addChild(map, polyline);
	stage.update();
});


document.getElementById("canvas").focus();

// const manifest = [
// 	{src:"src/json/Maps/ground3.json", id:"ground", type:"json"},
// 	{src:"src/img/Maps/ground3.png", id:"background"},
// ]

// const stage = new Stage("canvas");
// const loader = new LoadQueue(false);
// loader.installPlugin(MapLoader);
// loader.loadManifest(manifest);
// loader.on('complete', (event)=>{
// 	console.log(event);
// 	document.body.appendChild(loader.getResult("background"));
// });
// loader.load();
// loader.on('complete', (event)=>{
// 	const background = new Bitmap(loader.getResult("background"));

// 	const json = loader.getResult("ground");
// 	const map = json.map;

// 	const polygons = [];
// 	let i, len;
// 	map.forEach((p)=>{
// 		const polygon = new Shape();
// 		polygon.graphics.beginStroke("black");
// 		polygon.graphics.moveTo(p[0].x, p[0].y);

// 		len = p.length;
// 		for(i=1; i<len; i++){
// 			polygon.graphics.lineTo(p[i].x, p[i].y);
// 		}

// 		polygons.push(polygon);
// 	});

// 	stage.addChild(background, ...polygons)
// 	// debugger;

// 	stage.update();
// });

// loader.load();








 
// const manifest = [
// 	{src:"src/json/SpriteSheets/bat.json", id:"bat", type:"spritesheet"},
// 	{src:"src/json/SpriteSheets/braid.json", id:"braid", type:"spritesheet"},
// 	{src:"src/json/SpriteSheets/duck.json", id:"duck", type:"spritesheet"},
// 	{src:"src/img/Characters/Character/duck.png", id:"duck2"},
// 	{src:"src/img/Characters/Enemies/batright.png", id:"bat2"}
// ]

// document.getElementById("canvas").focus();

// const stage = new Stage("canvas");
// const loader = new LoadQueue(false);
// loader.on('complete', (event)=>{
// 	let duck = new Bitmap(loader.getResult("duck2"));
// 	let duck3 = duck.clone();
// 	let duck4 = duck.clone();
// 	let duck5 = duck.clone();
// 	duck4.y = duck5.y = 250;
// 	duck5.x = 600;
// 	duck4.x = -800;
// 	duck.y = 400;
// 	duck.rotation = -30;
// 	duck.x = 100
// 	duck3.x = -200;
// 	duck3.y = 200;
// 	let duck2 = new Character(80, 150, 300, 100, loader.getResult("duck"));
// 	const env = [duck, duck3, duck4, duck5];
// 	duck2.checkEnvironment(env);

// 	stage.addChild(duck, duck2, duck3, duck4, duck5);

// 	Ticker.on("tick", stage);

// });

// loader.loadManifest(manifest);

if(module.hot) module.hot.accept();
