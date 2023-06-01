//buttons

for (var i = 1; i <= 7; i++){
    let classButton = document.getElementById("toggle-player-"+i)
    console.log("classButton: "+ classButton)
    let hidden = false
    const textBox = document.getElementById("player-"+i+"-text")
    if (classButton != null){
        classButton.addEventListener('click', function(){
            console.log("hidden: "+ hidden)
            console.log("textBox: " + textBox)
            if (hidden){
                textBox.removeAttribute("hidden")
                hidden = false
                classButton.textContent= "NONE"
            }else{
                textBox.setAttribute("hidden", "true")
                hidden = true
                classButton.textContent= "ADD"
            }
        })
    }
}

var playerID = document.getElementById("player-enter")

const changePlayerCount = document.getElementById("insert-player-count");
console.log("changePlayerCount: "+changePlayerCount)
console.log("changePlayerCount.innerHTML: "+changePlayerCount.innerHTML)
console.log("changePlayerCount.value: "+changePlayerCount.value)
function updatePlayers(){
    playerID.innerHTML = ""
    // changePlayerCount.innerHTML = ""
    console.log("changePlayerCount.value: "+changePlayerCount.value)
    for(var i = 1; i <= changePlayerCount.value; i++){
        
        playerID.innerHTML += 
        `<div id="player-${i}-insert" class="player-insert">
        Player ${i} insert:
        <div id="player-${i}-name"> Player Name: <input id="player-${i}-text" type="text" ><button id="toggle-player-${i}" type="button">NONE</button></div>
        <div class="player-faction">Player Faction Name: <input type="text"></div>
        <div class="player-board">Player Board Name: <input type="text"></div>
        <div class="player-coins">Player Coins: <input type="text"></div>
        <div class="player-popularity">Player Popularity (0-18): <input type="text"></div>
        <div class="player-stars">Player Stars (0-6): <input type="text"></div>
        <div class="player-tiles">Player Tiles: <input type="text"></div>
        <div class="player-resources">Player Resources: <input type="text"></div>
        </div>`
    }
    console.log("playerID: "+playerID)
}

    