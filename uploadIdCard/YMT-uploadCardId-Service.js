var express 	= require('express');
var http		= require('http');
var path		= require('path');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var flash 		= require('connect-flash');
var app 		= express();
var morgan		= require('morgan');
var config = require('./config');
var RedisStore = require('connect-redis')(session);
//var mongostore  = require('connect-mongo')(session);

app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('connect-multiparty')());
app.use(cookieParser());//'saohuo and cookie'
app.use(flash());
app.use(session({ secret: config.cookieKey, store: new RedisStore(config.sessRedis) }));

//
app.use('/', require('./routes').Page(express));


app.use(function(req, res) {
    res.status(404).format({
        html: function() {
            res.render('404', config.viewModule);
        }
    });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});