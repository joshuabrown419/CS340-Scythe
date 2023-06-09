-- Scythe data manipulation queries

-- Select all the player names
SELECT
playerID,
playerName,
(SELECT COUNT(*) FROM PlayerGameIntersection WHERE p.playerID = PlayerGameIntersection.playerID) AS gamesPlayed,
(SELECT COUNT(*) FROM GameFaction gf WHERE gf.playerID = p.playerID AND (gf.endingCoins + gf.endingPopularity + gf.starsPlaced + gf.tilesControlled + gf.resources) = (SELECT MAX(gf2.endingCoins + gf2.endingPopularity + gf2.starsPlaced + gf2.tilesControlled + gf2.resources) FROM GameFaction gf2 WHERE gf2.gameID = gf.gameID)) as gamesWon

FROM Player p;

-- Select a player by name
SELECT playerID FROM Player WHERE playerName= :selected_player_name;

-- Select all the games a player has participated in
SELECT Game.gameID, Game.gameSetupID, Game.gameDate
FROM Game
INNER JOIN PlayerGameIntersection ON PlayerGameIntersection.gameID = Game.gameID
WHERE PlayerGameIntersection.playerID = :selected_played_id;

-- Select games a player has participate in by player name
SELECT Game.gameID
FROM Game
INNER JOIN PlayerGameIntersection ON PlayerGameIntersection.gameID = Game.gameID
WHERE PlayerGameIntersection.playerID = (SELECT playerID FROM Player WHERE playerName = :select_player_name);

-- Select all the games
SELECT gameID, gameSetupID, gameDate,
(SELECT COUNT(*) FROM GameFaction gf3 WHERE gf3.gameID = g.gameID) as playerCount,
(SELECT p.playerName as playerName FROM GameFaction gf INNER JOIN Player p ON gf.playerID = p.playerID WHERE (gf.gameID = g.gameID AND (gf.endingCoins + gf.endingPopularity + gf.starsPlaced + gf.tilesControlled + gf.resources) = (SELECT MAX(gf2.endingCoins + gf2.endingPopularity + gf2.starsPlaced + gf2.tilesControlled + gf2.resources) FROM GameFaction gf2 WHERE gf2.gameID = g.gameID))) as winningPlayer
FROM Game g
ORDER BY gameDate DESC, gameID ASC;

-- Select all the players in a game
SELECT Player.playerID, Player.playerName
FROM Player
INNER JOIN PlayerGameIntersection ON PlayerGameIntersection.playerID = Player.playerID
WHERE PlayerGameIntersection.gameID = :selected_game_id;

-- Select all the GameFactions in a game
SELECT *
FROM GameFaction
WHERE gameID = :selected_game_id;

-- Select the GameSetup for a game
SELECT expansionsUsed, gameBoard, buildScoreTile
FROM GameSetup
WHERE gameSetupID = (SELECT gameSetupdID FROM Game WHERE gameID = :selected_game_id);

-- Select all GameSetups
SELECT *
FROM GameSetup;

-- Add a new player
INSERT INTO Player (playerName)
VALUES (:new_player_name);

-- Add a new game
INSERT INTO Game (gameSetupID, gameDate)
VALUES (:game_setup_id, :game_date);

-- Add a player's participation to a game
INSERT INTO PlayerGameIntersection (playerID, gameID)
VALUES (SELECT playerID FROM Player WHERE playerName = :selected_player_name, :game_id);

INSERT INTO GameFaction (playerID, gameID, endingCoins, endingPopularity, starsPlaced, tilesControlled, faction, playerBoard, resources)
VALUES (SELECT playerID FROM Player WHERE playerName = :selected_player_name, :game_id, :ending_coins, :ending_popularity, :stars_placed, :tiles_controlled, :faction, :player_board, :resources);

-- Add participation for a player who does not have an account
INSERT INTO GameFaction (playerID, gameID, endingCoins, endingPopularity, starsPlaced, tilesControlled, faction, playerBoard, resources)
VALUES (NULL, :game_id, :ending_coins, :ending_popularity, :stars_placed, tiles_controlled, :faction, :player_board, :resources)

-- Add a new setup
INSERT INTO GameSetup (expansionsUsed, gameBoard, buildScoreTile)
VALUES (expansions_used, game_board, build_score_tile);

-- Update a players name
UPDATE Player SET playerName = :new_player_name
WHERE playerID = :player_id_from_update;

-- Update date a game was played on
UPDATE Game SET gameDate = :new_game_date, gameSetupID = :new_game_setup_id
WHERE gameID = :game_id_from_update;

-- Update a game setup
UPDATE GameSetup SET expansionsUsed = :new_expansions_used, gameBoard = :new_game_board, buildScoreTile = :new_build_score_tile
WHERE gameSetupID = :game_setup_id_from_update;

-- Delete a player
DELETE FROM Player
WHERE playerID = :player_id

-- Delete a game
DELETE FROM Game
WHERE gameID = :game_id

-- Delete a game setup
DELETE FROM GameSetup
WHERE gameSetupID = :game_setup_id

-- Delete a game faction
DELETE FROM GameFaction
WHERE gameFactionID = :game_faction_id
