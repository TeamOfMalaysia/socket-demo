module.exports = {
	entry: [
		"./js/main.jsx",
		"./js/bar.jsx",
		"./js/notice.jsx",
		"./js/rank.jsx"
	],
	
	output: {
		path: "build/",
		filename: "index.min.js"
	},
	
	//用于指定可以被require的文件后缀
	resolve:{
		extensions: ["", ".js", ".jsx"]
	},
	
	module: {
		
		//指定jsx-loader编译后缀名为 .jsx
		loaders: [
			{test: /\.jsx$/, loaders: ['babel']},
		]
	}
}