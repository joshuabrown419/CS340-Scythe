//click links to take you from page to page

var pageURL = "http://localhost:3988/"

var homePage = document.getElementById("home-link") 

var gamePage = document.getElementById("game-link") 
var factionsPage = document.getElementById("factions-link") 
var playerPage = document.getElementById("player-link") 
var insertPage = document.getElementById("insert-link") 
var playerCount = document.getElementById("insert-player-count")

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
insertPage.addEventListener('click', function(){
    window.location.href = pageURL+"insert"
})
playerCount.addEventListener("change", function(){
    //for each player, add another addplayer handlebars partial
})