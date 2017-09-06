const express = require('express');
const exphbs  = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// app.use(bodyParser.urlencoded({ //use body-parser
//     extended: false
// }));

app.use(express.static('public')); //use static and set it to public
app.use(express.static('views')); //use static views

var regNum = {};

app.get('/', function(req, res){
    res.render('reg_number');
});

app.post('/', function(req, res){
  res.render('reg_number');
})






var server = app.listen(5000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('App starts at http://%s:%s', host, port);

});
