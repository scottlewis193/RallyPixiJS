class UIText extends baseUIElement {
    constructor(x,y,container,text,textStyle) {
        super(x,y,container)
        this.name = 'Text'
        this.text = text
        this._text = text
        this.textStyle = textStyle
        this.obj = this.createText()
    }

    get text() {
        if (this.obj == null) {
        return this._text
        }
        return this.obj.text;
        
      }
    
    set text(value) {
        if (this.obj == null) {
        this._text = value
        return
        }

        this.obj.text = value;
        
    }

    createText() {
        let eText = new PIXI.Text(this.text,this.textStyle);
        eText.x = this.x
        eText.y = this.y
        this.container.addChild(eText)
        return eText
    }

    updateText() {

    }
}