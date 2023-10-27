class baseCar extends PIXI.Sprite {
    constructor(ai,colour,texture) {
        let nTex = PIXI.Texture.from('cars/Car.png')
        super(texture = nTex)

        this.anchor.set(0.5)
        //playerCarFWheel.anchor.set(0)
        //playerCarBWheel.anchor.set(-0.75)
        this.name = 'baseCar'
        this.drawLayer = 1
        this.ai = ai
        this.tint = colour
        this.aiTurnLeft = 0
        this.aiTurnRight = 0
        this.aiTargetAngle = 0
        

        this.x = app.screen.width / 2;
        this.y = app.screen.height / 2;
        this.oldworldX = 0;
        this.oldworldY = 0;
        this.worldX = 0;
        this.worldY = 0;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.power = 0;
        this.reverse = 0;
        this.angleR = 0;
        this.angularVelocity = 0;
        this.isThrottling = false;
        this.isReversing = false;
        this.isDrifting = function() {
            return (Math.abs(this.angularVelocity*100) > 2) ? true : false
        }
        this.isTurningLeft = false;
        this.isTurningRight = false;
        this.speed = 0;
        
        this.width = 18 * appWindow.resolution
        this.height = 31.2 * appWindow.resolution
    
        this.absAngle = 0
        this.posAngle = 0

        this.smContainer = new baseContainer(0,0,appWindow.width,appWindow.height,'smContainer');
    
    
        //constants
    
        //defaults
        // this.maxPower = 0.075;
        // this.maxReverse = 0.0375;
        // this.powerFactor = 0.001;
        // this.reverseFactor = 0.0005;
    
        // this.drag = 0.95;
        // this.angularDrag = 0.95;
        // this.turnSpeed = 0.002;
    
        this.maxPower = 0.30;
        this.maxReverse = 0.0375;
        this.powerFactor = 0.002;
        this.reverseFactor = 0.0005;
    
        this.drag = 0.95;
        this.angularDrag = 0.94;
        this.turnSpeed = 0.002;

        carsList.push(this)
        app.stage.addChild(this)
}


update(delta) {
    this.processPhysics(delta);
    this.drawSkidMarks();

}

processPhysics(delta) {

    this.oldworldX = this.worldX;
    this.oldworldY = this.worldY;

    this.getInput()
    if (this.ai) {
        this.calculateAngleBasedOnTarget();
    }
    this.calculateSteering(delta)

   

}



getInput() {

   let changed = false

    let canTurn 
    //if (this.ai) {
        //canTurn = 1
    //} else { 
    canTurn = this.power > 0.0025 || this.reverse;
    //}



    let throttle
    let reverse
    let turnLeft
    let turnRight

    if (this.ai) {

    let angleDiff = Math.abs(this.aiTargetAngle - this.absAngle)

    reverse = 1 - (angleDiff / 180)
    throttle = 1 - reverse
 
    

    }else{   
    throttle = Math.round(controls.up * 10) / 10;
    reverse = Math.round(controls.down * 10) / 10;
    }

    if (this.isThrottling !== throttle || this.isReversing !== reverse) {
    changed = true;
    this.isThrottling = throttle;
    this.isReversing = reverse;
    }

    if (this.ai) {
    turnLeft = canTurn && Math.round(this.aiTurnLeft * 10) / 10;
    turnRight = canTurn && Math.round(this.aiTurnRight * 10) / 10;
    }else{
    turnLeft = canTurn && Math.round(controls.left * 10) / 10;
    turnRight = canTurn && Math.round(controls.right * 10) / 10;
    }

    if (this.isTurningLeft !== turnLeft) {
    changed = true;
    this.isTurningLeft = turnLeft;
    }
    if (this.isTurningRight !== turnRight) {
    changed = true;
    this.isTurningRight = turnRight;
    }

    // if (this.x > appWindow.width + 7.5) {
    // this.x -= appWindow.width + 15;
    // changed = true;
    // } else if (this.x < -7.5) {
    // this.x += appWindow.width + 15;
    // changed = true;
    // }

    // if (this.y > appWindow.height + 7.5) {
    // this.y -= appWindow.height + 15;
    // changed = true;
    // } else if (this.y < -7.5) {
    // this.y += appWindow.height + 15;
    // changed = true;
    // }

}

calculateSteering(dt) {

    if (this.isThrottling) {
        this.power += this.powerFactor * this.isThrottling;
        } else {
        this.power -= this.powerFactor;
        }
        if (this.isReversing) {
        this.reverse += this.reverseFactor;
        } else {
        this.reverse -= this.reverseFactor;
        }

        this.power = Math.max(0, Math.min(this.maxPower, this.power));
        this.reverse = Math.max(0, Math.min(this.maxReverse, this.reverse));

        const direction = this.power > this.reverse ? 1 : -1;

        if (this.isTurningLeft) {

        this.angularVelocity -= direction * this.turnSpeed * this.isTurningLeft;
        }
        if (this.isTurningRight) {
        this.angularVelocity += direction * this.turnSpeed * this.isTurningRight;
        }


    let _xV = Math.sin(this.angleR) * (this.power - this.reverse) 
    let _yV = Math.cos(this.angleR) * (this.power - this.reverse)   
    this.xVelocity += _xV;
    this.yVelocity += _yV;

    //this.x += this.xVelocity;
    //this.y -= this.yVelocity;

        this.worldX += (this.xVelocity);
        this.worldY -= (this.yVelocity);
    //}

    if (this.ai) {
        this.x = this.worldX+(appWindow.width/2)-(playerCar.worldX)
        this.y = this.worldY+(appWindow.height/2)-(playerCar.worldY)
        this.smContainer.x = -(playerCar.worldX)
        this.smContainer.y = -(playerCar.worldY)
    } else {
        this.smContainer.x = -this.worldX   //getNewGlobalPos({x: this.smContainer.x, y: this.smContainer.y}).x
        this.smContainer.y = -this.worldY
    }

    this.xVelocity *= this.drag;
    this.yVelocity *= this.drag;
    this.angleR += this.angularVelocity;
    this.angularVelocity *= this.angularDrag;


    this.angle = this.angleR * 180/Math.PI 

    this.speed = (this.power !== 0) ? Math.floor(this.power*100) : -Math.floor(this.reverse*100)

    let absAngleDiv = Math.floor(this.angle/360)
    let absAngleOver = (Math.abs(this.angle)<360) ? 0 : 360 * absAngleDiv
    this.absAngle = (Math.floor(this.angle)) - absAngleOver

    if (this.absAngle < -300) {this.absAngle = Math.abs(this.absAngle)}
    
    let posAnglePos = (this.angle<0) ? (this.angle + (360 * (Math.floor(Math.abs(this.angle) / 360))))+ 360  : this.angle - Math.floor(Math.abs(this.angle) / 360)*360
    this.posAngle = Math.floor(posAnglePos)
    //this.angle = this.absAngle

}

drawSkidMarks() {


    if (this.isDrifting()) {

         var dot = PIXI.Sprite.from('cars/CarTyreMarks.png')
        dot.width = this.width
        dot.height = this.height

        dot.anchor.set(0.5)

        dot.angle = this.angle

        dot.position.set(this.worldX+(appWindow.width/2),this.worldY+(appWindow.height/2))
    
        this.smContainer.addChild(dot);
        if (this.smContainer.children.length > 300) {this.smContainer.children.shift()}
        

    }
    


} 

calculateAngleBasedOnTarget() {
 this.aiTargetAngle = this.getAngleForFacingTarget(playerCar.worldX,playerCar.worldY)

this.aiTurnLeft = 0
this.aiTurnRight = 0

if (Math.floor(this.aiTargetAngle) == Math.floor(this.absAngle)) { 
    console.log("match")
    this.aiTurnLeft = 0
    this.aiTurnRight = 0
} else {


    let fulldiff = (this.aiTargetAngle > this.absAngle) ? (360-this.aiTargetAngle)+this.absAngle : (-360-this.aiTargetAngle)+this.absAngle
    let zerodiff = this.aiTargetAngle-this.absAngle

    if (zerodiff <= fulldiff) {this.aiTurnRight = 1} 
    if (fulldiff < zerodiff) {this.aiTurnLeft = 1}

    // if (this.absAngle < this.aiTargetAngle)
    //   if (this.absAngle < this.aiTargetAngle) {this.aiTurnRight = 1}
    // if (this.absAngle > this.aiTargetAngle) {this.aiTurnLeft = 1}

}

} 

getAngleForFacingTarget(tarX,tarY) {

        let angle
    
        let dX = tarX - this.worldX
        let dY = tarY - this.worldY
        angle = rad2deg(Math.atan2(dY,dX))+90 //* (180/Math.PI)

        //adjust for minus values
        if (angle<0) {angle = angle + 360}

    
        //angle = (curAngle<0) ? angle+90 : Math.abs(angle)+90

        //if (angle<0) {angle += 360}

        //angle = 360-Math.abs(angle)

        //if(angle<0){angle = Math.abs(angle)} else if(angle>0) {
        //angle = 360-angle
        //}
    
        //if(angle<0) {angle = 360 + (angle)}
    
        //if(angle>=360){angle = 360-angle}
    
        return angle
    
}


    

}

