/**
 * Module dependencies.
 */

"use strict";

var express = require('express'),
    fwk = require('./routes/fwk');

var app = module.exports = express();

// Configuration
app.configure(function(){
    app.set('views', __dirname + '/app');
    app.engine('.html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.set('view options', {
        layout: false
    });

    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/app'));
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes
app.get('/', function(req, res){
    		res.render('index');
	      }
);

app.get('/partials/:name', function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
    }
);

// JSON API
app.get('/server/fwk/fwk', fwk.fetchFwks);
app.get('/server/fwk/fwk/:id', fwk.fetchFwk);
app.delete('/server/fwk/fwk/:id', fwk.deleteFwk);
app.post('/server/fwk/fwk', fwk.addFwk);
app.put('/server/fwk/fwk', fwk.updateFwk);

// Start server
var port  = process.env.PORT || 3030;
app.listen(port, function(){
    console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});
