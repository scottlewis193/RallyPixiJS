


createApp()

window.addEventListener('load', function() {
    loadAssets()
    gameLoop()
})

    function createApp() {

        document.body.style.display = 'flex'
        document.body.style.justifyContent = 'center'
        document.body.style.background = '#808080'
        document.body.style.margin = 0

        var elements = document.body.getElementsByTagName('canvas')

        if (firstLoad == false) {document.body.removeChild(elements[0])}
        firstLoad = false

        app = new PIXI.Application({
            width: appWindow.width, 
            height: appWindow.height, 
            resolution: appWindow.resolution || 1, 
            autoDensity: true,
            backgroundColor: 0x808080, 
            antialias: true, 
            align:'right'
            });



        document.body.appendChild(app.view);
    
         // Scale mode for all textures, will retain pixelation
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    }


    function loadAssets() {
        

        UI.createEditorUI()
        //CARS.createPlayerCar()
        //UI.createRaceUI()
        sortDrawOrder()
    }



    
    function IsEven(val) {
        return (val % 2 == 0) 
    }

    function createBG() {
        let bgContainer = new PIXI.Container
        let bgTileWidth = 50 * appWindow.resolution
        let bgTileHeight = 50 * appWindow.resolution
        bgContainer.width = app.screen.width
        bgContainer.height = app.screen.height
        //bgContainer.pos = {x:0,y:0}

        
        app.stage.addChild(bgContainer)
      
        let requiredX =  Math.floor(app.screen.width / bgTileWidth)
        let requiredY = Math.floor(app.screen.height / bgTileHeight)
        let tileColour = 0

        for (x = 0; x < requiredX; x++) {

            for (y = 0; y < requiredY; y++) {

                let tile = new PIXI.Sprite(PIXI.Texture.WHITE,50,50);
                let WorldPos = getNewGlobalPos({x: x *bgTileWidth,y: y * bgTileHeight})
                tile.position.set(WorldPos.x,WorldPos.y)
                tile.tint = (tileColour == 0) ? 0x000000 : 0x808080
                //set this based on even or odd x y TODO
                tile.width = bgTileWidth
                tile.height = bgTileHeight
                bgContainer.addChild(tile)
                tileColour = (tileColour == 0) ? 1 : 0

            }

            tileColour = (tileColour == 0) ? 1 : 0            

        }




    return bgContainer
    }


 
    


     

    function sortDrawOrder() {
        app.stage.children.sort((a,b)=> (a.drawLayer > b.drawLayer ? 1 : -1))
        console.log(app.stage.children)
    }      

 
    

    function updateWorldContainerPositions() {

       app.stage.children.forEach(container => {
        //console.log(container)
        if (container.constructor.name == 'Container') {
            if (container.children.length>0) {
            if (container.children[0].constructor.name == 'baseCar') {
                if (container.children[0].ai == true) {
                container.x -= playerCar.xVelocity
                container.y += playerCar.yVelocity
                }
            } else {
                container.x -= playerCar.xVelocity
                container.y += playerCar.yVelocity
            }
        }
        
        // container.x = getNewGlobalPos({x: container.x, y: container.y}).x
        // container.y = getNewGlobalPos({x: container.x, y: container.y}).y
       }})

    }


    // function storeCarPos() {
    //     playerCarCopy = new baseCar
    //     playerCarCopy.worldX = playerCar.worldX
    //     playerCarCopy.worldY = playerCar.worldY
    // }

    // function restoreCarPos() {
    //     playerCar.oldworldX = playerCar.worldX
    //     playerCar.oldworldY = playerCar.worldY
    //     playerCar.worldX = playerCarCopy.worldX
    //     playerCar.worldY = playerCarCopy.worldY
    // }

    // function reDrawAfterResize() {
    //     storeCarPos()
    //     app.stage.removeChildren()
    //     loadAssets()
    //     restoreCarPos()
    // }


function gameLoop() {


app.ticker.add((delta) => {

// Add the time to our total elapsed time
elapsed += delta;

carsList.forEach(car => {car.update(delta);})

UI.updateDebugTxt();



});


}





