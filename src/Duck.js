import createjs from 'createjs-collection';

class Duck extends createjs.Sprite {
	constructor(x, y, imgSrc){

		this.x = x;
		this.y = y;

		const preload = createjs.LoadQueue();
		preload.addEventListener("fileload", handleFileComplete);
  		preload.loadFile("assets/preloadjs-bg-center.png");

  		const handleFileComplete = (event) => {
  			document.body.appendChild(event.result);
  		}

	}
}