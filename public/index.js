//click links to take you from page to page

var pageURL = "http://localhost:3988/"

var homePage = document.getElementById("home-link") 

var gamePage = document.getElementById("game-link") 
var factionsPage = document.getElementById("factions-link") 
var playerPage = document.getElementById("player-link") 
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
insertPage.addEventListener('click', function(){
    window.location.href = pageURL+"insert"
})