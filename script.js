/**
 * Created by Xaz on 3/6/2016.
 */


/*
 Author: Chris Kirchner
 Organization: OSU
 Class: CS290 Web Development
 Assignment: How-To
 Date: 06Mar16
 Purpose: Guide for ChemSpider Web Services
 */

//setup express and handlebars
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
});

//indicate express engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.use(express.static('public'));

//setup callback for GET request
app.get('/', function(req, res){
    context = {};
    context.html = true;
    res.render('intro', context);
});

app.get('/:name', function(req, res){
    context = {};
    if (req.query.html){
        context.html = JSON.parse(req.query.html);
    }
    else {
        context.html = true;
    }
    console.log(context);
    res.render(req.params.name, context);
});

//setup callback for unavailable resource
app.use(function(req, res){
    res.status(404);
    res.render('404');
});

//setup callback for errors
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

//listen on port
app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:'
        + app.get('port') + '; press Ctrl-C to terminate.');
});

