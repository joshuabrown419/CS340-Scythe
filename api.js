const db = require('./database-connector')

function handlePlayerRequest(req, res) {
    if(req.query.operation === 'select') {
        if(!req.query.id){
            db.pool.query(`SELECT
playerID,
playerName,
(SELECT COUNT(*) FROM PlayerGameIntersection WHERE p.playerID = PlayerGameIntersection.playerID) AS gamesPlayed,
(SELECT COUNT(*) FROM GameFaction gf WHERE gf.playerID = p.playerID AND (gf.endingCoins + gf.endingPopularity + gf.starsPlaced + gf.tilesControlled + gf.resources) = (SELECT MAX(gf2.endingCoins + gf2.endingPopularity + gf2.starsPlaced + gf2.tilesControlled + gf2.resources) FROM GameFaction gf2 WHERE gf2.gameID = gf.gameID)) as gamesWon

FROM Player p;`, function (err, result) {
                if (err) {
                    console.log(err)
                    res.sendStatus(400);
                    return;
                }
                res.json(result);
            });
        } else {
            db.pool.query(`SELECT playerID, playerName,
            (SELECT COUNT(*) FROM PlayerGameIntersection WHERE Player.playerID = PlayerGameIntersection.playerID) AS gamesPlayed,
            (SELECT COUNT(*) FROM (SELECT playerID, MAX(endingCoins + endingPopularity + starsPlaced + tilesControlled + resources) FROM GameFaction GROUP BY gameID) a WHERE a.playerID = Player.playerID) AS gamesWon
            FROM Player
            WHERE playerID = ` + req.query.id + ";", function (err, result) {
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

            res.send(result.insertId.toString())
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
            db.pool.query(`SELECT gameID, gameSetupID, gameDate,
            (SELECT COUNT(*) FROM GameFaction pgi WHERE pgi.gameID = g.gameID) as playerCount,
            (SELECT p.playerName as playerName FROM GameFaction gf INNER JOIN Player p ON gf.playerID = p.playerID WHERE (gf.gameID = g.gameID AND (gf.endingCoins + gf.endingPopularity + gf.starsPlaced + gf.tilesControlled + gf.resources) = (SELECT MAX(gf2.endingCoins + gf2.endingPopularity + gf2.starsPlaced + gf2.tilesControlled + gf2.resources) FROM GameFaction gf2 WHERE gf2.gameID = g.gameID))) as winningPlayer
            FROM Game g
            ORDER BY gameDate DESC, gameID ASC;`, function (err, result) {
                if (err) {
                    console.log(err)
                    res.sendStatus(400);
                    return;
                }
                res.json(result);
            });
        } else {
            db.pool.query(`SELECT gameID, gameSetupID, gameDate,
            (SELECT COUNT(*) FROM PlayerGameIntersection pgi WHERE pgi.gameID = g.gameID) as playerCount,
            (SELECT p.playerName as playerName FROM GameFaction gf INNER JOIN Player p ON gf.playerID = p.playerID WHERE (gf.gameID = g.gameID AND (gf.endingCoins + gf.endingPopularity + gf.starsPlaced + gf.tilesControlled + gf.resources) = (SELECT MAX(gf2.endingCoins + gf2.endingPopularity + gf2.starsPlaced + gf2.tilesControlled + gf2.resources) FROM GameFaction gf2 WHERE gf2.gameID = g.gameID))) as winningPlayer
            FROM Game g
            WHERE g.gameID = ` + req.query.id +
            ` ORDER BY gameDate DESC, gameID ASC;`, function (err, result) {
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
        
        db.pool.query("DELETE FROM Game WHERE gameID = " + req.query.id + ";", function(err, result) {
            if (err) {
                console.log(err)
                res.sendStatus(400);
                return;
            }
            res.sendStatus(200)
        });
    } else if(req.query.operation === 'insert') {
        if(!(req.query.gameSetupID && req.query.gameDate)) {
            res.sendStatus(400);
            return;
        }
        
        db.pool.query("INSERT INTO Game (gameSetupID, gameDate) VALUES (" + req.query.gameSetupID + ", " + req.query.gameDate + ");", function (err, result) {
            if (err) {
                console.log(err)
                res.sendStatus(400);
                return;
            }
            res.send(result.insertId.toString())
        })
    } else if(req.query.operation === 'update') {
        if(!(req.query.id && req.query.gameSetupID && req.query.gameDate)) {
            res.sendStatus(400);
            return;
        }

        db.pool.query("UPDATE Game SET gameSetupID = " + req.query.gameSetupID + ", gameDate = " + req.query.gameDate + " WHERE gameID = " + req.query.id + ";", function (err, result) {
            if (err) {
                console.log(err)
                res.sendStatus(400);
                return;
            }
            res.sendStatus(200)
        })
    } else if(req.query.operation === 'search') {
        if(!req.query.playerName) {
            res.sendStatus(400);
            return;
        }
        
        db.pool.query(`SELECT Game.gameID
        FROM Game
        INNER JOIN PlayerGameIntersection ON PlayerGameIntersection.gameID = Game.gameID
        WHERE PlayerGameIntersection.playerID = (SELECT playerID FROM Player WHERE playerName = "` + req.query.playerName + `");`, function(err, result) {
            if (err) {
                console.log(err)
                res.sendStatus(400);
                return;
            }
            res.json(result)
        })
    } else {
        res.status(400)
    }
}

function handleGameSetupRequest(req, res) {
    if(req.query.operation === 'select'){
        if(!req.query.id) {
            db.pool.query("SELECT * FROM GameSetup;", function(err, result) {
                if (err) {
                    console.log(err)
                    res.sendStatus(400);
                    return;
                }
                res.json(result)
            })
        } else {
            db.pool.query("SELECT * FROM GameSetup WHERE gameSetupID = " + req.query.id + ";", function(err, result) {
                if (err) {
                    console.log(err)
                    res.sendStatus(400);
                    return;
                }
                res.json(result)
            })
        }
    } else if(req.query.operation === 'delete') {
        if(!req.query.id) {
            res.sendStatus(400);
            return;
        }

        db.pool.query("DELETE FROM GameSetup WHERE gameSetupID = " + req.query.id + ";", function(err, result) {
            if (err) {
                console.log(err)
                res.sendStatus(400);
                return;
            }
            res.sendStatus(200)
        });
    } else if(req.query.operation === 'insert') {
        if(!(req.query.expansionsUsed && req.query.gameBoard && req.query.buildScoreTile)) {
            res.sendStatus(400);
            return;
        }
        
        db.pool.query(`SELECT gameSetupID FROM GameSetup
        WHERE expansionsUsed = "` + req.query.expansionsUsed + `" AND gameBoard = "` + req.query.gameBoard + `" AND buildScoreTile = "` + req.query.buildScoreTile + `"`,
        function(err, result) {
            if (err) {
                console.log(err)
                res.sendStatus(400);
                return;
            }
            
            if(result[0]) {
                res.send(String(result[0].gameSetupID))
            } else {
                db.pool.query("INSERT INTO GameSetup (expansionsUsed, gameBoard, buildScoreTile) VALUES (\"" + req.query.expansionsUsed + "\", \"" + req.query.gameBoard + "\", \"" + req.query.buildScoreTile + "\");", function(err, result) {
                    if (err) {
                        console.log(err)
                        res.sendStatus(400);
                        return;
                    }
                    res.send(result.insertId.toString())
                })
            }
        })
        
        
    } else if(req.query.operation === 'update') {
        if(!(req.query.expansionsUsed && req.query.gameBoard && req.query.buildScoreTile && req.query.id)) {
            res.sendStatus(400);
            return;
        }

        db.pool.query("UPDATE GameSetup SET expansionsUsed = \"" + req.query.expansionsUsed + "\", gameBoard = \"" + req.query.gameBoard + "\", buildScoreTile = \"" + req.query.buildScoreTile + "\" WHERE gameSetupID = " + req.query.id + ";", function(err, result) {
            if (err) {
                console.log(err)
                res.sendStatus(400);
                return;
            }
            res.sendStatus(200)
        })
    } else {
        res.status(400)
    }
}

function handleGameFactionRequest(req, res) {
    if(req.query.operation === 'select'){
        if(!req.query.id) {
            db.pool.query(`SELECT gf.gameFactionID, gf.playerID, gf.gameID, gf.endingCoins, gf.endingPopularity, gf.starsPlaced, gf.tilesControlled, gf.faction, gf.playerBoard, gf.resources, (SELECT playerName FROM Player WHERE Player.playerID = gf.playerID) as playerName
            FROM GameFaction gf`,
            function(err, result) {
                if (err) {
                    console.log(err)
                    res.sendStatus(400);
                    return;
                }
                res.json(result)
            })
        } else {
            db.pool.query("SELECT * FROM GameFaction WHERE gameSetupID = " + req.query.id + ";", function(err, results) {
                if (err) {
                    console.log(err)
                    res.sendStatus(400);
                    return;
                }
                res.json(result)
            })
        }
    } else if(req.query.operation === 'delete') {
        if(!req.query.id) {
            res.sendStatus(400)
            return;
        }
        
        db.pool.query(`DELETE FROM GameSetup
        WHERE gameSetupID = ` + req.query.id + `;`, function(err, result) {
            if (err) {
                console.log(err)
                res.sendStatus(400);
                return;
            }
            res.sendStatus(200)
        })
    } else if(req.query.operation === 'insert') {
        if(req.query.playerName && req.query.gameID && req.query.endingCoins
        && req.query.endingPopularity && req.query.starsPlaced && req.query.tilesControlled
        && req.query.faction && req.query.playerBoard && req.query.resources) {
            db.pool.query(`SELECT playerName
            FROM Player
            WHERE playerName = "` + req.query.playerName + `";`, function(err, result) {
                if(result[0]) {
                    db.pool.query(`INSERT INTO PlayerGameIntersection (playerID, gameID)
            VALUES ((SELECT playerID FROM Player WHERE playerName = "` + req.query.playerName + "\"), " + req.query.gameID + ");", function(err, result) {
                        if (err) {
                            console.log(err)
                            res.sendStatus(400)
                            return
                        } else {
                            db.pool.query(`INSERT INTO GameFaction (playerID, gameID, endingCoins, endingPopularity, starsPlaced, tilesControlled, faction, playerBoard, resources)
                    VALUES ((SELECT playerID FROM Player WHERE playerName = "` + req.query.playerName + `"), ` + req.query.gameID + `, ` + req.query.endingCoins + `, ` + req.query.endingPopularity + `, ` + req.query.starsPlaced + `, ` + req.query.tilesControlled + `, "` + req.query.faction + `", "` + req.query.playerBoard + `", ` + req.query.resources + `);`, function(err, result) {
                                if (err) {
                                    console.log(err)
                                    res.sendStatus(400);
                                    return;
                                }
                                               res.send(result.insertId.toString())
                            })
                        }
                    })
                } else {
                    db.pool.query("INSERT INTO Player (playerName) VALUES (\"" + req.query.playerName + "\");", function(err, result) {
                        db.pool.query(`INSERT INTO PlayerGameIntersection (playerID, gameID)
            VALUES ((SELECT playerID FROM Player WHERE playerName = "` + req.query.playerName + "\"), " + req.query.gameID + ");", function(err, result) {
                            if (err) {
                                console.log(err)
                                res.sendStatus(400)
                                return
                            } else {
                                db.pool.query(`INSERT INTO GameFaction (playerID, gameID, endingCoins, endingPopularity, starsPlaced, tilesControlled, faction, playerBoard, resources)
                    VALUES ((SELECT playerID FROM Player WHERE playerName = "` + req.query.playerName + `"), ` + req.query.gameID + `, ` + req.query.endingCoins + `, ` + req.query.endingPopularity + `, ` + req.query.starsPlaced + `, ` + req.query.tilesControlled + `, "` + req.query.faction + `", "` + req.query.playerBoard + `", ` + req.query.resources + `);`, function(err, result) {
                                    if (err) {
                                        console.log(err)
                                        res.sendStatus(400);
                                        return;
                                    }
                                                   res.send(result.insertId.toString())
                                })
                            }
                        })
                    })
                }
            })
        } else if (req.query.gameID && req.query.endingCoins && req.query.endingPopularity
        && req.query.starsPlaced && req.query.tilesControlled && req.query.faction
        && req.query.playerBoard && req.query.resources) {
            db.pool.query(`INSERT INTO GameFaction (playerID, gameID, endingCoins, endingPopularity, starsPlaced, tilesControlled, faction, playerBoard, resources)
            VALUES (NULL, ` + req.query.gameID + `, ` + req.query.endingCoins + `, ` + req.query.endingPopularity + `, ` + req.query.starsPlaced + `, ` + req.query.tilesControlled + `, "` + req.query.faction + `", "` + req.query.playerBoard + `", ` + req.query.resources + `);`, function(err, result) {
                if (err) {
                    console.log(err)
                    res.sendStatus(400);
                    return;
                }
                res.send(result.insertId.toString())
            })
        } else {
            res.status(400).send("wrong inputs")
        }
    } else if(req.query.operation === 'update') {
        if(!(req.query.id && req.query.playerName && req.query.gameID && req.query.endingCoins
        && req.query.endingPopularity && req.query.starsPlaced && req.query.tilesControlled
        && req.query.faction && req.query.playerBoard && req.query.resources)) {
            res.sendStatus(400)
        }
        
        db.pool.query(`SELECT playerID WHERE playerName = "` + req.query.playerName + `" FROM Player;`, function(err, result) {
            if (err) {
                console.log(err)
                res.sendStatus(400);
                return;
            }
            if(result[0]) {
                db.pool.query(`INSERT INTO PlayerGameIntersection (playerID, gameID)
                VALUES ((SELECT playerID FROM Player WHERE playerName = "` + req.query.playerName + "\"), " + req.query.gameID + ");", function(err, result) {})
                db.pool.query(`UPDATE GameFaction SET 
                playerID = (SELECT playerID FROM Player WHERE playerName = "` + req.query.playerName + `"), gameID = ` + req.query.gameID + `, endingCoins = ` + req.query.endingCoins + `, endingPopularity = ` + req.query.endingPopularity + `, starsPlaced = ` + req.query.starsPlaced + `, tilesControlled = ` + req.query.tilesControlled + `, faction = "` + req.query.faction + `", playerBoard = "` + req.query.playerBoard + `", resources = ` + req.query.resources + ` WHERE gameFactionID = ` + req.query.id + `;`, function(err, result) {
                    if (err) {
                        console.log(err)
                        res.sendStatus(400);
                        return;
                    }
                    res.sendStatus(200)
                });
            } else {
                db.pool.query(`INSERT INTO PlayerGameIntersection (playerID, gameID)
                VALUES ((SELECT playerID FROM Player WHERE playerName = "` + req.query.playerName + "\"), " + req.query.gameID + ");", function(err, result) {})
                db.pool.query("INSERT INTO Player (playerName) VALUES (\"" + req.query.playerName + "\");", function(err, result) {
                    if (err) {
                        console.log(err)
                        res.sendStatus(400);
                        return;
                    }
                    db.pool.query(`INSERT INTO PlayerGameIntersection (playerID, gameID)
                    VALUES ((SELECT playerID FROM Player WHERE playerName = "` + req.query.playerName + "\"), " + req.query.gameID + ");", function(err, result) {})
                    db.pool.query(`UPDATE GameFaction SET 
                    playerID = (SELECT playerID FROM Player WHERE playerName = "` + req.query.playerName + `"), gameID = ` + req.query.gameID + `, endingCoins = ` + req.query.endingCoins + `, endingPopularity = ` + req.query.endingPopularity + `, starsPlaced = ` + req.query.starsPlaced + `, tilesControlled = ` + req.query.tilesControlled + `, faction = "` + req.query.faction + `", playerBoard = "` + req.query.playerBoard + `", resources = ` + req.query.resources + ` WHERE gameFactionID = ` + req.query.id + `;`, function(err, result) {
                        if (err) {
                            console.log(err)
                            res.sendStatus(400);
                            return;
                        }
                        res.sendStatus(200)
                    });
                })
            }
        })
        
    } else {
        res.status(400)
    }
}

function handleApiRequest(req, res) {
    
    if(!req.query.operation) {
        res.status(404).send('Need operation');
        return;
    }
    
    if(!req.query.name){
        res.status(404).render('api', {
            pageTitle: 'API page'
        });
        return;
    }
    
    if(req.query.name === 'Player') {
        handlePlayerRequest(req, res)
    } else if (req.query.name === 'Game') {
        handleGameRequest(req, res)
    } else if (req.query.name === 'GameSetup') {
        handleGameSetupRequest(req, res)
    } else if (req.query.name === 'GameFaction') {
        handleGameFactionRequest(req, res)
    } else {
        res.sendStatus(400)
    }
}

module.exports.handleApiRequest = handleApiRequest
