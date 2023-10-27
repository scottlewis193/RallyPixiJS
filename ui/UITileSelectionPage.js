class UITileSelectionPage extends baseUIElement {
    constructor(x,y,w,h,container,colour,text,textStyle) {
        super(x,y,w,h,container)
        this.name = 'TileSelectionPage'
        this.colour = colour
        this.text = text
        this.textStyle = textStyle
        this.obj = this.createTileSelectionPage()
        this.objCloseBtn = this.createExitButton(this.obj)
        this.objTiles = this.createTilesSelections()
    }

    createTileSelectionPage() {
        let tsE = new PIXI.Sprite(PIXI.Texture.WHITE)
        tsE.tint = this.colour
        tsE.x = this.x
        tsE.y = this.y
        tsE.width = this.width
        tsE.height = this.height
        this.container.addChild(tsE)
        return tsE
    }

    createExitButton(parentObj) {
        let btnW = 25
        let btnH = 25
        let btnX = appWindow.width - btnW
        let btnY = 0
        let btn = UI.createUIButton(btnX,btnY,btnW,btnH,this.container,0xffffff,'X',TEXTSTYLES.debugText)
        btn.onClick = function() {btn.obj.visible = false; btn.obj.textObj.visible = false; parentObj.visible = false;}
        btn.obj.on('pointerdown', btn.onClick);
        return btn
    }

    createTilesSelections() {

        'work out amount of space for each tile selection'
        'to do'

        TILES.items.forEach(tile => {
            let tileSelect = new UITileSelectionPage()
        })
    }
}