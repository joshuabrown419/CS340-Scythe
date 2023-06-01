async function getGameData() {
    const response = await fetch("http://flip1.engr.oregonstate.edu:3988/api?name=Game&operation=select");
    const gameList = await response.json();
    return gameList;
}

async function renderGameList() {
    const gameList = await getGameData();
    const gameTableBody = document.getElementById("gameTableBody");
    console.log("GameList: " + gameList)
    gameList.forEach(game => {
        gameTableBody.innerHTML += 
            `<tr id="${game.gameID}">
                <td>${game.gameID}</td>
                <td>${game.gameSetupID}</td>
                <td>${game.winningPlayer}</td>
                <td>${game.playerCount}</td>
                <td>${game.gameDate}</td>
                <td class="delete">
                    <button onclick="deleteGame(${game.gameID})">Delete</button>
                </td>
            </tr>`;
    }); 
}


function deleteGame(gameSetupID) {
    // Perform delete operation for the given GameID
    const gameTableBody = document.getElementById("gameTableBody");
  
    console.log(`Deleting game with ID: ${gameSetupID}`);
    const selectGameRow = document.getElementById(gameSetupID); // Assuming there is only one row with the specified gameID
    console.log("selectGameRow: " + selectGameRow);
    console.log("selectGameRow.innerHTML: " + selectGameRow.innerHTML);
    console.log("GameTableBody.innerHTML: " + gameTableBody.innerHTML);
    gameTableBody.removeChild(selectGameRow);
  }

renderGameList();