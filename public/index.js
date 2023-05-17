//click links to take you from page to page

var pageURL = "/"

var homePage = document.getElementById("home-link") 

var gamePage = document.getElementById("game-link") 
var factionsPage = document.getElementById("factions-link") 
var playerPage = document.getElementById("player-link")
var boardPage = document.getElementById("board-link") 
var insertPage = document.getElementById("insert-link") 


homePage.addEventListener('click', function(){
    window.location.href = pageURL
})

gamePage.addEventListener('click', function(){
    window.location.href = pageURL+"game"
})
factionsPage.addEventListener('click', function(){
    window.location.href = pageURL+"factions"
})
playerPage.addEventListener('click', function(){
    window.location.href = pageURL+"player"
})
boardPage.addEventListener('click', function(){
    window.location.href = pageURL+"board"
})
insertPage.addEventListener('click', function(){
    window.location.href = pageURL+"insert"
})
