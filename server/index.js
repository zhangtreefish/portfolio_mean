let express = require('express');
let wagner = require('wagner-core');
var path = require('path');

require('./models')(wagner);

let app = express();
app.use(require('morgan')('combined'));

// { app: app } is a local, a value specific to this invoke()
wagner.invoke(require('./auth'), { app: app });

app.use('/api/v1', require('./api')(wagner));

app.use(express.static(path.join(__dirname,'../')));

// for production invoke client-side cache:
// app.use(express.static('../', { maxage: 24X60X60 /* 1 day */ }));

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running at the port", port);
});
