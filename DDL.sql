SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS GameSetup;
CREATE TABLE GameSetup (
    gameSetupID     INT             NOT NULL AUTO_INCREMENT,
    expansionsUsed  varchar(200),
    gameBoard       varchar(50)     NOT NULL,
    buildScoreTile  varchar(50)     NOT NULL,

    PRIMARY KEY (gameSetupID),
    CONSTRAINT uniqueSetup UNIQUE (expansionsUsed, gameBoard, buildScoreTile)
);

INSERT INTO GameSetup (expansionsUsed, gameBoard, buildScoreTile)
VALUES ('Invaders From Afar', 'Modular', 'Buildings On Villages'),
(NULL, 'Standard', 'Lakes Adjacent to Buildings');

SELECT * FROM GameSetup;

DROP TABLE IF EXISTS Player;
CREATE TABLE Player (
    playerID        INT             NOT NULL AUTO_INCREMENT,
    playerName      varchar(50)     NOT NULL,
    
    PRIMARY KEY (playerID)
);

INSERT INTO Player (playerName)
VALUES ('Henry'),
('Nico'),
('Joshua'),
('Noah'),
('Claire'),
('Sophie');

SELECT * FROM Player;

DROP TABLE IF EXISTS Game;
CREATE TABLE Game (
    gameID          INT             NOT NULL AUTO_INCREMENT,
    gameSetupID     INT             NOT NULL,
    gameDate        DATETIME,
    
    PRIMARY KEY (gameID),
    FOREIGN KEY (gameSetupID) REFERENCES GameSetup(gameSetupID)
);

INSERT INTO Game (gameSetupID, gameDate)
VALUES (0, '20230411');

SELECT * FROM Game;

DROP TABLE IF EXISTS PlayerGameIntersection;
CREATE TABLE PlayerGameIntersection (
    playerID        INT             NOT NULL,
    gameID          INT             NOT NULL,

    PRIMARY KEY (playerID, gameID),
    FOREIGN KEY (playerID) REFERENCES Player(playerID) ON DELETE CASCADE,
    FOREIGN KEY (gameID) REFERENCES Game(gameID) ON DELETE CASCADE
);

INSERT INTO PlayerGameIntersection (playerID, gameID)
VALUES (1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1);

SELECT * FROM PlayerGameIntersection;

DROP TABLE IF EXISTS GameFaction;
CREATE TABLE GameFaction (
    gameFactionID       INT             NOT NULL AUTO_INCREMENT,
    playerID            INT,
    gameID              INT             NOT NULL,
    endingCoins         SMALLINT,
    endingPopularity    TINYINT,
    starsPlaced         TINYINT,
    tilesControlled     TINYINT,
    faction             varchar(50),
    playerBoard         varchar(50),
    resources           SMALLINT,

    PRIMARY KEY (gameFactionID),
    FOREIGN KEY (playerID) REFERENCES Player(playerID) ON DELETE SET NULL,
    FOREIGN KEY (gameID) REFERENCES Game(gameID) ON DELETE CASCADE
);

INSERT INTO GameFaction (playerID, gameID, endingCoins, endingPopularity, starsPlaced, tilesControlled, faction, playerBoard, resources)
VALUES (1, 1, 15, 13, 6, 9, 'Rusviet Union', 'Agriculture', 2),
(2, 1, 15, 11, 4, 3, 'Saxony Empire', 'Military', 5),
(3, 1, 20, 0, 4, 9, 'Nordic Kingdoms', 'Industrial', 6),
(4, 1, 16, 13, 3, 6, 'Crimean Khanate', 'Innovative', 3),
(5, 1, 1, 7, 1, 6, 'Clan Albion', 'Mechanical', 5);

SELECT * FROM GameFaction;

SET FOREIGN_KEY_CHECKS=1;
