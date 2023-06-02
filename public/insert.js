//setup buttons initially 1
const classButtons = ["","","","","","",""]
classButtons[0] = document.getElementById("toggle-player-1")

let hiddenValues = [false,false,false,false,false,false, false]
const textBoxes = ["","","","","","",""]
textBoxes[0] = document.getElementById("player-1-text")

if (classButtons[0] != null){
    classButtons[0].addEventListener('click', function(){
        console.log("hidden: "+ hiddenValues[0])
        console.log("textBox: " + textBoxes[0])
        if (hiddenValues[0]){
            textBoxes[0].removeAttribute("hidden")
            hiddenValues[0] = false
            classButtons[0].textContent= "NONE"
        }else{
            textBoxes[0].setAttribute("hidden", "true")
            hiddenValues[0] = true
            classButtons[0].textContent= "ADD"
        }
    })
}

var oldPlayerCount = 1


var playerID = document.getElementById("player-enter")

const changePlayerCount = document.getElementById("insert-player-count");
console.log("changePlayerCount: "+changePlayerCount)
console.log("changePlayerCount.innerHTML: "+changePlayerCount.innerHTML)
console.log("changePlayerCount.value: "+changePlayerCount.value)
function updatePlayers(){
    // changePlayerCount.innerHTML = ""
    console.log("changePlayerCount.value: "+changePlayerCount.value)


    // //Remove old event listeners
    // for (var i = 0; i < oldPlayerCount; i++){
    //     const textBox = textBoxes[i]
    //     const classButton = classButtons[i]
    //     hiddenValues[i] = false

    //     classButton.removeEventListener('')
    // }
    
    //Add Input Boxes
    playerID.innerHTML = ""

    for(var i = 1; i <= changePlayerCount.value; i++){
        playerID.innerHTML += 
        `<div id="player-${i}-insert" class="player-insert">
        Player ${i} insert:
        <div id="player-${i}-name"> Player Name: <input id="player-${i}-text" type="text" id="player-${i}-name"><button id="toggle-player-${i}" type="button">NONE</button></div>
        <div class="player-faction">Player Faction Name: <input type="text" id="player-${i}-faction"></div>
        <div class="player-board">Player Board Name: <input type="text" id="player-${i}-board"></div>
        <div class="player-coins">Player Coins: <input type="text" id="player-${i}-coins"></div>
        <div class="player-popularity">Player Popularity (0-18): <input type="text" id="player-${i}-popularity"></div>
        <div class="player-stars">Player Stars (0-6): <input type="text" id="player-${i}-stars"></div>
        <div class="player-tiles">Player Tiles: <input type="text" id="player-${i}-tiles"></div>
        <div class="player-resources">Player Resources: <input type="text" id="player-${i}-resources"></div>
        </div>`
    }
    //Add new event listeners
    for(var i = 0; i < changePlayerCount.value; i++){
        var j = i+1;
        console.log(document.getElementById("toggle-player-"+j))
        classButtons[i] = document.getElementById("toggle-player-"+j)
        textBoxes[i] = document.getElementById("player-"+j+"-text")
        hiddenValues[i] = false
        console.log("classButtons: " + classButtons)
        console.log("textBoxes: " + textBoxes)
        const textBox = textBoxes[i]
        const classButton = classButtons[i]
        let hidden = hiddenValues[i]
        if (classButton != null){
            classButton.addEventListener('click', function(){
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

    console.log("playerID: "+playerID)
}