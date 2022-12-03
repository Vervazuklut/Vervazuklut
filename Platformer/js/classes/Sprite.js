class Sprite {
    constructor({position,Imagesrc}){
        this.position = position
        this.image = new Image()
        this.image.onload = () => {
            this.loaded = false
        }
        this.image.src = Imagesrc
        this.loaded = true
    }
    draw(){
        if (!this.loaded) return c.drawImage(this.image,this.position.x,this.position.y)
    }
}