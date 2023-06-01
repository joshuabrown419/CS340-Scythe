async function getPlayerData() {
    const response = await fetch("http://flip1.engr.oregonstate.edu:3988/api?name=Player&operation=select");
    const playerList = await response.json();
    return playerList;
}

async function renderPlayerList() {
    const playerList = await getPlayerData();
    const playerTableBody = document.getElementById("playerTableBody");

    console.log("playerList: "+playerList)
    playerList.forEach(player => {
        playerTableBody.innerHTML += 
            `<tr id="${player.playerID}">
                <td>${player.playerID}</td>
                <td>${player.playerName}</td>
                <td>${player.gamesPlayed}</td>
                <td>${player.gamesWon}</td>
                <td class="delete">
                    <button onclick="deletePlayer(${player.playerID})">Delete</button>
                </td>
            </tr>`;
    }); 
}


function deletePlayer(playerID) {
    // Perform delete operation for the given playerID
    const playerTableBody = document.getElementById("playerTableBody");
  
    console.log(`Deleting player with ID: ${playerID}`);
    const selectPlayerRow = document.getElementById(playerID); // Assuming there is only one row with the specified playerID
    console.log("selectPlayerRow: " + selectPlayerRow);
    console.log("selectPlayerRow.innerHTML: " + selectPlayerRow.innerHTML);
    console.log("playerTableBody.innerHTML: " + playerTableBody.innerHTML);
    playerTableBody.removeChild(selectPlayerRow);
  }

renderPlayerList();