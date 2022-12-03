class Player extends Sprite{
    constructor({collisionBlocks = [],Imagesrc}){
        console.log(Imagesrc)
        super({Imagesrc})
        this.position = {
            x:300,
            y:200   
        }
        this.velocity = {
            x:0,
            y:0
        }
        this.gravity = 1
        

        this.width = 25
        this.height = 25
        this.sides = {
            bottom: (this.position.y + this.height)
        }
        this.jumpCounter = 1;
        this.TimeCounter = 0;
        this.keys = {
            a: {
                pressed: false
            },
            d: {
                pressed:false
            }
        }

        this.collisionBlocks = collisionBlocks
    }
    draw () {
        c.fillStyle = 'red'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
    
    update(){
        //horizontal collision
        this.position.x += this.velocity.x
        this.checkForHorizontalCollisions()
        this.applyGravity()
        //vertical collision
        this.checkForVerticalCollisions()
        //be careful of the code below,may cause errors in the future
        this.playerKeys()
    }


    checkForHorizontalCollisions(){
        for (let i = 0;i < this.collisionBlocks.length;i++){
            const collisionBlock = this.collisionBlocks[i]
            if (this.position.x <= collisionBlock.position.x + collisionBlock.width && 
                this.position.x + this.width >= collisionBlock.position.x && 
                this.position.y + this.height >= collisionBlock.position.y && 
                this.position.y <= collisionBlock.position.y + collisionBlock.height){
                // collision on x axis
                //left
                if (this.velocity.x < -0){
                    this.position.x = collisionBlock.position.x + collisionBlock.width+0.01
                    break
                }
                //right
                if (this.velocity.x > 0){
                    this.position.x = collisionBlock.position.x - this.width - 0.01
                    break
                }
            }
        }
    }
    applyGravity(){
        this.position.y += this.velocity.y
        this.velocity.y += this.gravity
        this.TimeCounter += 0.01
        if (this.position.y < 103){
            this.position.y += 128
        }
    }
    checkForVerticalCollisions(){
        for (let i = 0;i < this.collisionBlocks.length;i++){
            const collisionBlock = this.collisionBlocks[i]
            if (this.position.x <= collisionBlock.position.x + collisionBlock.width && 
                this.position.x + this.width >= collisionBlock.position.x && 
                this.position.y + this.height >= collisionBlock.position.y && 
                this.position.y <= collisionBlock.position.y + collisionBlock.height){
                if (this.velocity.y < -0){
                    this.jumpCounter = 101
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y + collisionBlock.height+0.01
                    break
                }
                if (this.velocity.y > 0){
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y - this.height - 0.01
                    this.jumpCounter = 0.1
                    break
                }
                
            }
        }
    }
    playerKeys(){
        window.addEventListener('keydown',(event) =>
        {
            //console.log(event.key) //event.key is the result of event. eg.space =  ' ' while w = 'w'
            if (event.key === 'ArrowUp'||event.key === ' '){ //change jumpCounter to 100 for double jumping
                if (this.jumpCounter <= 100){this.velocity.y = -12.5;this.jumpCounter+=(0.5/this.TimeCounter);}
            }

            if (event.key === 'a' || event.key === "ArrowLeft"){
                this.keys.a.pressed = true
            }
            if (event.key === 'd' || event.key === "ArrowRight"){
                this.keys.d.pressed = true
            }
        }) //addEventListner('Event',(propetites of the event) that will be used in the script after => )
        window.addEventListener('keyup',(event) =>
        {
            if (event.key === 'a' || event.key === "ArrowLeft"){
                this.keys.a.pressed = false
            }
            if (event.key === 'd' || event.key === "ArrowRight"){
                this.keys.d.pressed = false
            }
        }) //addEventListner('Event',(propetites of the event) that will be used in the script after => )
    }
}