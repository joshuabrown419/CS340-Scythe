async function getBoardData() {
    const response = await fetch("http://flip1.engr.oregonstate.edu:3988/api?name=GameSetup&operation=select");
    const boardList = await response.json();
    return boardList;
}

async function renderBoardList() {
    const boardList = await getBoardData();
    const boardTableBody = document.getElementById("boardTableBody");

    console.log("boardList: "+boardList)
    boardList.forEach(board => {
        boardTableBody.innerHTML += 
            `<tr id="${board.gameSetupID}">
                <td>${board.gameSetupID}</td>
                <td>${board.expansionsUsed}</td>
                <td>${board.gameBoard}</td>
                <td>${board.buildScoreTile}</td>
                <td class="delete">
                    <button onclick="deleteBoard(${board.gameSetupID})">Delete</button>
                </td>
            </tr>`;
    }); 
}


async function deleteBoard(boardID) {
    // Perform delete operation for the given boardID
    const boardTableBody = document.getElementById("boardTableBody");
  
    console.log(`Deleting board with ID: ${boardID}`);
    const selectboardRow = document.getElementById(boardID); // Assuming there is only one row with the specified boardID
    
    await fetch('http://flip1.engr.oregonstate.edu:3988/api?name=GameSetup&operation=delete&id='+boardID)
    boardTableBody.removeChild(selectboardRow);
}

async function updateBoardSetup(){
    var allExpansions = document.querySelectorAll('#update-expansions :checked')

    var updateSetupID = document.getElementById("update-setup-id").value
    var updateExpansionsUsed = [...allExpansions].map(option => option.value)
    var updateBoardUsed = document.getElementById("update-board-used").value
    var updateBuildTile = document.getElementById("update-build-tile").value

    if (updateExpansionsUsed == null){
        updateExpansionsUsed = "None"
    }

    var boardExists = false
    const boardList = await getBoardData();
    boardList.forEach(board => {
        if(board.gameSetupID == updateSetupID){
            boardExists = true
        }
    })
    if (boardExists){
        console.log("Fetching...")
        await fetch('http://flip1.engr.oregonstate.edu:3988/api?name=GameSetup&operation=update&id='+updateSetupID+'&expansionsUsed='+updateExpansionsUsed+'&gameBoard='+updateBoardUsed+'&buildScoreTile='+updateBuildTile)
    }
    location.reload()
}
renderBoardList();