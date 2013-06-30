module.exports = function(path, fs, callback) {
	
	//Routelist is a private Object 
	//It contains all the imported controller files and their methods
	var routeList = new Object();
	this.getRoutes = function(path){ return routeList; };
	
	//Upon creation, populate the routeList with every file in the controllers folder
	//The folder is specified as the path parameter when Routing is called
	fs.readdir(path, function(err, files) {
		if(err) throw err;
		
		//For each controller file in the Controllers folder
		for(var i = 0; i<files.length; i++){
		
			//Load the module
			var r = require("./../" +path +files[i]);
			
			//treat the filename to lower case and remove the filename itself
			var file = files[i].toLowerCase();
			file = "/" +file.slice(0, file.lastIndexOf("."));
			
			//Create a new object to hold methods inside routes
			//The key is the name of the controller
			routeList[file] = new Object();
			
			for(var key in r){
				routeList[file][key]= r[key];
			}
		}
		
		//Default get command for index and favicon (Index.js is required, favicon needs no file at all)
		routeList["/"] = routeList["/index"];
		routeList["/favicon.ico"] = { "favicon.ico" : function(req, res){ return "favicon requested" } };
		//readdir is asynchronous and will not be loaded when the main server starts
		//This callback will make sure main server only loops after controllers are loaded.
		callback(); 
	});
	
	//This method takes the url from the request and strips it into parts
	//The parts are as such: URL/{controller}/{action}/{param1}/{param2}
	this.URLhandler = function(url){
		var parts; 
		
		//If the url is a single backslash, send to index
		if(url.length <= 1){
			var path = [];
			path['controller'] = "/index";
			path['action'] = "Default";
			return path;
		}
		else{
			//If the url ends with a single backslash, remove it
			if(url.charAt(url.length-1) == "/"){
				url = url.slice(0, url.length-1);
			}
			
			
			//The first one is the action called from the controllers
			parts = url.split("/");
			var path = new Array();
			path["controller"] = "/" +parts[1]; //controllers have a backslash before them
			
			if(parts.length > 2){
				path["action"] = parts[2];
			}
			
			//The rest of the parts entered into array as parameters
			if(parts.length > 2){
				path["params"] = new Array();
		
				for(var i =3; i<parts.length; i++){
					path["params"].push(parts[i]);
				}
			}
		}
		return path;
	};
	
	//This function takes the request from user and builds the response
	this.delegate = function(req, res){
		//1 Get request url and all existing routes
		var routes = this.getRoutes();
		var path = this.URLhandler(req.url);
		
		//2 If the url does not match any existing controllers
		if(routes[path.controller] == undefined){
			res.writeHead(404, {"Content-Type": "text/plain"});
			res.write("404: This adress has been eaten by a moray");
		}
		else{
			//3 If url also has an action
			if(path.action){
				//3.1: The action exists
				if(routes[path.controller][path.action]){
					res.writeHead(200, {"Content-Type": "text/plain"});
					res.write(routes[path.controller][path.action](req,res,path.params));
				}
				//3.2: The action is requested but does not exist
				else {
					res.writeHead(404, {"Content-Type": "text/plain"});
					res.write("404: This adress has been eaten by an otter");
				}
			} else {
				//3.3: Favicon is requested as controller
				if(path.controller == "/favicon.ico"){
					//Favicon has been requested"
				} 
				//3.4: The url contails no action, request Default action 
				// ***IMPORTANT: Default action is necessary in each controller file ***
				else {
					res.writeHead(200, {"Content-Type": "text/plain"});
					res.write(routes[path.controller]["Default"](req,res,path.params));
				}
			}
		}
		return page;
	};
};