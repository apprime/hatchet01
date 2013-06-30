module.exports = {

	"Default" : function (req, res) {
		switch(req.method)
		{
			case "GET": return "GET";
			case "POST": return "POST";
			default: 
				res.writeHead(405, {"Content-Type": "text/plain"}); 
				return "Request Method invalid";
		}
	},
	
	"Action1" : function (req, res) {
		console.log(req.method);
		switch(req.method)
		{
			case "GET": return "GET";
			case "POST": return "POST"; 
			default: 
				res.writeHead(405, {"Content-Type": "text/plain"}); 
				return "Request Method invalid";
		}
	}
}


/*For each controller child
//Add each method that controller has (GET, POST, etc.)
var restString = ["GET","POST","PUT","OPTIONS","HEAD","DELETE","TRACE","CONNECT"];
//CAUTION: Your controllers might have additional method that will be found if their names are subset of above indexes */