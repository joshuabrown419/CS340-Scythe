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
      pageTitle: "Scythe Player Database"
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
  if(!req.query.name){
    res.status(404).render('api', {
      pageTitle: 'API page'
    });
    return;
  }
  
  if(!req.query.operation) {
    res.status(404).send('Need operation in addition to table name');
    return;
  }
  
  if(req.query.name === 'Player') {
    if(req.query.operation === 'select') {
      db.pool.query("SELECT playerID, playerName, (SELECT COUNT(*) FROM PlayerGameIntersection WHERE Player.playerID = PlayerGameIntersection.playerID) AS gamesPlayed, (SELECT COUNT(*) FROM (SELECT playerID, MAX(endingCoins + endingPopularity + starsPlaced + tilesControlled + resources) FROM GameFaction GROUP BY gameID) a WHERE a.playerID = Player.playerID) AS gamesWon FROM Player;", function (err, result) {
        if (err) {
          console.log(err)
          res.sendStatus(400);
          return;
        }
        res.json(result);
      });
    } else if(req.query.operation === 'delete') {
      if(!req.query.id) {
        res.sendStatus(400);
        return;
      }
      
      db.pool.query('DELETE FROM Player WHERE playerID = ' + req.query.id, function(err, result) {
        if (err) {
          console.log(err)
          res.sendStatus(400);
          return;
        }
        
        res.sendStatus(200)
      });
    } else if(req.query.operation === 'insert') {
      if(!req.query.playerName) {
        res.sendStatus(400);
        return;
      }
      
      db.pool.query('INSERT INTO Player (playerName) VALUES (\"' + req.query.playerName + '\");', function(err, result) {
        if(err) {
          console.log(err)
          res.sendStatus(400);
          return;
        }
        
        res.sendStatus(200)
      });
    }
  }
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