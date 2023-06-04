//click links to take you from page to page
var pageURL = "/"

var homePage = document.getElementById("home-link") 

var gamePage = document.getElementById("game-link") 
var factionsPage = document.getElementById("factions-link") 
var playerPage = document.getElementById("player-link")
var boardPage = document.getElementById("board-link") 
var insertPage = document.getElementById("insert-link") 

var closePopupButton = document.getElementById("close-popup")
closePopupButton.addEventListener("click", function(){closePopup()})

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



function giveError(message){
    const popup = document.getElementById("popup-error")
    const errorText = document.getElementById("popup-text")
    popup.removeAttribute("hidden")
    errorText.innerHTML = message
}
function closePopup(){
    const popup = document.getElementById("popup-error")
    popup.setAttribute("hidden", "true")
}