var userAgent = require('useragent');
var canvas = require('canvas');
var dimensions = require('dimensions');

var position = {
  x: null,
  y: null,
}

var mouseDown = false;

function setPosition(x, y) {
  var cW = dimensions.cW;
  var cH = dimensions.cH;
  var w = canvas.canvas.width;
  var h = canvas.canvas.height;
  position.x = (x - canvas.offset.x) * (cW/w);
  position.y = (y - canvas.offset.y) * (cH/h);
}

function onTouchStart(e) {
  var data = e.touches[0];
  mouseDown = true;
  setPosition(data.clientX, data.clientY);
}

function onTouchMove(e) {
  if (mouseDown) {
    var data = e.touches[0];
    setPosition(data.clientX, data.clientY);
  }
}

function onTouchEnd() {
  mouseDown = false;
}

function onMouseDown(e) {
  setPosition(e.clientX, e.clientY);
  mouseDown = true;
}

function onMouseMove(e) {
  if (mouseDown) {
    setPosition(e.clientX, e.clientY);
  }
}

function onMouseUp() {
  mouseDown = false;
}

if (userAgent.isMobile) {
  window.addEventListener('touchstart', onTouchStart, false);
  window.addEventListener('touchmove', onTouchMove, false);
  window.addEventListener('touchend', onTouchEnd, false);
} else {
  window.addEventListener('mousedown', onMouseDown, false);
  window.addEventListener('mousemove', onMouseMove, false);
  window.addEventListener('mouseup', onMouseUp, false);
}

module.exports = {
  position: position,
}