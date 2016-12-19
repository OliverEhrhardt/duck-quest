import {Sprite} from 'EaselJS';
import {checkPixelCollision} from 'CollisionJS';


/**
 * Class creates a playable character
 * @example const char = new Character(100,100,0,0,loadedSpriteSheet);
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
	constructor(width, height, x, y, spriteSheet){

		//setup
	  	super(spriteSheet);
	  	this.gotoAndPlay("stand");

	  	/**
	  	 * height of character in pixels
	  	 * @type {Number}
	  	 */
	  	this.height = height;

	  	/**
	  	 * width of character in pixels
	  	 * @type {Number}
	  	 */
	  	this.width = width;
	  	
	  	//scale sprite to correct size
	  	let bounds = this.getBounds();

	  	/**
	  	 * Scales x plane of character
	  	 * @type {Number}
	  	 */
	  	this.scaleX = width/bounds.width;
	  	/**
	  	 * Scales y plane of character
	  	 * @type {Number}
	  	 */
	  	this.scaleY = height/bounds.height;
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
	  	 * Character's x position
	  	 * @type {Number}
	  	 */
	  	this.x = x;
	  	/**
	  	 * Character's x position
	  	 * @type {Number}
	  	 */
	  	this.y = y;

	  	//maps keys currently pressed
	  	let keyMap = {};

	  	/**
	  	 * Default keydown handler.
	  	 * @function
	  	 * @private
	  	 * @param  {Event}
	  	 */
		const handleDown = (event) => { 
			if(event.key.match(/(d|ArrowRight)/)){
				if(this.velX !== this.speed) this.velX = this.speed;
				if(this.scaleX < 0) this.scaleX = -this.scaleX;
			}
			if(event.key.match(/(a|ArrowLeft)/)){
				if(this.velX !== -this.speed) this.velX = -this.speed;
				if(this.scaleX > 0) this.scaleX = -this.scaleX;
			}
			// if(event.key.match(/(w|a|s|d|ArrowUp|ArrowLeft|ArrowRight|ArrowDown)/)){
			// 	keyMap[event.key] = true; 
			// } 
		};
		document.onkeydown = handleDown;

	  	/**
	  	 * Default keyup handler.
	  	 * @function
	  	 * @private
	  	 * @param  {Event}
	  	 */
		const handleUp = (event) => {
			if(event.key.match(/(a|ArrowLeft)/) && this.velX < 0)
				this.velX = 0
			if(event.key.match(/(d|ArrowRight)/) && this.velX > 0)
				this.velX = 0
			// if(event.key.match(/(w|a|s|d|ArrowUp|ArrowLeft|ArrowRight|ArrowDown)/)){
			// 	keyMap[event.key] = false; 
			// 	this.gotoAndPlay('stand'); 				
			// } 
		};
		document.onkeyup = handleUp;


		const handleMovement = (event) => {
			this.x += this.velX;
			this.y -= this.velY;
		};
		this.on("tick", handleMovement);

		/**
		 * Default movement handler. Fires every tick.
		 * @function
		 * @private
		 * @param  {Event} event - event object.
		 */
		// const handleHorzMovement = (event) => {
		// 	if(keyMap['w']||keyMap['a']||keyMap['s']||keyMap['d']||keyMap['ArrowUp']||keyMap['ArrowLeft']||keyMap['ArrowDown']||keyMap['ArrowRight']){
		// 		if(this.currentAnimation === "stand") this.gotoAndPlay('run');
		// 		if(keyMap['w'] || keyMap['ArrowUp']) this.y -= this.velX;
		// 		if(keyMap['a'] || keyMap['ArrowLeft']){
		// 			this.x -= this.velX;
		// 			if(this.scaleX > 0){
		// 				ind = this.currentFrame;
		// 				this.scaleX = -this.scaleX;
		// 				this.gotoAndPlay(ind);
		// 			} 
		// 		} 
		// 		if(keyMap['s'] || keyMap['ArrowDown']) this.y += this.velX;
		// 		if(keyMap['d'] || keyMap['ArrowRight']){
		// 			this.x += this.velX;
		// 			if(this.scaleX < 0){
		// 				ind = this.currentFrame;
		// 				this.scaleX = -this.scaleX;
		// 				this.gotoAndPlay(ind);
		// 			} 
		// 		} 
		// 	} 
		// }
		// this.on("tick", handleHorzMovement);

		// NOTE: uncomment for jump implimentation
		// const handleVertMovement = (event) => {
		// 	this.y += this.velY;
		// }
		// this.on("tick", handleVertMovement);

		/**
		 * Gives the player control of this character
		 * @type {Function}
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

	grounded = false;

	gravity = -1;

	jump = 1;

	speed = 1;

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

	checkEnvironment(env){

		// const len = env.length;
		// const bounds = this.box;

		// let i;
		// for(i=0;i<len;i++){

		// }

		const len = env.length;
		const bounds = this.box
		let i;
		for(i=0;i<len;i++){
			const collision = this.checkCollision(env[i]);
			if(collision){
				// debugger;
				if(bounds.y2 > collision.y2 && bounds.y2 - collision.y < bounds.y/7){
					this.velY = 0;
					this.y = collision.y - (this.height/2) + 1;
				}if(bounds.y-1 == collision.y && bounds.y2-1 !== collision.y2){
					this.vely = 0;
					this.y = collision.y2 + (this.height/2);
				}if(bounds.x2-1 >= collision.x2 && bounds.x < collision.x && collision.height > 20){
					// console.log(collision, bounds);
					this.velX = 0;
					this.x = collision.x - (this.width/2);
				}
			}else{
				this.velY += this.gravity;
			}
		}
	}

	get box(){
		const w = this.width/2; const h = this.height/2
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
		const bounds = spriteSheet.getFrameBounds(0);

		/**
		 * @private
		 */
		this.spriteSheet = spriteSheet;
		this.scaleX = this.width/bounds.width;
		this.scaleY = this.height/bounds.height;
		this.regX = bounds.width/2; this.regY = bounds.height/2;
		this.gotoAndPlay("stand");
	}

	/**
	 * Checks if character is colliding with provided target
	 * @function
	 * @param  {Sprite|Bitmap} target - the object we are checking collisions with
	 */
	checkCollision(target){
		return checkPixelCollision(this, target, 0.8, true)
	}
}


export default Character