var path = require('path');
var express = require('express');
var expresshbs = require('express-handlebars')
const { nextTick } = require('process');
console.log(postData)

var app = express();
var port = process.env.PORT || 3988;

app.engine('handlebars', expresshbs.engine({
    defaultLayout: "main"
  }))

app.set('view engine', 'handlebars')

app.get('/', function (req, res) {
    res.status(200).render('index', {
      pageTitle: "Scythe Database"
    })
});
app.get('/game', function (req, res) {
    res.status(200).render('game', {
      pageTitle: "Scythe Game Overview"
    })
});
app.get('/player', function (req, res) {
    res.status(200).render('player', {
      pageTitle: "Scythe Player Database"
    })
});
app.get('/factions', function (req, res) {
    res.status(200).render('factions', {
      pageTitle: "Scythe Faction Database"
    })
});