import {Sprite} from 'EaselJS';

class Character extends Sprite {
	constructor(width, height, x, y, spriteSheet){
	  	super(spriteSheet);
	  	this.x = x;
	  	this.y = y;
	  	this.height = height;
	  	this.width = width
	  	this.speed = 5;

	  	this.scaleX = width/spriteSheet._frameWidth;
	  	this.scaleY = height/spriteSheet._frameHeight;

	  	let keyMap = {};
		const handleDown = (event) => { keyMap[event.key] = true };
		document.onkeydown = handleDown;
		const handleUp = (event) => { 
			keyMap[event.key] = false; 
			this.gotoAndStop('stand'); 
		};
		document.onkeyup = handleUp;

		const handleMovement = (event) => {
			if(keyMap['w']||keyMap['a']||keyMap['s']||keyMap['d']||keyMap['ArrowUp']||keyMap['ArrowLeft']||keyMap['ArrowDown']||keyMap['ArrowRight']){
				if(this.currentAnimation === "stand") this.gotoAndPlay('run');
				if(keyMap['w'] || keyMap['ArrowUp']) this.y -= this.speed;
				if(keyMap['a'] || keyMap['ArrowLeft']) this.x -= this.speed;
				if(keyMap['s'] || keyMap['ArrowDown']) this.y += this.speed;
				if(keyMap['d'] || keyMap['ArrowRight']) this.x += this.speed;
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
}


export default Character