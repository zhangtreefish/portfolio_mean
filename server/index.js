let express = require('express');
let wagner = require('wagner-core');

require('./models')(wagner);
require('./dependencies')(wagner);

let app = express();
app.use(require('morgan')('combined'));

// { app: app } is a local, a value specific to this invoke()
wagner.invoke(require('./auth'), { app: app });

app.use('/api/v1', require('./api')(wagner));
app.use(express.static('../', { maxAge: 4 * 60 * 60 * 1000 /* 2hrs */ }));

app.listen(3000);
console.log('Listening on port 3000!');
