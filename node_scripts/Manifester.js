//example
// echo "$(find src/img -name '*.png')" | node node_scripts/ImageManifester.js/ src/json/ "image"
// 


const fs = require('fs');

const outputDir = process.argv[2];
const type = process.argv[3];


function writeData(files){
		const manifest = [];
		let stub;
		files.forEach((file) => {
			const LoadItem = {};

			stub = file.match(/\w+\./)[0].replace(".", "")

			LoadItem.src = file;
			LoadItem.id = stub;
			LoadItem.type = type;

			manifest.push(LoadItem);

		});


		fs.readFile(outputDir + "manifest.json", (err, data)=>{
			if(err){
				if(err.code === "ENOENT"){
					const json = {manifest: manifest};
					fs.writeFile(outputDir + "manifest.json", JSON.stringify(json, null, 2), (err)=>{if(err) throw err;}); 
					return;
				}else throw err;
			}

			const json = JSON.parse(data);

			const hash = {};
			json.manifest.forEach((item)=>{
				hash[item.id] = true;
			});

			manifest.forEach((item)=>{
				if(hash[item.id] !== true) json.manifest.push(item);
			});

			fs.writeFile(outputDir + "manifest.json", JSON.stringify(json, null, 2), (err)=>{if(err) throw err;});
		});
}

writeData(process.argv.slice(4));

if(process.stdin.isTTY === undefined){
	process.stdin.resume();
	process.stdin.setEncoding('utf8');
	process.stdin.on('data', function(data) {
		const files = data.split('\n').slice(0, -1);
		writeData(files);
	});
}




