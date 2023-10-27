
// event listener for a key press down and hold
document.addEventListener("keydown", keyIsPressed);

// event listener for release of a key that was held down
document.addEventListener("keyup", keyIsLetUp);

window.addEventListener("resize", debounce(windowResized,150));

function windowResized() {
    app.width = appWindow.width
    app.height = appWindow.height

    //reDrawAfterResize() 


    // app.stage.children.forEach(container => {
    //     //console.log(container)
    //     if (container.constructor.name == 'Container') {
    //     container.width = appWindow.width
    //     container.height = appWindow.height
    //     }
    // })

}

function debounce(func, time){
    var time = time || 100; // 100 by default if no param
    var timer;
    return function(event){
        if(timer) clearTimeout(timer);
        timer = setTimeout(func, time, event);
    };
}
