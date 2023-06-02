async function getFactionData() {
    const response = await fetch("http://flip1.engr.oregonstate.edu:3988/api?name=GameFaction&operation=select");
    const factionList = await response.json();
    return factionList;
}

async function renderFactionList() {
    const factionList = await getFactionData();
    const factionTableBody = document.getElementById("factionTableBody");

    console.log("factionList: "+factionList)
    factionList.forEach(faction => {
        factionTableBody.innerHTML += 
            `<tr id="${faction.gameFactionID}">
                <td>${faction.gameFactionID}</td>
                <td>${faction.playerID}</td>
                <td>${faction.gameID}</td>
                <td>${faction.playerName}</td>
                <td>${faction.faction}</td>
                <td>${faction.playerBoard}</td>
                <td>${faction.endingCoins}</td>
                <td>${faction.endingPopularity}</td>
                <td>${faction.starsPlaced}</td>
                <td>${faction.tilesControlled}</td>
                <td>${faction.resources}</td>
                <td class="delete">
                    <button onclick="deleteFaction(${faction.gameFactionID})">Delete</button>
                </td>
            </tr>`;
    }); 
}


function deleteFaction(factionID) {
    // Perform delete operation for the given factionID
    const factionTableBody = document.getElementById("factionTableBody");
  
    console.log(`Deleting faction with ID: ${factionID}`);
    const selectfactionRow = document.getElementById(factionID); // Assuming there is only one row with the specified factionID
    console.log("selectfactionRow: " + selectfactionRow);
    console.log("selectfactionRow.innerHTML: " + selectfactionRow.innerHTML);
    console.log("factionTableBody.innerHTML: " + factionTableBody.innerHTML);
    factionTableBody.removeChild(selectfactionRow);
  }

  renderFactionList();