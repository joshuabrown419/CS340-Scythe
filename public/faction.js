async function getFactionData() {
    const response = await fetch("http://flip1.engr.oregonstate.edu:3988/api?name=Faction&operation=select");
    const factionList = await response.json();
    return factionList;
}

async function renderFactionList() {
    const factionList = await getFactionData();
    const factionTableBody = document.getElementById("factionTableBody");

    console.log("factionList: "+factionList)
    factionList.forEach(faction => {
        factionTableBody.innerHTML += 
            `<tr id="${faction.factionID}">
                <td>${faction.factionID}</td>
                <td>${faction.playerID}</td>
                <td>${faction.gameID}</td>
                <td>${faction.factionName}</td>
                <td>${faction.playerBoard}</td>
                <td>${faction.coins}</td>
                <td>${faction.popularity}</td>
                <td>${faction.stars}</td>
                <td>${faction.tilesControlled}</td>
                <td>${faction.resources}</td>
                <td class="delete">
                    <button onclick="deleteFaction(${faction.factionID})">Delete</button>
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