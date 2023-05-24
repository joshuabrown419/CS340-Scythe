var playerList
async function getPlayerData(){
    const response = await fetch("/api?name=Player&operation=select", )
    playerList = await response.json()
    console.log(playerList)
}
