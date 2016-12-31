const Canvas = require('canvas')
  , Image = Canvas.Image
  , canvas = new Canvas(200, 200)
  , ctx = canvas.getContext('2d');

const fs = require('fs');

const options = {

};

const outputDir = process.argv[2];


function readFiles(files, done){
	const offset = process.argv[3];
	const json = {};
	const fileLen = files.length;
	let totalProcessed = 0;
	files.forEach(function(file){

		fs.readFile(file, function(err, img){
			if(err) throw err;
			const image = new Image;
			image.src = img;
			const width = canvas.width = image.width; const height = canvas.height = image.height;
			ctx.imageSmoothingEnabled = false;
			ctx.drawImage(image, 0, 0, width, height);
			let imageData = ctx.getImageData(0,0,width,height);
			const w = imageData.width;
			const h = imageData.height;
			const d = imageData.data;

			class Node {
				constructor(x, y){
					this.x = x;
					this.y = y;
					this.index = ((y*w*4) + (x*4)) + 3;
					this.value = d[this.index];
					if(x < 0 || y < 0 || x >= w || y >= h){
						this.index = -1;
						this.value = 0;
					}
				}

				get children(){
					const x = this.x;
					const y = this.y;
					const c = [

						new Node(x, y-1), //top
						new Node(x-1, y-1), //topLeft
						new Node(x-1, y), //left
						new Node(x-1, y+1), //botLeft
						new Node(x, y+1), //bottom
						new Node(x+1, y+1), //botRight
						new Node(x+1, y), //right
						new Node(x+1, y-1), //topRight
					];

					return c;
				}

				get onEdge(){
					let edge = false;
					if(this.value > 0){
						this.children.forEach((c)=>{
							if(c.value === 0){
								edge = true;
							} 
						});					
					}

					return edge;
				}
			}

			const visited = {};
			function visitEdges(src, offset){

				offset = offset || 0;

				let currOffset = 0;

				const queue = [src];
				// visited[src.index] = true;
				let n, ind, slope, c, last, old;
				const polygon = [];
				while(queue.length){
					n = queue.pop();
					ind = n.index;

					if(n.onEdge && visited[n.index] !== true && n.value > 0){
						visited[n.index] = true;

						if(currOffset-- === 0){
							currOffset = offset;
							if(c !== undefined){
								last = polygon[c];
								slope = (n.y - last.y)/(n.x - last.x);
								if(slope === old) polygon[c] = {x: n.x, y: n.y};
								else{
									polygon.push({x:n.x, y:n.y});
									c++;
									old = slope;
								}

							}else{
								polygon.push({x:n.x, y:n.y});
								c = 0;
							}					
						}

						const ch = n.children;
						const l = ch.length;
						let i, v;
						let looped = false;
						for(i=0; i<l; i++){
							v = ch[i];
							if(v.index === src.index && queue.length > 3){
								looped = true;
								break;
							}
							if(v.value > 0 && visited[v.index] !== true && v.onEdge){
								queue.push(v);
							}
						}
						if(looped) break;					
					}
				}

				return polygon;		
				
			}

			let i, j, k, n, ind, p;
			const map = [];
			for(i=0; i<w; i++){ // columns
				for(j=0; j<h; j++){ // rows
					n = new Node(i, j);
					ind = n.index;
					if(n.value > 0 && visited[ind] !== true && n.onEdge){

						p = (visitEdges(n, offset));
						if(p.length > 2) map.push(p);

					}
				}
			}


			// console.log(map);
			output = {
				image: file,
				data: map
			}

			const stub = file.match(/\w+\./)[0].replace(".", "");

			json[stub] = output;

			totalProcessed++;

			if(totalProcessed == fileLen) done(json);

		});


	});

}

let files = process.argv.slice(4);
readFiles(files, (json)=>{
	fs.writeFile(outputDir + "maps.json", JSON.stringify(json, null, 2), (err)=>{if(err) throw err});
});

if(process.stdin.isTTY === undefined){
	process.stdin.resume();
	process.stdin.setEncoding('utf8');
	process.stdin.on('data', function(data) {
		files = data.split('\n').slice(0, -1);
		readFiles(files, (json)=>{
			console.log('args piped, writing file');
			fs.writeFile(outputDir + "maps.json", JSON.stringify(json, null, 2), (err)=>{if(err) throw err});
		});
	});
}

