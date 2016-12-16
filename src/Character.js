import {Sprite} from 'EaselJS';
import {checkPixelCollision} from 'CollisionJS';

class Character extends Sprite {
	constructor(width, height, x, y, spriteSheet){
	  	super(spriteSheet);
	  	this.gotoAndPlay("stand");
	  	this.height = height;
	  	this.width = width;
	  	this.speed = 5;
	  	

	  	let bounds = this.getBounds();
	  	this.scaleX = width/bounds.height;
	  	this.scaleY = height/bounds.width;
	  	this.regX = bounds.width/2; this.regY = bounds.height/2;
	  	this.x = x;
	  	this.y = y;

	  	// console.log(this.regX, this.regY, width, height, this.getBounds());


	  	let keyMap = {};
		const handleDown = (event) => { 
			if(event.key.match(/(w|a|s|d|ArrowUp|ArrowLeft|ArrowRight|ArrowDown)/)){
				keyMap[event.key] = true; 
			} 
		};
		document.onkeydown = handleDown;
		const handleUp = (event) => {
			if(event.key.match(/(w|a|s|d|ArrowUp|ArrowLeft|ArrowRight|ArrowDown)/)){
				keyMap[event.key] = false; 
				this.gotoAndPlay('stand'); 				
			} 
		};
		document.onkeyup = handleUp;

		let ind;
		const handleMovement = (event) => {
			if(keyMap['w']||keyMap['a']||keyMap['s']||keyMap['d']||keyMap['ArrowUp']||keyMap['ArrowLeft']||keyMap['ArrowDown']||keyMap['ArrowRight']){
				if(this.currentAnimation === "stand") this.gotoAndPlay('run');
				if(keyMap['w'] || keyMap['ArrowUp']) this.y -= this.speed;
				if(keyMap['a'] || keyMap['ArrowLeft']){
					this.x -= this.speed;
					if(this.scaleX > 0){
						ind = this.currentFrame;
						this.scaleX = -this.scaleX;
						this.gotoAndPlay(ind);
					} 
				} 
				if(keyMap['s'] || keyMap['ArrowDown']) this.y += this.speed;
				if(keyMap['d'] || keyMap['ArrowRight']){
					this.x += this.speed;
					if(this.scaleX < 0){
						ind = this.currentFrame;
						this.scaleX = -this.scaleX;
						this.gotoAndPlay(ind);
					} 
				} 
			} 
		}
		this.on("tick", handleMovement);

		this.giveControl = () => {
			document.onkeydown = handleDown;
			document.onkeyup = handleUp;
		};

		this.cloneControl = () => {
			window.addEventListener('keydown', handleDown);
			window.addEventListener('keyup', handleUp);
		}
	}

	checkCollision(target){
		return checkPixelCollision(this, target, 0.8)
	}
}


export default Character