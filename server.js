var path = require('path');
var express = require('express');
var expresshbs = require('express-handlebars')
const { nextTick } = require('process');
var playerData = require('./playerData.json');
var db = require('./database-connector')

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
    //insert db statements for individual game statistics
    // Define our queries
    // query1 = 'DROP TABLE IF EXISTS diagnostic;';
    // query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
    // query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!")';
    // query4 = 'SELECT * FROM diagnostic;';

    // // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

    // // DROP TABLE...
    // db.pool.query(query1, function (err, results, fields){

    //     // CREATE TABLE...
    //     db.pool.query(query2, function(err, results, fields){

    //         // INSERT INTO...
    //         db.pool.query(query3, function(err, results, fields){

    //             // SELECT *...
    //             db.pool.query(query4, function(err, results, fields){

    //                 // Send the results to the browser
    //                 let base = "<h1>MySQL Results:</h1>"
    //                 res.send(base + JSON.stringify(results));
    //             });
    //         });
    //     });
    // });
    

});
app.get('/player', function (req, res) {
    res.status(200).render('player', {
      pageTitle: "Scythe Player Database",
    })
    //insert db statements for player statistics


});
app.get('/factions', function (req, res) {
    res.status(200).render('factions', {
      pageTitle: "Scythe Faction Database"
    })
    //insert db statements for each factions statistics


});
app.get('/board', function (req, res) {
  res.status(200).render('board', {
    pageTitle: "Scythe Board Setup"
  })
  //insert db statements for each board setup and id


});
app.get('/insert', function (req, res) {
  res.status(200).render('insert', {
    pageTitle: "Insert Scythe Game:",
    playerCount: playerData
  })
  //db insert statements to add a game to the db


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