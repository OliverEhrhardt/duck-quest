import {Sprite} from 'EaselJS';
import {checkPixelCollision} from 'CollisionJS';


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

	  	/**
	  	 * max fallrate of character
	  	 * @type {Number}
	  	 */
		this.fallRate = -(height>>2)
	  	//maps keys currently pressed
	  	let keyMap = {};

	  	/**
	  	 * Default keydown handler.
	  	 * @function
	  	 * @private
	  	 * @param  {Event}
	  	 */
		const handleDown = (event) => {
			// if(event.key.match(/^(w|a|s|d|ArrowLeft|ArrowRight|ArrowUp|ArrowDown)$/)){
			// 	this.gotoAndPlay("run");
			// }
			if(event.key.match(/^(d|ArrowRight)$/)){
				if(this.velX !== this.speed) this.velX = this.speed;
				if(this.scaleX < 0) this.scaleX = -this.scaleX;
			}
			else if(event.key.match(/^(a|ArrowLeft)$/)){
				if(this.velX !== -this.speed) this.velX = -this.speed;
				if(this.scaleX > 0) this.scaleX = -this.scaleX;
			}
			else if(event.key.match(/^(w|ArrowUp)$/) && this.jumpNum < this.jumpMax){
				this.y -= this.jump;
				this.velY = this.jump;
				this.jumpNum += 1;			
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
				keyMap[event.key] = false; 
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
			if(this.velX !== 0 && this.currentAnimation === "stand") this.gotoAndPlay("run");
			else if(this.currently === "run") this.gotoAndPlay("stand")
			this.x += this.velX;
			if(this.velY >= this.fallRate) this.y -= this.velY;
			else this.y -= this.fallRate;
			// debugger;
		};
		this.on("tick", handleMovement);

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

	/**
	 * gravity of player
	 * @type {Number}
	 */
	gravity = -1;

	/**
	 * jump power
	 * @type {Number}
	 */
	jump = 15;

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
	speed = 10;

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
	checkEnvironment(env){
		const len = env.length;
		const bounds = this.box
		let i;
		for(i=0;i<len;i++){
			const collision = this.checkCollision(env[i]);
			if(collision.height){
				// debugger;
				if(bounds.y < collision.y && bounds.y2 - (this.height>>2) < collision.y){
					this.velY = 0;
					this.y -= collision.height-1;
					this.jumpNum = 0;
				}
				else if(bounds.x < collision.x){
					this.velX = 0;
					this.x -= collision.width;
				}else if(bounds.x2 > collision.x2){
					this.velX = 0;
					this.x += collision.width;
				}else if(bounds.y2 > collision.y2){
					this.velY = 0;
					this.y += collision.height;
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