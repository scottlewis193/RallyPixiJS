class UITileSelectionPage extends baseUIElement {
    constructor(x,y,w,h,container,texture,colour) {
        super(x,y,w,h,container)
        this.name = 'TileSelection'
        this.colour = colour
        this.texture = texture
        this._selected = false
        this.selected = false

        this.obj = this.createTileSelection()

    }

    get selected() {
        return this._selected
      }
    
    set selected(value) {
        this.colour = (value) ? 0xFFFF00 : 0x000000
        this._text = value
    }

createTileSelection() {
    let tsSqrE = new PIXI.Sprite.from(PIXI.texture.WHITE)
    tsSqrE.x = this.x
    tsSqrE.y = this.y
    tsSqrE.width = this.width
    tsSqrE.height = this.height
    this.container.addChild(tsSqrE)
    
    
    let tsE = new PIXI.Sprite.from(this.texture)
    tsE.x = this.x
    tsE.y = this.y
    tsE.width = this.width
    tsE.height = this.height
    this.container.addChild(tsE)

    

    return tsE
}

}