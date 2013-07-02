module.exports = {	
	"403" : function (req, res) {
		return "403: Unathorized request";
	},
	
	"404" : function (req, res) {
		return "404: This adress has been eaten by an otter";

	},
	
	"405" : function (req, res) {
		return "405: Request Method invalid";
	}
}