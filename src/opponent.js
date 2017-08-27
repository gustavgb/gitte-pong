var dimensions = require('dimensions');
var canvas = require('canvas');
var modifier = require('modifier');
var ctx = canvas.ctx;

class Opponent {
  constructor() {
    this.w = 150;
    this.h = 30;
    this.x = dimensions.cW/2 - this.w/2;
    this.y = 70;

    this.speed = 150;

    this.ballOffset = 0;

    this.score = 0;
  }

  draw() {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  newOffset() {
    this.ballOffset = Math.sin(Math.random() * Math.PI) * 75;
  }

  moveLeft() {
    this.x -= this.speed * modifier;
  }

  moveRight() {
    this.x += this.speed * modifier;
  }

  moveToBall(ballX, ballY) {
    if (ballY < dimensions.cH*0.5) {
      if (this.x + this.w/2 < ballX + this.ballOffset) {
        this.moveRight();
      }

      if (this.x + this.w/2 > ballX + this.ballOffset) {
        this.moveLeft();
      }
    }
  }
}

module.exports = Opponent;