module.exports = {
	
	'default' : function(req, res, model, params){ 
		switch(req.method)
		{
			case "GET": return "GET";
			case "POST": return "POST";
			default: 
				res.writeHead(405, {"Content-Type": "text/plain"}); 
				return "Request Method invalid";
		}
	},
	'drive' : function(req, res, model, params){
		var c = new model.car("blue", 150);

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