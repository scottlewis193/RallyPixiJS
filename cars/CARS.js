var CARS = new function() {

    this.createCar = function(ai,colour) {
    let car = new baseCar(ai,colour)
    return car
    }

    this.spawnAI = function() {

        let aiCar = CARS.createCar(true,'0xff0000')
        aiCar.x -= playerCar.worldX
        aiCar.y -= playerCar.worldY
        sortDrawOrder()
    }

    this.createPlayerCar = function() {

        //add player car
        playerCar = CARS.createCar(false,'0xffffff')
        sortDrawOrder()
    }
    
    }