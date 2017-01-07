import {Sprite} from 'EaselJS';
import {checkPixelCollision} from 'CollisionJS';
import playerData from './json/player.json';


console.log(playerData);

/**
 * Class creates a playable character
 * @example let char = new Character(100, 100, 0, 0, loadedSpriteSheet);
 */
class Character extends Sprite {


	/**
	 * Constructor for Character class
	 * @param  {Number} width - width of the sprite
	 * @param  {Number} height - height of the sprite
	 * @param  {Number} x - x position of sprite based off center
	 * @param  {Number} y - y positon of the sprite based off center
	 * @param  {SpriteSheet} spriteSheet - Sprite Sheet of character
	 */
	constructor(spriteSheet){

		//setup
	  	super(spriteSheet);
	  	this.gotoAndPlay("stand");
	  	
	  	//scale sprite to correct size
	  	let bounds = this.getBounds();
	  	const canvas = document.getElementById('canvas');
	  	/**
	  	 * registration point's x value
	  	 * @type {Number}
	  	 */
	  	this.regX = bounds.width/2; 
	  	/**
	  	 * registration point's y value
	  	 * @type {Number}
	  	 */
	  	this.regY = bounds.height/2;

	  	/**
	  	 * max fallrate of character
	  	 * @type {Number}
	  	 */
		// this.fallRate = -(bounds.height>>2)
	  	//maps keys currently pressed
	  	let keyMap = {};

	  	/**
	  	 * Default keydown handler.
	  	 * @function
	  	 * @private
	  	 * @param  {Event}
	  	 */
		const handleDown = (event) => {

			if(event.key.match(/^(d|ArrowRight)$/)){
				if(this.velX !== this.speed) this.velX = this.speed;
				if(this.scaleX < 0) this.scaleX = -this.scaleX;
			}
			else if(event.key.match(/^(a|ArrowLeft)$/)){
				if(this.velX !== -this.speed) this.velX = -this.speed;
				if(this.scaleX > 0) this.scaleX = -this.scaleX;
			}
			else if(event.key.match(/^(w|ArrowUp)$/) && this.jumpNum < this.jumpMax){
				// this.y -= this.jump;
				this.velY = this.jump;
				this.jumpNum += 1;
				// debugger;			
			}
		};
		document.onkeydown = handleDown;

	  	/**
	  	 * Default keyup handler.
	  	 * @function
	  	 * @private
	  	 * @param  {Event}
	  	 */
		const handleUp = (event) => {
			if(event.key.match(/^(a|ArrowLeft)$/) && this.velX < 0){
				this.velX = 0;
			}
			if(event.key.match(/^(d|ArrowRight)$/) && this.velX > 0){
				this.velX = 0;
			}
			if(event.key.match(/^(w|a|s|d|ArrowUp|ArrowLeft|ArrowRight|ArrowDown)$/)){
				this.gotoAndPlay('stand'); 				
			} 
		};
		document.onkeyup = handleUp;


		/**
		 * Default movement handler. Fires every tick.
		 * @function
		 * @private
		 * @param  {Event} event - event object.
		 */
		const handleMovement = (event) => {
			this.prev = {};
			this.prev.x = this.x; this.prev.y = this.y;
			// console.log(this.prev);
			if(this.velX !== 0 && this.currentAnimation === "stand") this.gotoAndPlay("run");
			else if(this.currently === "run") this.gotoAndPlay("stand");
			if(this.map !== undefined){
				const edges = this.onCameraEdge;
				if(!edges["bottom"]){
					if(this.velY < 0 && this.y > canvas.height - this.yThreshold){
						edges["bottom"] = true;
					}
				}else{
					if(this.velY > 0 || this.y < canvas.height - this.yThreshold){
						edges["bottom"] = false;
					}else if(!edges["top"]){
						this.map.posY = this.map.y + this.velY;
					}
				}
				if(!edges["top"]){
					if(this.velY > 0 && this.y < this.yThreshold){
						edges["top"] = true;
					}
				}else{
					if(this.velY < 0 || this.y > this.yThreshold){
						edges["top"] = false;
					}else if(!edges["bottom"]){
						this.map.posY = this.map.y + this.velY;
					}
				}
				if(!edges["top"] && !edges["bottom"]){
					this.y -= this.velY
				}
				if(!edges["right"]){
					if(this.velX > 0 && this.x > canvas.width - this.xThreshold){
						edges["right"] = true;
					}
				}else{
					if(this.velX < 0 || this.x < canvas.width - this.xThreshold){
						edges["right"] = false;
					}else if(!edges["left"]){
						this.map.posX = this.map.x - this.velX;
					}
				}
				if(!edges["left"]){
					if(this.velX < 0 && this.x < this.xThreshold){
						edges["left"] = true;
					}
				}else{
					if(this.velX > 0 || this.x > this.xThreshold){
						edges["left"] = false;
					}else if(!edges["right"]){
						this.map.posX = this.map.x - this.velX;
					}
				}
				if(!edges["left"] && !edges["right"]){
					this.x += this.velX
				}
			}
		};
		this.on("tick", handleMovement);

		/**
		 * Gives the player control of this character
		 * @function
		*/
		this.giveControl = () => {
			document.onkeydown = handleDown;
			document.onkeyup = handleUp;
		};

		/**
		 * Copies player control to this character
		 * @type {Function}
		 */
		this.cloneControl = () =>{
			window.addEventListener('keydown', handleDown);
			window.addEventListener('keyup', handleUp);
		}
	}

	xThreshold = 400;

	yThreshold = 150;

	onCameraEdge = {
		'top': false,
		'bottom': false,
		'left': false,
		'right': false,
	};

	/**
	 * gravity of player
	 * @function
	 */
	gravity = -3;

	/**
	 * jump power
	 * @type {Number}
	 */
	jump = 20;

	/**
	 * [jumpMax description]
	 * @type {Number}
	 */
	jumpMax = 2;

	/**
	 * Number of jump performed
	 * @type {Number}
	 */
	jumpNum = 0;

	/**
	 * top speed of character
	 * @type {Number}
	 */
	speed = 20;

 	/**
 	 * x velocity of character
 	 * @type {Number}
 	 */
	velX = 0;

	/**
	 * y velocity of character
	 * @type {Number}
	 */
	velY = 0;


	/**
	 * bounds character to environmental constraints
	 * @function
	 * @param  {Array} env - Array of Bitmaps that the character cannot pass through
	 */
	checkEnvironment(map){
		this.map = map;

		class Edge{
			constructor(v1, v2){
				// this.v1 = v1;
				// this.v2 = v2;
				
				this.x = v1.x;
				this.y = v1.y;
				this.x2 = v2.x;
				this.y2 = v2.y;

				this.angle = Math.atan2(v2.y - v1.y, v2.x - v1.x);

				this.line = {x: Math.cos(this.angle - (Math.PI/2)), y: Math.sin(this.angle - (Math.PI/2))}
			}
		};

		const checkIntersection = (edges1, points1, edges2, points2) => {
			const edges = [...edges2, ...edges1],
				dists = [];
			let min1 = Infinity, 
				max1 = -Infinity, 
				min2 = Infinity, 
				max2 = -Infinity,
				len = edges.length,
				collision = false,
				dMin = Infinity,
				i, 
				line, 
				edge,
				d1,
				d2,
				d;

			const visited = {};
			for(i=0; i<len; i++){
				if(visited[edges[i].angle] !== true){
					edge = edges[i];
					visited[edge.angle] = true;
					line = edge.line;
				 	min1 = Infinity, 
					max1 = -Infinity, 
					min2 = Infinity, 
					max2 = -Infinity,
					points1.forEach((point)=>{
						d = line.x*point.x + line.y*point.y;
						// console.log(point, d);
						if(d < min1) min1 = d;
						if(d > max1) max1 = d;
					});
					points2.forEach((point)=>{
						d = line.x*point.x + line.y*point.y;
						if(d < min2) min2 = d;
						if(d > max2) max2 = d;
					});

					if(max1 <= min2 && min1 < max2) return false;
					if(max1 > min2 && min1 >= max2) return false;

					d1 = max1 - min2;
					d2 = max2 - min1;

					d = Math.min(d1, d2);

					dists.push({
						dist: Math.floor(d),
						line: line,
						edge: edge
					});		
				}

			}

			let line1, line2, x, x2, y, y2, x1, y1;
			const minDist = dists.reduce((a,b)=>{

				if(a.dist < b.dist) return a;
				else if(a.dist === b.dist){

					x = this.x;
					y = this.y;
					// console.log(x, y);
					x1 = a.edge.x;
					y1 = a.edge.y;
					x2 = a.edge.x2;
					y2 = a.edge.y2;

					

					d1 = Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1)/Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));

					x1 = b.edge.x;
					y1 = b.edge.y;
					x2 = b.edge.x2;
					y2 = b.edge.y2;

					d2 = Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1)/Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));


					return d1 < d2 ? a : b;
				}else return b;
			}, dists[0]);
			return minDist;

		};

		const handleEnvironment = (event) => {
			// console.log(this.x, this.y);
			const data = this.map.data;
			const box = this.box;
			const points = [
				{x: box.x, y: box.y},
				{x: box.x2, y: box.y},
				{x: box.x2, y: box.y2},
				{x: box.x, y: box.y2},
			];

			// console.log(points);

			const playerEdges = [];
			let i, len;
			len = points.length;
			for(i=0; i<len-1; i++){
				playerEdges.push(new Edge(points[i], points[i+1]));
			}
			playerEdges.push(new Edge(points[len-1], points[0]));


			const shapes = [];
			let children, obj;
			data.forEach((shape)=>{
				len = shape.length;

				children = [];
				obj = {};
				obj.points = shape;
				for(i=0; i<len-1; i++){
					children.push(new Edge(shape[i], shape[i+1]));
				}
				children.push(new Edge(shape[len-1], shape[0]));
				obj.edges = children;
				shapes.push(obj);
			});

			const collisions = [];
			let collision, collided = false;
			shapes.forEach((shape)=>{
				collision = checkIntersection(playerEdges, points, shape.edges, shape.points);
				if(collision) collisions.push(collision);
			});

			if(collisions.length){
				collision = collisions.reduce((a,b)=>(a.dist > b.dist ? a : b), collisions[0]);
				if(collision.edge.angle < Math.PI/50 && collision.edge.angle > -Math.PI/50){
					this.jumpNum = 0;
					this.velY = 0;
					collided = true;
				}
				
				this.x += collision.dist*collision.line.x;
				this.y += collision.dist*collision.line.y;				
				// this.velX = collision.dist*collision.line.x;
				// this.velY = -collision.dist*collision.line.y;
			}
			if(!collided) this.velY += this.gravity;
		};

		this.on('tick', handleEnvironment);

	}

	/**
	 * gives coordinates of top left and bottom right vertices
	 * @return {Object} coordinates
	 */
	get box(){
		const bounds = this.getBounds();
		const w = bounds.width/2; const h = bounds.height/2
		return {
			x: this.x-w, 
			y: this.y-h,
			x2: this.x+w,
			y2: this.y+h
		}
	}

	/**
	 * Changes Sprite Sheet of this character
	 * @function
	 * @param  {SpriteSheet} spriteSheet - Sprite Sheet being changed to.
	 */
	changeSpriteSheet(spriteSheet){

		/**
		 * @private
		 */
		this.spriteSheet = spriteSheet;
		const bounds = this.getBounds();
		this.regX = bounds.width/2; this.regY = bounds.height/2;
		this.gotoAndPlay("stand");
	}

	/**
	 * Checks if character is colliding with provided target
	 * @function
	 * @param  {Sprite|Bitmap} target - the object we are checking collisions with
	 */
	checkCollision(target){
		return checkPixelCollision(this, target, 0.8, true);
	}
}


export default Character