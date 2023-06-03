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
        var totalCoins
        if (faction.endingPopularity > 12){
            totalCoins = Math.floor(faction.resources/2)*3 + faction.tilesControlled*4 + faction.starsPlaced*5 + faction.endingCoins
        } else if (faction.endingPopularity > 6){
            totalCoins = Math.floor(faction.resources/2)*2 + faction.tilesControlled*3 + faction.starsPlaced*4 + faction.endingCoins
        } else {
            totalCoins = Math.floor(faction.resources/2)*1 + faction.tilesControlled*2 + faction.starsPlaced*3 + faction.endingCoins
        }
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
                <td>${totalCoins}</td>
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


  async function updateFactionSetup(){

    var updateFactionID = document.getElementById("update-faction-id").value
    var updatePlayerName = document.getElementById("update-player-name").value
    var updateCoins = document.getElementById("update-ending-coins").value
    var updatePopularity = document.getElementById("update-popularity").value
    var updateStars = document.getElementById("update-stars").value
    var updateTiles = document.getElementById("update-territories").value
    var updateResources = document.getElementById("update-resources").value
    var updateFaction = document.getElementById("update-faction").value
    var updateBoard = document.getElementById("update-board").value
    var keepGameID

    var factionExists = false
    const factionList = await getFactionData();
    console.log("factionList: "+factionList)

    factionList.forEach(faction => {
        console.log("Faction: "+faction.gameFactionID)
        if(faction.gameFactionID == updateFactionID){
            keepGameID = faction.gameID
            factionExists = true
            if (updatePlayerName == ""){
                updatePlayerName = faction.playerName
                console.log("updateStars is now: "+updatePlayerName)
            }
            if (updateStars == ""){
                updateStars = faction.starsPlaced
                console.log("updateStars is now: "+updateStars)
            }
            if (updateTiles == ""){
                updateTiles = faction.tilesControlled
                console.log("updateTiles is now: "+updateTiles)
            }
            if (updatePopularity == ""){
                updatePopularity = faction.endingPopularity
                console.log("updatePopularity is now: "+updateTiles)
            }
            if (updateResources == ""){
                updateResources = faction.resources
                console.log("updateResources is now: "+updateResources)
            }
            if (updateCoins == ""){
                updateCoins = faction.endingCoins
                console.log("updateCoins is now: "+updateCoins)
            }
        }
    })

    if (factionExists){
        console.log("Fetching...")
        await fetch('http://flip1.engr.oregonstate.edu:3988/api?name=GameFaction&operation=update&id='+updateFactionID+'&gameID='+keepGameID+'&playerName='+updatePlayerName+'&endingCoins='+updateCoins+'&endingPopularity='+updatePopularity+'&starsPlaced='+updateStars+'&tilesControlled='+updateTiles+'&faction='+updateFaction+'&playerBoard='+updateBoard+'&resources='+updateResources)
    }
    location.reload()
}

  renderFactionList();