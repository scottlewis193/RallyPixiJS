class baseContainer extends PIXI.Container {
    constructor(x,y,width,height,name) {
        super(x=x,y=y,
        width = width,
        height = height)
        this.name = name
        app.stage.addChild(this)
    }


 }
