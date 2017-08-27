var canvas = document.getElementById('can');
var ctx = canvas.getContext('2d');
var dimensions = require('dimensions');
var cW = dimensions.cW;
var cH = dimensions.cH;

var offset = {
  x: 0,
  y: 0,
}

function resizeCanvas() {
  var width = window.innerWidth;
  var height = window.innerHeight;

  if (width > height * (cW/cH)) {
    width = height * (cW/cH);
  } else if (height > width * (cH/cW)) {
    height = width * (cH/cW);
  }

  canvas.width = width;
  canvas.height = height;

  ctx.scale(canvas.width/cW, canvas.height/cH);

  offset.x = (window.innerWidth - width) / 2;
  offset.y = (window.innerHeight - height) / 2;

  canvas.style.marginLeft = offset.x + 'px';
  canvas.style.marginTop = offset.y + 'px';
}

module.exports = {
  canvas: canvas,
  ctx: ctx,
  resize: resizeCanvas,
  offset: offset,
};
