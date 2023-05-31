const db = require('./database-connector')

function handlePlayerRequest(req, res) {
    if(req.query.operation === 'select') {
        if(!req.query.id){
            db.pool.query("SELECT playerID, playerName, (SELECT COUNT(*) FROM PlayerGameIntersection WHERE Player.playerID = PlayerGameIntersection.playerID) AS gamesPlayed, (SELECT COUNT(*) FROM (SELECT playerID, MAX(endingCoins + endingPopularity + starsPlaced + tilesControlled + resources) FROM GameFaction GROUP BY gameID) a WHERE a.playerID = Player.playerID) AS gamesWon FROM Player;", function (err, result) {
                if (err) {
                    console.log(err)
                    res.sendStatus(400);
                    return;
                }
                res.json(result);
            });
        } else {
            db.pool.query("SELECT playerID, playerName, (SELECT COUNT(*) FROM PlayerGameIntersection WHERE Player.playerID = PlayerGameIntersection.playerID) AS gamesPlayed, (SELECT COUNT(*) FROM (SELECT playerID, MAX(endingCoins + endingPopularity + starsPlaced + tilesControlled + resources) FROM GameFaction GROUP BY gameID) a WHERE a.playerID = Player.playerID) AS gamesWon FROM Player WHERE playerID = " + req.query.id + ";", function (err, result) {
                if (err) {
                    console.log(err)
                    res.sendStatus(400);
                    return;
                }
                res.json(result);
            });
        }
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
    } else if(req.query.operation === 'update') {
        if(!(req.query.id && req.query.playerName)) {
            res.sendStatus(400);
            return;
        }

        db.pool.query('UPDATE Player SET playerName = \"' + req.query.playerName + '\"WHERE playerID = ' + req.query.id + ';', function(err, result) {
            if(err) {
                console.log(error);
                res.sendStatus(400);
                return;
            }

            res.sendStatus(200);
        })
    }
}

function handleApiRequest(req, res) {
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
        handlePlayerRequest(req, res)
    }
}

module.exports.handleApiRequest = handleApiRequest