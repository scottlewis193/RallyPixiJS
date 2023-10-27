

const controls = 
    {
        up:0,
        down:0,
        left:0,
        right:0
    
    }

    // function runs when we press and hold a key down
function keyIsPressed(keyEvent) {
    console.log("Key Pressed: " + keyEvent.keyCode);

    switch(keyEvent.keyCode) {
        case UP_KEY: case DOWN_KEY: case LEFT_KEY: case RIGHT_KEY:
            carControlKeySetup(keyEvent, true);
        break;
        case ONE_KEY:
            CARS.spawnAI();
            console.log(app.stage.children)
        break;
    }
    //cancels event from occuring more than the first time, when key held down
    keyEvent.preventDefault();
}

// function runs when we release a key that was held down
function keyIsLetUp(keyEvent) {
    //console.log("Key Released: " + keyEvent.keyCode);
    carControlKeySetup(keyEvent, false);
}

function carControlKeySetup(keyEvent, pressed) {
    switch(keyEvent.keyCode) {
        case UP_KEY:
            controls.up = pressed
        break;
        case DOWN_KEY:
            controls.down = pressed
        break;
        case LEFT_KEY:
            controls.left = pressed
        break;
        case RIGHT_KEY:
            controls.right = pressed
        break;
    }
}