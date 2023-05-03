SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS GameSetup;
CREATE TABLE GameSetup (
    gameSetupID     INT             NOT NULL AUTO_INCREMENT,
    expansionsUsed  varchar(200)    NOT NULL,
    gameBoard       varchar(50)     NOT NULL,
    buildScoreTile  varchar(50)     NOT NULL,

    PRIMARY KEY (gameSetupID)
);

DROP TABLE IF EXISTS Player;
CREATE TABLE Player (
    playerID        INT             NOT NULL AUTO_INCREMENT,
    playerName      varchar(50)     NOT NULL,
    
    PRIMARY KEY (playerID)
);

DROP TABLE IF EXISTS Game;
CREATE TABLE Game (
    gameID          INT             NOT NULL AUTO_INCREMENT,
    gameSetupID     INT             NOT NULL,
    gameDate        DATETIME,
    
    PRIMARY KEY (gameID)
);

DROP TABLE IF EXISTS PlayerGameIntersection;
CREATE TABLE PlayerGameIntersection (
    playerID        INT             NOT NULL,
    gameID          INT             NOT NULL,
    
    PRIMARY KEY (playerID, gameID),
    FOREIGN KEY (playerID) REFERENCES Player(playerID),
    FOREIGN KEY (gameID) REFERENCES Game(gameID)
);

DROP TABLE IF EXISTS GameFaction;
CREATE TABLE GameFaction (
    gameFactionID       INT             NOT NULL AUTO_INCREMENT,
    playerID            INT             NOT NULL,
    gameID              INT             NOT NULL,
    endingCoints        SMALLINT,
    endingPopularity    TINYINT,
    starsPlaced         TINYINT,
    tilesControlled     TINYINT,
    faction             varchar(50),
    playerBoard         varchar(50),
    resources           SMALLINT,
    
    PRIMARY KEY (gameFactionID),
    FOREIGN KEY (playerID) REFERENCES Player(playerID),
    FOREIGN KEY (gameID) REFERENCES Game(gameID)
);