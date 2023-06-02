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


async function deleteFaction(factionID) {
    // Perform delete operation for the given factionID
    const factionTableBody = document.getElementById("factionTableBody");
  
    console.log(`Deleting faction with ID: ${factionID}`);
    const selectfactionRow = document.getElementById(factionID); // Assuming there is only one row with the specified factionID
    // console.log("selectfactionRow: " + selectfactionRow);
    // console.log("selectfactionRow.innerHTML: " + selectfactionRow.innerHTML);
    // console.log("factionTableBody.innerHTML: " + factionTableBody.innerHTML);
    await fetch('http://flip1.engr.oregonstate.edu:3988/api?name=GameFaction&operation=delete&id='+factionID)

    factionTableBody.removeChild(selectfactionRow);
  }


  function searchFactionTable() {
    // Declare variables
    var input, filter, table, tr, tdfaction, tdboard, tdname, i, txtValue;
    input = document.getElementById("faction-search");
    filter = input.value.toUpperCase();
    table = document.getElementById("faction-table");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i <tr.length; i++) {
        tdname = tr[i].getElementsByTagName("td")[3];
        tdfaction = tr[i].getElementsByTagName("td")[4];
        tdboard = tr[i].getElementsByTagName("td")[5];
        if (tdname) {
            txtValueName = tdname.textContent || tdname.innerText;
            txtValueFaction = tdfaction.textContent || tdfaction.innerText;
            txtValueBoard = tdboard.textContent || tdboard.innerText;

            if ((txtValueName.toUpperCase().indexOf(filter) > -1) || (txtValueFaction.toUpperCase().indexOf(filter) > -1) || (txtValueBoard.toUpperCase().indexOf(filter) > -1)) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
  }


  renderFactionList();