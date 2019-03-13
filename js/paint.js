var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var curColor = $('#colors').val();
var clickColor = new Array();
var paint;
var height;
var width;

function addClick (x, y, dragging){
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(curColor);
}

function redraw (){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  context.lineJoin = "round";
  context.lineWidth = 5;

  for (var i = 0; i < clickX.length; i++) {
    context.beginPath();
    if (clickDrag[i] && i) {
      context.moveTo(clickX[i-1], clickY[i-1]);
    } else {
      context.moveTo(clickX[i]-1, clickY[i]);
    }
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.strokeStyle = clickColor[i];
    context.stroke();
  }
}

$('#clear').click(function(){
  context.clearRect(0, 0, canvas.width, canvas.height);
})

$('#myCanvas').mousedown(function(e){
  var mouseX = e.page - this.offsetLeft;
  var mouseY = e.page - this.offsetTop;

  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$('#myCanvas').mousemove(function(e){
  if (paint) {
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#myCanvas').mouseup(function(e){
  paint = false;
});
//
// $('#myCanvas').mouseleave(function(e){
//   paint = false;
// });
