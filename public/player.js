async function getPlayerData() {
    const response = await fetch("http://flip1.engr.oregonstate.edu:3988/api?name=Player&operation=select");
    const playerList = await response.json();
    console.log(playerList);
    return playerList;
}

async function renderPlayerList() {
    const playerList = await getPlayerData();

    // const playerRowTemplate = document.getElementById("playerRowTemplate").innerHTML;
    const playerTableBody = document.getElementById("playerTableBody");

    // console.log(playerRowTemplate)
    console.log(playerTableBody)


    playerList.forEach(player => {
        // const playerRow = Handlebars.compile(playerRowTemplate)(player.playerID);
        
        // console.log(playerRow)
        // playerTableBody.innerHTML += playerRow;

        // const playerIDColumn = document.getElementsByClassName("playerID")
        // const thisPlayerID = playerIDColumn.

        // console.log("playerIdSet: "+playerIdSet)
        // console.log("playerIdSet.innerHTML: "+playerIdSet.innerHTML)
        
        playerTableBody.innerHTML += 
            `<tr>
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
    console.log(`Deleting player with ID: ${playerID}`);
}

renderPlayerList();