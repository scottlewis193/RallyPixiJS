class UIProgressBar extends baseUIElement {
    constructor(x,y,w,h,container,colour) {
        super(x,y,w,h,container)
        this.name = 'ProgressBar'
        this.colour = colour
        this.obj = this.createProgressBar()
    }

    createProgressBar() {
        let pbE = new PIXI.Sprite(PIXI.Texture.WHITE)
        pbE.tint = this.colour
        pbE.x = this.x
        pbE.y = this.y
        pbE.width = this.width
        pbE.height = this.height
        this.container.addChild(pbE)
        return pbE
    }
}