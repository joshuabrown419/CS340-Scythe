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
    } else if(req.query.operation === 'search') {
        if(!req.query.playerName) {
            res.sendStatus(400);
            return;
        }

        db.pool.query('SELECT playerID FROM Player WHERE playerName= \"' + req.query.playerName + '\";', function(err, result) {
            if(err) {
                console.log(err)
                res.sendStatus(400);
                return;
            }

            res.json(result)
        });
    } else {
        res.status(400)
    }
}

function handleGameRequest(req, res) {
    if(req.query.operation === 'select'){
        if(!req.query.id) {
            db.pool.query("SELECT gameID, gameSetupID, gameDate, (SELECT COUNT(*) FROM PlayerGameIntersection pgi WHERE pgi.gameID = g.gameID) as playerCount, (SELECT p.playerName as playerName FROM GameFaction gf INNER JOIN Player p ON gf.playerID = p.playerID WHERE (gf.gameID = g.gameID AND (gf.endingCoins + gf.endingPopularity + gf.starsPlaced + gf.tilesControlled + gf.resources) = (SELECT MAX(gf2.endingCoins + gf2.endingPopularity + gf2.starsPlaced + gf2.tilesControlled + gf2.resources) FROM GameFaction gf2 WHERE gf2.gameID = g.gameID))) as winningPlayer FROM Game g ORDER BY gameDate DESC;", function (err, result) {
                if (err) {
                    console.log(err)
                    res.sendStatus(400);
                    return;
                }
                res.json(result);
            });
        } else {
            db.pool.query("SELECT gameID, gameSetupID, gameDate, (SELECT COUNT(*) FROM PlayerGameIntersection pgi WHERE pgi.gameID = g.gameID) as playerCount, (SELECT p.playerName as playerName FROM GameFaction gf INNER JOIN Player p ON gf.playerID = p.playerID WHERE (gf.gameID = g.gameID AND (gf.endingCoins + gf.endingPopularity + gf.starsPlaced + gf.tilesControlled + gf.resources) = (SELECT MAX(gf2.endingCoins + gf2.endingPopularity + gf2.starsPlaced + gf2.tilesControlled + gf2.resources) FROM GameFaction gf2 WHERE gf2.gameID = g.gameID))) as winningPlayer FROM Game g WHERE g.gameID = " + req.query.id + " ORDER BY gameDate DESC;", function (err, result) {
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
        
        db.pool.query("")
    } else if(req.query.operation === 'insert') {

    } else if(req.query.operation === 'update') {

    } else if(req.query.operation === 'search') {

    } else {
        res.status(400)
    }
}

function handleGameSetupRequest(req, res) {
    if(req.query.operation === 'select'){

    } else if(req.query.operation === 'delete') {

    } else if(req.query.operation === 'insert') {

    } else if(req.query.operation === 'update') {

    } else if(req.query.operation === 'search') {

    } else {
        res.status(400)
    }
}

function handleGameFactionRequest(req, res) {
    if(req.query.operation === 'select'){

    } else if(req.query.operation === 'delete') {

    } else if(req.query.operation === 'insert') {

    } else if(req.query.operation === 'update') {

    } else if(req.query.operation === 'search') {

    } else {
        res.status(400)
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
    } else if (req.query.name === 'Game') {
        handleGameRequest(req, res)
    }
}

module.exports.handleApiRequest = handleApiRequest