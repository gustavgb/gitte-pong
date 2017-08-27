var dimensions = require('dimensions');
var canvas = require('canvas');
var modifier = require('modifier');
var ctx = canvas.ctx;

class Player {
  constructor() {
    this.w = 150;
    this.h = 30;
    this.x = dimensions.cW/2 - this.w/2;
    this.y = dimensions.cH - this.h - 70;

    this.speed = 150;

    this.score = 0;
  }

  draw() {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  moveLeft() {
    this.x -= this.speed * modifier;
  }

  moveRight() {
    this.x += this.speed * modifier;
  }
}

module.exports = Player;
