class UIButton extends baseUIElement {
    constructor(x,y,w,h,container,colour,text,textStyle,onClickFunc) {
        super(x,y,w,h,container)
        this.name = 'Button'
        this.colour = colour
        this.text = text
        this.textStyle = textStyle
        this.onClick = onClickFunc
        this.obj = this.createButton()
    }

    createButton() {

        //button bg
        let bE = new PIXI.Sprite(PIXI.Texture.WHITE)
        bE.tint = this.colour
        bE.x = this.x
        bE.y = this.y
        bE.width = this.width
        bE.height = this.height
        bE.interactive = true
        bE.buttonMode = true
        this.container.addChild(bE)

        //button text
        let btE = new PIXI.Text(this.text,this.textStyle)
        btE.tint = 0x000000
        btE.x = this.x + (this.width/2)
        btE.y = this.y + (this.height/2)
        btE.anchor.set(0.5,0.7)
        //btE.width = this.width
        //btE.height = this.height
        this.container.addChild(btE)
        bE.textObj = btE
        bE.parentObj = this.parentObj



        return bE
    }


    // onClick() {
    //     this.visible = false
    //     this.textObj.visible = false
    //     this.parentObj.visible = false
    // }

    

}