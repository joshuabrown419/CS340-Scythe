async function getPlayerData() {
    const response = await fetch("http://flip1.engr.oregonstate.edu:3988/api?name=Player&operation=select");
    const playerList = await response.json();
    console.log(playerList);
    return playerList;
}

async function renderPlayerList() {
    const playerList = await getPlayerData();
    const playerRowTemplate = document.getElementById("playerRowTemplate").innerHTML;
    const playerTableBody = document.getElementById("playerTableBody");

    const template = Handlebars.compile(playerRowTemplate);

    playerList.forEach(player => {
        console.log(player.playerName)
        const playerRow = template({ playerIDDisplay: player.playerID, playerNameDisplay: player.playerName, playerGamesPlayedDisplay:player.gamesPlayed, playerGamesWonDisplay:player.gamesWon}); // Pass the player object as { player: player }
        playerTableBody.innerHTML += playerRow;
    });
}


function deletePlayer(playerID) {
    // Perform delete operation for the given playerID
    console.log(`Deleting player with ID: ${playerID}`);
}

renderPlayerList();