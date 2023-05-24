//click links to take you from page to page

var pageURL = "/"

var homePage = document.getElementById("home-link") 

var gamePage = document.getElementById("game-link") 
var factionsPage = document.getElementById("factions-link") 
var playerPage = document.getElementById("player-link")
var boardPage = document.getElementById("board-link") 
var insertPage = document.getElementById("insert-link") 


homePage.addEventListener('click', function(){
    // removeToggleButtons()
    window.location.href = pageURL
})
gamePage.addEventListener('click', function(){
    // removeToggleButtons()
    window.location.href = pageURL+"game"
})
factionsPage.addEventListener('click', function(){
    // removeToggleButtons()
    window.location.href = pageURL+"factions"
})
playerPage.addEventListener('click', function(){
    // removeToggleButtons()
    window.location.href = pageURL+"player"
})
boardPage.addEventListener('click', function(){
    // removeToggleButtons()
    window.location.href = pageURL+"board"
})
insertPage.addEventListener('click', function(){
    window.location.href = pageURL+"insert"
})

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

// function removeToggleButtons(){
//     for (var i = 1; i <= 7; i++){
//         let classButton = document.getElementById("toggle-player-"+i)
//         classButton.removeEventListener("click", function(){
//             console.log("removed listener "+i)
//         }) 
//     }
// }