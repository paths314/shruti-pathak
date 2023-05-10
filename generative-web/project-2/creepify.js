let input = document.querySelector(".input")
let output = document.querySelector(".output")
var slider = document.getElementById("myRange")
let sliderValue

console.log(sliderValue)

const luni = new Lunicode()

slider.oninput = function() {
    sliderValue = this.value;
    console.log(sliderValue)
    return(sliderValue)
}

let creepify = luni.tools.creepify.encode(input.value)
luni.tools.creepify.options.maxHeight = 30


output.innerHTML = creepify

let eListeners = ["keypress", "input", "paste"];

eListeners.forEach(event => {
  input.addEventListener(event, e => {
    let val = e.target.value;

    let creepify = luni.tools.creepify.encode(val);
    output.innerHTML = creepify;
  })
})

