const path = require('path');
const express = require('express');
const expresshbs = require('express-handlebars');
const { nextTick } = require('process');
const playerData = require('./playerData.json');
const cors = require('cors');
const api = require('./api')

const app = express();
const port = process.env.PORT || 3988;

app.engine('handlebars', expresshbs.engine({
    defaultLayout: "main"
}));

app.use(cors({
     origin: 'http://localhost:3988'
 }));

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
      pageTitle: "Scythe Player Database",
    })
});

app.get('/factions', function (req, res) {
    res.status(200).render('factions', {
      pageTitle: "Scythe Faction Database"
    })
});

app.get('/board', function (req, res) {
  res.status(200).render('board', {
    pageTitle: "Scythe Board Setup"
  })
});

app.get('/insert', function (req, res) {
  res.status(200).render('insert', {
    pageTitle: "Insert Scythe Game:",
    playerCount: playerData
  })
});

app.get('/api', function(req, res) {
  api.handleApiRequest(req, res)
});

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.status(404).render('404',{
    pageTitle: "Scythe Request Error"
  })
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
