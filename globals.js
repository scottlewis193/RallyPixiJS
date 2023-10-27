//app instance declaration
let app 

//app window dimensions
let appWindow = {
get width() {return window.innerWidth},
get height() {return window.innerHeight},
get resolution() {return (window.devicePixelRatio == 1) ? 2 : window.devicePixelRatio}
}

//carList
let carsList = []

//playerCar
let playerCar

//elapsed time
let elapsed = 0.0;

//first Load
let firstLoad = true


// arrow key codes as constants
const UP_KEY = 38;
const DOWN_KEY = 40;
const RIGHT_KEY = 39;
const LEFT_KEY = 37;
const ONE_KEY = 49;