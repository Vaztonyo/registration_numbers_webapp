const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

const RegNumberRoutes = require('./registrationNum');

const Models = require('./models');
const mongoURL = process.env.MONGO_DB_URL || 'mongodb://localhost/registration';
const models = Models(mongoURL);

const regNumberRoutes = RegNumberRoutes(models);

var app = express();

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ //use body-parser
    extended: false
}));

app.use(bodyParser.json());

app.set('trust proxy', 1) // trust first proxy

app.use(session(
  { secret: 'keyboard cat',
   cookie: { maxAge: 60000 * 30 },
   resave: true,
   saveUninitialized: true
}));
app.use(flash());


app.use(express.static('public'));
app.use(express.static('views'));

var format = require('util').format;

app.get('/', regNumberRoutes.index);
// app.get('/', regNumberRoutes.add);
app.post('/add', regNumberRoutes.add);
app.get('/', regNumberRoutes.filter);
app.post('/', regNumberRoutes.filter);



var server = app.listen(process.env.PORT || 5000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('WebApp starts at http://%s:%s', host, port);

});
