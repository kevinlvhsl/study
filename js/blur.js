var canvasHiehgt = 400
var canvasWidth = 400
var clipRadius = 50
var canvas = document.getElementById('canvas')
var cxt = canvas.getContext('2d')
var reset = document.getElementById("reset")
var show = document.getElementById("show")
canvas.height = canvasHiehgt
canvas.width = canvasWidth
var clipParam = getClipParam()
var img = new Image()
img.src = 'zhizuo.png'
img.onload = function (){
    initCanvas(this)
}
function resetf (){
    initCanvas(img)
}
function showf (){
    
    var timer = setInterval(function(){
        if (clipParam.r < 500) {
                draw( img, clipParam)
            clipParam.r += 2
            console.log(clipParam.r)
        }else{
            timer = null
            draw( img, clipParam)
        }
    }, 30)
    
}
reset.onclick = resetf
show.onclick = showf
function random(begin, end){
    return Math.floor(Math.random() * (end - begin) + begin )
}
function getClipParam (){
    return {x: random(clipRadius, canvasWidth - clipRadius), y: random(clipRadius, canvasHiehgt - clipRadius), r: clipRadius}
}
function initCanvas (image){
    clipParam = getClipParam()
    draw( image, clipParam)

}

function setClipRegion (clipParam){
    cxt.beginPath()
    cxt.arc(clipParam.x, clipParam.y, clipParam.r, 0, Math.PI*2, false)
    cxt.clip()
}
function draw (image, clipRegion){
    cxt.clearRect(0,0, canvasWidth, canvasHiehgt)
    cxt.save()
    setClipRegion(clipRegion)
    cxt.drawImage(img, 0 , 0)
    cxt.restore()
}
