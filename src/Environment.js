import {Bitmap} from "EaselJS";

class Environment extends Bitmap {
	constructor(map, x, y){
		super(map.image);
		this.data = map.data;
		this.posX = x;
		this.posY = y;

	}

	set posX(val){
		const diff = val - this.x;
		this.x = val;
		this.data = this.data.map((p)=>(p.map((e)=>({x:e.x + diff, y: e.y}))));
	}

	set posY(val){
		const diff = val - this.y;
		this.y = val;
		this.data = this.data.map((p)=>(p.map((e)=>({x:e.x, y: e.y + diff}))));
	}
}

export default Environment