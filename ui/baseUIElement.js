class baseUIElement {
    constructor(x,y,w,h,container='uiContainer') {
        this.name = 'basic'
        this.x = x
        this.y = y
        this.width = w
        this.height = h
        this.container = (typeof container === 'object') ? container : getContainerfromName(container)
    }

 

    

 }

 