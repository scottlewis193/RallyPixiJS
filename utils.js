function deg2rad(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function rad2deg(rad)
{
  var pi = Math.PI;
  return rad * (180/pi);
}

function getObjCenter(sprite,dimension)
{
if (dimension == 'x') {

} else {
return sprite.y + (sprite.height * sprite.anchor.y)
}
}

function worldToScreenPos(x,y) {

  return {x: x + appWindow.width/2,y: y + appWindow.height/2}
}

function getNewGlobalPos(pos) {
  return {x: pos.x - (playerCar.worldX-playerCar.oldworldX), y: pos.y - (playerCar.worldY-playerCar.oldworldY)}
}



function getContainerfromName(name) {
return app.stage.children.find(obj => {return obj.constructor.name == 'baseContainer' && obj.name == name})
}