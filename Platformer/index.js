const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d') //c is context
canvas.width = 1024
canvas.height = 1024/16*9
const backgroundLevel1 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    Imagesrc: './img/backgroundLevel1.png'
})
// if code looks difficult to process (like after some time if u look at it again its difficult to read),refractor the code
const parsedCollisions = collisionsLevel1.parse2D()
const collisionBlocks = parsedCollisions.createObjectsFrom2D()

const player = new Player({collisionBlocks: collisionBlocks,Imagesrc: 'idle.png'})

function animate(){
    window.requestAnimationFrame(animate)

    backgroundLevel1.draw()

    collisionBlocks.forEach((collisionBlock) => {
        collisionBlock.draw()
    })
    player.velocity.x = 0
    if (player.keys.d.pressed){
        player.velocity.x = 5
    }
    if (player.keys.a.pressed){
        player.velocity.x = -5
    }
    player.draw()
    player.update()
}
animate()