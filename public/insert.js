//setup buttons initially 1
const classButtons = ["","","","","","",""]
classButtons[0] = document.getElementById("toggle-player-1")

let hiddenValues = [false,false,false,false,false,false, false]
const textBoxes = ["","","","","","",""]
textBoxes[0] = document.getElementById("player-1-text")

if (classButtons[0] != null){
    classButtons[0].addEventListener('click', function(){
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
function updatePlayers(){
    playerID.innerHTML = ""

    for(var i = 1; i <= changePlayerCount.value; i++){
        playerID.innerHTML += 
        `<div id="player-${i}-insert" class="player-insert">
        Player ${i} insert:
        <div id="player-${i}-name"> Player Name: <input id="player-${i}-text" type="text" id="player-${i}-name"><button id="toggle-player-${i}" type="button">NONE</button></div>
        <div class="player-faction">Faction Used:
                <select id="player-${i}-faction">
                    <option value="Republic of Polania">Republic of Polania</option>
                    <option value="Saxony Empire">Saxony Empire</option>
                    <option value="Crimean Khanate">Crimean Khanate</option>
                    <option value="Nordic Kingdoms">Nordic Kingdoms</option>
                    <option value="Rusviet Union">Rusviet Union</option>
                    <option value="Clan Albion">Clan Albion</option>
                    <option value="Togawa Shogunate">Togawa Shogunate</option>
                    <option value="Vesna">Vesna</option>
                    <option value="Fenris">Fenris</option>
                </select>
            </div>
            <div class="player-board">Board Used: 
                <select id="player-${i}-board">
                    <option value="Industrial">Industrial</option>
                    <option value="Agricultural">Agricultural</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Patriotic">Patriotic</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Militant">Militant (2a)</option>
                    <option value="Innovative">Innovative (3a)</option>
                </select>
            </div>
        <div class="player-popularity">Popularity (0-18): <input type="text" id="player-${i}-popularity"></div>
        <div class="player-coins">Coins+BuildTile: <input type="text" id="player-${i}-coins"></div>
        <div class="player-stars">Stars (0-6): <input type="text" id="player-${i}-stars"></div>
        <div class="player-tiles">Territories: <input type="text" id="player-${i}-tiles"></div>
        <div class="player-resources">Resources: <input type="text" id="player-${i}-resources"></div>
        <div>Final Score will be calculated</div>
        </div>`
    }
    //Add new event listeners
    for(var i = 0; i < changePlayerCount.value; i++){
        var j = i+1;
        // console.log(document.getElementById("toggle-player-"+j))
        classButtons[i] = document.getElementById("toggle-player-"+j)
        textBoxes[i] = document.getElementById("player-"+j+"-text")
        hiddenValues[i] = false
        // console.log("classButtons: " + classButtons)
        // console.log("textBoxes: " + textBoxes)
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
}