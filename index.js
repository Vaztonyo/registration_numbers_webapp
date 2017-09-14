const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

const RegNumberRoutes = require('./registrationNum');

const Models = require('./models');
const models = Models('mongodb://localhost/registration');

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

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }}));
app.use(flash());


app.use(express.static('public'));
app.use(express.static('views'));

app.get('/', regNumberRoutes.index);
// app.get('/', regNumberRoutes.add);
app.post('/add', regNumberRoutes.add);
app.get('/', regNumberRoutes.filter);
app.post('/', regNumberRoutes.filter);



var server = app.listen(5000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Webapp starts at http://%s:%s', host, port);

});
