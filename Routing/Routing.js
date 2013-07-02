module.exports = function(controllerPath, modelPath, fs, callback) {
	
	console.log("Initialising content...");
	//routelist and modellist are private Objects
	//It contains all the imported controller and model files and their methods
	var routeList = new Object();
	var modelList = new Object();
	this.getRoutes = function(controllerPath){ return routeList; };
	this.getModels = function(controllerPath){ return modelList; };
	
	//Upon creation, populate the routeList with every file in the controllers folder
	//The folder is specified as the path parameter when Routing is called
	fs.readdir(controllerPath, function(err, files) {
		if(err) throw err;
		
		//For each controller file in the Controllers folder
		for(var i = 0; i<files.length; i++){
		
			//Load the module
			var r = require("./../" +controllerPath +files[i]);
			
			//treat the filename to lower case and remove the filename itself
			var file = files[i].toLowerCase();
			file = file.slice(0, file.lastIndexOf("."));
			
			//Create a new object to hold methods inside routes
			//The key is the name of the controller
			routeList[file] = new Object();
			
			for(var key in r){
				routeList[file][key]= r[key];
			}
		}
		
		//Default get command for index and favicon (Index.js is required, favicon needs no file at all)
		routeList["/"] = routeList["index"];
		routeList["favicon.ico"] = { "favicon.ico" : function(req, res){ return "favicon requested" } };
		
		console.log("Controllers loaded");
		
		//Next, get all the models imported into a list
		fs.readdir(modelPath, function(err, files) {
			if(err) throw err;
			
			//For each model in the models folder
			for(var i = 0; i < files.length; i++){
				
				//Load the module
				var r = require("./../" +modelPath +files[i]);
				//treat the filename to lower case and remove the filename itself
				var file = files[i];
				fileName = file.slice(0, file.lastIndexOf("."));
				fileName = fileName.slice(6, file.lastIndexOf("."));
				//Create a new object to hold the model object
				modelList[fileName.toLowerCase()] = r;
							
			}
			//readdir is asynchronous and will not be loaded when the main server starts
			//This callback will make sure main server only loops after controllers are loaded.	
			callback(); 
		});
		
	});
	
	//This method takes the url from the request and strips it into parts
	//The parts are as such: URL/{controller}/{action}/{param1}/{param2}
	this.URLhandler = function(url){
		var parts; 
		//If the url is a single backslash, send to index
		if(url.length <= 1){
			var controllerPath = [];
			controllerPath['controller'] = "index";
			controllerPath['action'] = "default";
			return controllerPath;
		}
		else{
			//Remove that first backslash
			url = url.slice(1, url.length);
			//If the url ends with a single backslash, remove it
			if(url.charAt(url.length-1) == "/"){
				url = url.slice(0, url.length-1);
			}
			
			
			//The first one is the action called from the controllers
			parts = url.split("/");
			var controllerPath = new Array();
			controllerPath["controller"] = parts[0].toLowerCase(); //controllers have a backslash before them
			
			if(parts.length > 1){
				controllerPath["action"] = parts[1].toLowerCase();
			}
			
			//The rest of the parts entered into array as parameters
			if(parts.length > 2){
				controllerPath["params"] = new Array();
		
				for(var i =2; i<parts.length; i++){
					controllerPath["params"].push(parts[i].toLowerCase());
				}
			}
		}
		return controllerPath;
	};
	
	//This function takes the request from user and builds the response
	this.delegate = function(req, res){
		//1 Get request url and all existing routes
		var routes = this.getRoutes();
		var models = this.getModels();
		var path = this.URLhandler(req.url);
				
		//2 If the url does not match any existing controllers
		if(routes[path.controller] == undefined){
			res.writeHead(404, {"Content-Type": "text/plain"});
			res.write(routes["loadError"]["404"]());
		}
		else{
			//3 If url also has an action
			if(path.action){
				//3.1: The action exists
				if(routes[path.controller][path.action]){
					res.writeHead(200, {"Content-Type": "text/plain"});
					res.write(routes[path.controller][path.action](req, res, models[path.controller](), path.params));
				}
				//3.2: The action is requested but does not exist
				else {
					res.writeHead(404, {"Content-Type": "text/plain"});
					res.write(routes["loadError"]["404"]());
				}
			} else {
				//3.3: Favicon is requested as controller
				if(path.controller == "favicon.ico"){
					var img = fs.readFileSync('./Images/favicon.ico');
					res.writeHead(200, {'Content-Type': 'image/x-icon'} );
					res.end(img,'binary');
				} 
				//3.4: If LoadError controller directly called
				else if(path.controller == "/LoadError"){
					res.writeHead(404, {"Content-Type": "text/plain"});
					res.write(routes["LoadError"]["404"]());
				} else 
				//3.5: The url contails no action, request Default action 
				// ***IMPORTANT: Default action is necessary in each controller file for this reason ***
				{
					res.writeHead(200, {"Content-Type": "text/plain"});
					res.write(routes[path.controller]["default"](req, res, models[path.controller](), path.params));
				}
			}
		}
	};
};