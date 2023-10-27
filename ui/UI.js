
var UI = new function() {

this.createRaceUI = function() {

    //base y pos
    let lbBaseY = appWindow.height - (200 * appWindow.resolution)
    let lbBaseX = ((5 * appWindow.resolution) * 1)
    let lbBaseW = 30 * appWindow.resolution
    let lbBaseH = 30 * appWindow.resolution

    //first
    UI.createUILeaderboardItem(lbBaseX,lbBaseY,30 * appWindow.resolution,30 * appWindow.resolution,'uiContainer','1','/chars/riley/rileyframe.png')

    //second
    UI.createUILeaderboardItem(lbBaseX,lbBaseY + ((30 * appWindow.resolution) * 1) + ((5 * appWindow.resolution) * 1),lbBaseW,lbBaseH,'uiContainer','2','/chars/roxy/roxyframe.png')

    //Third
    UI.createUILeaderboardItem(lbBaseX,lbBaseY + ((30 * appWindow.resolution) * 2) + ((5 * appWindow.resolution) * 2),lbBaseW,lbBaseH,'uiContainer','3','/chars/bonnie/bonnieframe.png')

    //Fourth
    UI.createUILeaderboardItem(lbBaseX,lbBaseY + ((30 * appWindow.resolution) * 3) + ((5 * appWindow.resolution) * 3),lbBaseW,lbBaseH,'uiContainer','4','/chars/lexy/lexyframe.png')
    
    //Player Position
    UI.createUIText(((5 * appWindow.resolution) * 1),lbBaseY + ((30 * appWindow.resolution) * 4.5) + ((5 * appWindow.resolution) * 4.5),'uiContainer','1st',TEXTSTYLES.defaultText)

     //add debug text
     UI.debugText = UI.createUIText(10,0,'uiContainer','',TEXTSTYLES.debugText)
   

     let barSizeW = 100 * appWindow.resolution;
     let barSizeH = 10 * appWindow.resolution;

     //add hp bar
     UI.createUIProgressBar((appWindow.width / 2) - (barSizeW / 2), appWindow.height - (barSizeH * 3),barSizeW,barSizeH,'uiContainer',0xFF0000)

     //add ammo bar
     UI.createUIProgressBar((appWindow.width / 2) - (barSizeW / 2),appWindow.height - (barSizeH * 2),barSizeW,barSizeH,'uiContainer',0x00FF00)

     //add speedo
     UI.speedoText = UI.createUIText(appWindow.width - (30 * appWindow.resolution),lbBaseY + ((30 * appWindow.resolution) * 4.5) + ((5 * appWindow.resolution) * 4.5),'uiContainer','0',TEXTSTYLES.defaultText)

}

this.createEditorUI = function() {

    

fetch('./tiles/Tiles.json')
.then((response) => response.json())
.then((json) => TILES.items = json);


UI.createUITileSelectionPage(0,0,appWindow.width,appWindow.height,'uiContainer',0x000000,'Close',TEXTSTYLES.defaultText)

}

this.createUIText = function(x=0,y=0,container,text,textStyle) {
    let newEl = new UIText(x,y,container,text,textStyle)
    return newEl
}

this.createUILeaderboardItem = function(x=0,y=0,w=0,h=0,container,text,texture) {
    let newEl = new UILeaderboardItem(x,y,w,h,container,text,texture)
    return newEl
}

this.createUIProgressBar = function(x=0,y=0,w=0,h=0,container,colour) {
    let newEl = new UIProgressBar(x,y,w,h,container,colour)
    return newEl
}

this.createUITileSelectionPage = function(x=0,y=0,w=0,h=0,container,colour,text,textStyle) {
    let newEl = new UITileSelectionPage(x,y,w,h,container,colour,text,textStyle)
    return newEl
}

this.createUIButton = function(x=0,y=0,w=0,h=0,container,colour,text,textStyle,onClickFunc) {
    let newEl = new UIButton(x,y,w,h,container,colour,text,textStyle,onClickFunc)
    return newEl
}

this.createUIContainer = function(x=0,y=0,w=0,h=0,name=''){
    let newCon = new baseContainer(x,y,w,h,name)
    return newCon
}



this.updateDebugTxt = function() {
    if (!this.debugText) {return}
    this.debugText.text = 
    'FPS: ' + Math.floor(app._ticker.FPS) + '\n' +
    'X:' + Math.floor(playerCar.worldX) + '\n' + 
    'Y:' + Math.floor(playerCar.worldY) + '\n' +
    'Throttle:' + Math.floor(playerCar.isThrottling) + '\n' +
    'Reverse:' + Math.floor(playerCar.isReversing) + '\n' +
    'Left:' + Math.floor(playerCar.isTurningLeft) + '\n' +
    'Right:' + Math.floor(playerCar.isTurningRight) + '\n' +
    'Angle:' + playerCar.absAngle + '\n' +
    'PosAngle:' + playerCar.posAngle + '\n' + 
    'Speed:' + playerCar.speed  + '\n' +
    'AVelocity:' + Math.abs(Math.floor(playerCar.angularVelocity*100)) + '\n' +
    'aiAngle:' + Math.floor(carsList[carsList.length-1].absAngle) + '\n' +
    'aiTAngle:' + Math.floor(carsList[carsList.length-1].aiTargetAngle) + '\n' +
    'aiX:' + Math.floor(carsList[carsList.length-1].worldX) + '\n' +
    'aiY:' + Math.floor(carsList[carsList.length-1].worldY) + '\n' // +
    'aiThrottle:' + Math.floor(carsList[carsList.length-1].Throttle) + '\n' +
    'aiReverse:' + Math.floor(carsList[carsList.length-1].smContainer.y) + '\n'
    this.debugText.x = 0
    this.debugText.y = 0

    this.speedoText.text = playerCar.speed

}  

this.debugText
this.speedoText

//add UI container
this.createUIContainer(0,0,appWindow.width,appWindow.height,'uiContainer')



}