// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  const strParam = req.params.date;
  const numParam = Number(strParam);
  let unixDate;

	if (strParam === "" || strParam === undefined) {
    unixDate = new Date();
	}
	else if (isNaN(numParam)) {
    unixDate = new Date(Date.parse(strParam));
	}
  else {
    unixDate = new Date(numParam);
  }

	if (unixDate instanceof Date && !isNaN(unixDate)) {
		res.json({ unix: unixDate.getTime(), utc: unixDate.toUTCString()});
	}
	else {
		res.json({ error : "Invalid Date" });
	}
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
