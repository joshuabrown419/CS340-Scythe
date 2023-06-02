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
    // console.log("selectboardRow: " + selectboardRow);
    // console.log("selectboardRow.innerHTML: " + selectboardRow.innerHTML);
    // console.log("boardTableBody.innerHTML: " + boardTableBody.innerHTML);
    await fetch('http://flip1.engr.oregonstate.edu:3988/api?name=GameSetup&operation=delete&id='+boardID)

    boardTableBody.removeChild(selectboardRow);
  }

  renderBoardList();