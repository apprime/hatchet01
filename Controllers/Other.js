module.exports = {
	
	"Default" : function(req, res){ 
		switch(req.method)
		{
			case "GET": return "GET";
			case "POST": return "POST";
			default: 
				res.writeHead(405, {"Content-Type": "text/plain"}); 
				return "Request Method invalid";
		}
	},
	"Action1" : function(req, res){
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