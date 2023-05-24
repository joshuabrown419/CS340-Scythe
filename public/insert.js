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
