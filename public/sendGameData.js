//Send All Game Data to server
const submitGame = document.getElementById("enter-game")

submitGame.addEventListener('click', async function(){
    var gameDate = document.getElementById("game-date").value
    var allExpansions = document.querySelectorAll('#expansions :checked')
    var expansionsUsed = [...allExpansions].map(option => option.value)
    var boardUsed = document.getElementById("select-board-used").value
    var buildScoreTile = document.getElementById("build-tile").value


    // console.log("Submiting Data")
    // console.log("Game Date:" + gameDate)
    // console.log("Expansions: " + expansionsUsed)
    // console.log("Board Used:" + boardUsed)
    // console.log("Build Score Tile: " + buildScoreTile)
    if (expansionsUsed.value == null){
        expansionsUsed.value = "None"
    }
    const changePlayerCount = document.getElementById("insert-player-count");

    //Game Setup
    const sendGameSetup = await fetch('http://flip1.engr.oregonstate.edu:3988/api?name=GameSetup&operation=insert&expansionsUsed='+expansionsUsed.value+'&gameBoard='+boardUsed+'&buildScoreTile='+buildScoreTile)
    const gameSetupID = await sendGameSetup.text()
    // console.log("GameSetupID: "+ gameSetupID)

    //Game Statistics Page
    const sendGame = await fetch('http://flip1.engr.oregonstate.edu:3988/api?name=Game&operation=insert&gameSetupID='+gameSetupID+'&gameDate='+gameDate)
    const gameID = await sendGame.text()
    // console.log("gameID: "+ gameID)

    for (var i = 1; i <= changePlayerCount.value; i++){
        //Send the player name if one was provided
        var playerName = document.getElementById("player-"+i+"-text")
        // console.log(isHidden(playerName))
        if (!isHidden(playerName)){
            // console.log("playerName.value: "+playerName.value)
        }
        var faction = document.getElementById("player-"+i+"-faction").value
        var board = document.getElementById("player-"+i+"-board").value
        var coins = document.getElementById("player-"+i+"-coins").value
        var popularity = document.getElementById("player-"+i+"-popularity").value
        var stars = document.getElementById("player-"+i+"-stars").value
        var tiles = document.getElementById("player-"+i+"-tiles").value
        var resources = document.getElementById("player-"+i+"-resources").value
        // console.log("faction: " +faction)
        // console.log("board: " +board)
        // console.log("coins: " +coins)
        // console.log("popularity: " +popularity)
        // console.log("stars: " +stars)
        // console.log("tiles: " +tiles)
        // console.log("resources: " +resources)

        const gameSetup = {
            expansionsUsed: expansionsUsed.value,
            gameBoard: boardUsed,
            buildScoreTile: buildScoreTile
        }
        const sendFaction = await fetch('http://flip1.engr.oregonstate.edu:3988/api?name=GameFaction&operation=insert&playerName='+playerName.value+'&gameID='+gameID+'&endingCoins='+coins+'&endingPopularity='+popularity+'&starsPlaced='+stars+'&tilesControlled='+tiles+'&faction='+faction+'&playerBoard='+board+'&resources='+resources)
    }
    
})



//find out if something is hidden
const isHidden = elem => {
    const styles = window.getComputedStyle(elem)
    return styles.display === 'none' || styles.visibility === 'hidden'
  }

