var createMenu = require('menu');
var dimensions = require('dimensions');
var module = require('module');
var cW = dimensions.cW;
var cH = dimensions.cH;

var canvas = require('canvas');

canvas.resize();

window.addEventListener('resize', canvas.resize, false);

var running = false;

function setup() {
  module.setModule(createMenu(module.setModule));

  running = true;

  main();
}

function main() {
  requestAnimationFrame(main);

  if (running) {
    module.data.currentModule.loop();
  }
}

window.onload = setup();