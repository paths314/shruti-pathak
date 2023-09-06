window.addEventListener("beforeunload", function(e) {
    sessionStorage.removeItem('gameName');
});

var gameDiv = document.getElementById('game')
var game = sessionStorage.getItem('gameName')

console.log(game)
// sessionStorage.removeItem('gameName')


// window.onload = metadata()

// function metadata(){
//     var game = localStorage.getItem('gameName')
//     return game
// }



