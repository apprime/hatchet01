var http = require('http');
// var routing = require('routing');
var server = http.createServer(onRequest).listen(1337);




/*
	TODO
	1. Identify what kind of event
	2. Send onwards to correct event handler
	3. Retreive data from whatever handler
	4. Build Head and Body for Response
	5. End response
*/
function onRequest(req, res){

	//1 Route to correct handler for path
	console.log(req.url);
	var bask = routes[req.url](req, res);
	
	if(req.url != "/favicon.ico"){
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.write(bask);
		res.end();},
	}
}

function route(incoming, req ,res){
	incoming(req, res);
}



/*
	TODO
	1. Get filenames from all files in /controllers
	2. Match them with functions
	3. functions contain something of value for res send
	4. Handle favicon request somehow
	5. Put all this in a routing.js utility
*/
function initRoutes(controllersPath)
{
	//TODO
}

//TEMPORARY UNTIL initRoutes IS WORKING
var routes = {
	"/": function(req, res){ return "other called"; },
	"/index": function(req, res){ return "other called";} ,
	"/other": function(req, res){ return "other called";}
	"/favicon.ico": function(req, res){ return "favicon requested";}
}

var options = 
{
	'hostname': 'www.google.com',
	'port': 80,
	'path': '/',
	'method': 'Get'
};

function getGoogle(request, response){
	var req = http.request(options, function(res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
		console.log('BODY: ' + chunk);
		});
	});

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	// write data to request body
	req.write('data\n');
	req.write('data\n');
	req.end();
}

function blah (request)
{
	var string = "Here is some stuff:\n";
	string += "HEADERS: \n";
	for( i in request.headers){
		string += i +": ";
		string += request.headers[i] +"\n";
	}
	string += "\n\n";
	string += "METHOD: " +request.method +"\n\n";
	string += "URL: " +request.url +"\n\n";
	string += "STATUS CODE: " +request.status +"\n\n";
	

	for( i in request){
		string += i +": ";
		string += request[i] +"\n";
	}
	return string;
}


//	(1)onRequest receives a request
//	(2)Sort out path for request and send to correct controller
//	(3)Sort out Get or Post(or whatever) and use correct action
//	(4)Fetch model for controller/action
//	(5)Build view based on model and request params
//	(6)Collapse back to onRequest and send response




/*
100: Continue
101: Switching Protocols
102: Processing
200: OK
201: Created
202: Accepted
203: Non-Authoritative Information
204: No Content
205: Reset Content
206: Partial Content
207: Multi-Status
300: Multiple Choices
301: Moved Permanently
302: Moved Temporarily
303: See Other
304: Not Modified
305: Use Proxy
307: Temporary Redirect
400: Bad Request
401: Unauthorized
402: Payment Required
403: Forbidden
404: Not Found
405: Method Not Allowed
406: Not Acceptable
407: Proxy Authentication Required
408: Request Time-out
409: Conflict
410: Gone
411: Length Required
412: Precondition Failed
413: Request Entity Too Large
414: Request-URI Too Large
415: Unsupported Media Type
416: Requested Range Not Satisfiable
417: Expectation Failed
418: I'm a teapot
422: Unprocessable Entity
423: Locked
424: Failed Dependency
425: Unordered Collection
426: Upgrade Required
428: Precondition Required
429: Too Many Requests
431: Request Header Fields Too Large
500: Internal Server Error
501: Not Implemented
502: Bad Gateway
503: Service Unavailable
504: Gateway Time-out
505: HTTP Version Not Supported
506: Variant Also Negotiates
507: Insufficient Storage
509: Bandwidth Limit Exceeded
510: Not Extended
511: Network Authentication Required
*/