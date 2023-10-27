class UILeaderboardItem extends baseUIElement {
    constructor(x,y,w,h,container,text,texture) {
        super(x,y,w,h,container)
        this.name = 'LeaderboardItem'
        this.text = text
        this.texture = texture
        this.textObj = null
        //this.obj = this.createLeaderboardItem()
        //this.textObj = this.createText()
    }

    createLeaderboardItem() {
        let lbE = new PIXI.Sprite(this.texture)
        lbE.x = this.x
        lbE.y = this.y
        lbE.width = this.width
        lbE.height = this.height
        this.container.addChild(lbE)
        return lbE
    }

    createText() {
        let lbEText = new PIXI.Text(this.text,TEXTSTYLES.leaderboardItemText);
        lbEText.x = this.obj.x
        lbEText.y = this.obj.y + (this.obj.height*0.65)
        this.container.addChild(lbEText)
        return lbEText
    }
}