//Send All Game Data to server
const submitGame = document.getElementById("enter-game")

submitGame.addEventListener('click', async function(){
    var gameDate = document.getElementById("game-date").value
    var allExpansions = document.querySelectorAll('#expansions :checked')
    var expansionsUsed = [...allExpansions].map(option => option.value)
    var boardUsed = document.getElementById("select-board-used").value
    var buildScoreTile = document.getElementById("build-tile").value

    var insertPlayer = []


    // console.log("Submiting Data")
    // console.log("Game Date:" + gameDate)
    console.log("Expansions: " + expansionsUsed)
    // console.log("Board Used:" + boardUsed)
    // console.log("Build Score Tile: " + buildScoreTile)
    if (expansionsUsed == ""){
        expansionsUsed = "None"
    }

    // console.log("Checking Game Date")
    // console.log(gameDate[4] + gameDate[5])
    var day = parseInt(gameDate[4] + gameDate[5])
    console.log(gameDate.substr(6,7))
    var month = parseInt(gameDate.substr(6,7))
    if (!isNumber(gameDate)){
        giveError("Game Date is not a number!")
        return
    } else if (gameDate.length != 8 || (month > 12) || (day > 31)){
        console.log(gameDate.substr(4,5))
        console.log(gameDate.substr(6,7))
        giveError("Game Date is not in a valid format!")
        return
    }

    console.log("Game Date is Good!")


    //check if players are inserted correctly
    const changePlayerCount = document.getElementById("insert-player-count");

    for (var i = 1; i <= changePlayerCount.value; i++){
        //Send the player name if one was provided
        var playerName = document.getElementById("player-"+i+"-text")
        var faction = document.getElementById("player-"+i+"-faction").value
        var board = document.getElementById("player-"+i+"-board").value
        var coins = document.getElementById("player-"+i+"-coins").value
        var popularity = document.getElementById("player-"+i+"-popularity").value
        var stars = document.getElementById("player-"+i+"-stars").value
        var tiles = document.getElementById("player-"+i+"-tiles").value
        var resources = document.getElementById("player-"+i+"-resources").value


        if (!isNumber(coins) || (0 > coins)){
            giveError("Player "+i+" coins is not filled correctly!")
            return
        }
        console.log("coins is Good!")

        if (faction == 0){
            giveError("Player "+i+" faction is not selected!")
            return
        }
        console.log("faction is Good!")

        if (board == 0){
            giveError("Player "+i+" board is not filled correctly!")
            return
        }
        console.log("board is Good!")
        
        if (!isNumber(popularity) || (popularity > 18)){
            giveError("Player "+i+" popularity is not filled correctly!")
            return
        }
        console.log("popularity is Good!")

        if (!isNumber(stars) || (stars > 6)){
            giveError("Player "+i+" stars is not filled correctly!")
            return
        }
        console.log("stars is Good!")

        if (!isNumber(tiles) || (0 > tiles)){
            giveError("Player "+i+" tiles is not filled correctly!")
            return
        }
        console.log("tiles is Good!")

        if (!isNumber(resources) || (0 > resources)){
            giveError("Player "+i+" resources is not filled correctly!")
            return
        }
        console.log("resources is Good!")
    }

    //Game Setup
    const sendGameSetup = await fetch('http://flip1.engr.oregonstate.edu:3988/api?name=GameSetup&operation=insert&expansionsUsed='+expansionsUsed+'&gameBoard='+boardUsed+'&buildScoreTile='+buildScoreTile)
    const gameSetupID = await sendGameSetup.text()
    // console.log("GameSetupID: "+ gameSetupID)

    //Game Statistics Page
    const sendGame = await fetch('http://flip1.engr.oregonstate.edu:3988/api?name=Game&operation=insert&gameSetupID='+gameSetupID+'&gameDate='+gameDate)
    const gameID = await sendGame.text()
    // console.log("gameID: "+ gameID)

    for (var i = 1; i <= changePlayerCount.value; i++){
        var playerName = document.getElementById("player-"+i+"-text")
        // console.log(isHidden(playerName))\
        var currentPlayerName = ""
        if (!isHidden(playerName)){
            currentPlayerName = playerName.value
        }

        var faction = document.getElementById("player-"+i+"-faction").value
        var board = document.getElementById("player-"+i+"-board").value
        var coins = document.getElementById("player-"+i+"-coins").value
        var popularity = document.getElementById("player-"+i+"-popularity").value
        var stars = document.getElementById("player-"+i+"-stars").value
        var tiles = document.getElementById("player-"+i+"-tiles").value
        var resources = document.getElementById("player-"+i+"-resources").value

        var currentplayerScore = 0

        if (popularity > 12){
            currentplayerScore += (Math.floor(Number(resources)/2)*3) + Number(tiles*4) + Number(stars*5) + Number(coins)
        } else if (popularity > 6){
            currentplayerScore +=  (Math.floor(Number(resources)/2)*2) + (Number(tiles)*3) + (Number(stars)*4) + parseInt(coins)
        } else {
            currentplayerScore +=  (Math.floor(Number(resources)/2)) + (Number(tiles)*2) + Number(stars*3) + Number(coins)
        }
        console.log("currentPlayerScore: "+currentplayerScore)
        
        
        insertPlayer.push([currentPlayerName+", "+faction, currentplayerScore])
        console.log("insertPlayer[i]: "+insertPlayer[i-1])        

        if (!isHidden(playerName)){
        const sendFaction = await fetch('http://flip1.engr.oregonstate.edu:3988/api?name=GameFaction&operation=insert&playerName='+playerName.value+'&gameID='+gameID+'&endingCoins='+coins+'&endingPopularity='+popularity+'&starsPlaced='+stars+'&tilesControlled='+tiles+'&faction='+faction+'&playerBoard='+board+'&resources='+resources)
        } else {
            const sendFaction = await fetch('http://flip1.engr.oregonstate.edu:3988/api?name=GameFaction&operation=insert&gameID='+gameID+'&endingCoins='+coins+'&endingPopularity='+popularity+'&starsPlaced='+stars+'&tilesControlled='+tiles+'&faction='+faction+'&playerBoard='+board+'&resources='+resources)
        }

    }

    var playerScores = ""
    for (var i = 0; i < insertPlayer.length; i++){
        playerScores += "<div class='popupPlayerNameScore'>Player: "+insertPlayer[i][0]+". Score: "+insertPlayer[i][1]+"</div>"
    }
    playerScores += "<div>Refresh the Page!</div>"
    showInsert(playerScores)
})



//find out if something is hidden
const isHidden = elem => {
    const styles = window.getComputedStyle(elem)
    return styles.display === 'none' || styles.visibility === 'hidden'
}

function isNumber(value) {
    if (value == ""){
        return false;
    }
    if (typeof value === "string") {
        return !isNaN(value);
    }
}

