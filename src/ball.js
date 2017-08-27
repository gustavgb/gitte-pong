var dimensions = require('dimensions');
var modifier = require('modifier');
var images = require('img');
var ctx = require('canvas').ctx;

class Ball {
  constructor() {
    this.w = 80;
    this.h = 80;

    this.x = dimensions.cW / 2 - this.w / 2;
    this.y = dimensions.cH / 2 - this.h / 2;

    this.vX = 100;
    this.vY = 200;
  }

  draw() {
    ctx.drawImage(images.gitte, this.x, this.y, this.w, this.h);
  }

  move() {
    this.x += this.vX * modifier;
    this.y += this.vY * modifier;

    if (this.x + this.w > dimensions.cW && this.vX > 0) {
      this.vX *= -1;
    }
    if (this.x < 0 && this.vX < 0) {
      this.vX *= -1;
    }
  }

  shoot(relX, relY) {
    this.vX = 200 * (Math.random()*0.5 + 0.5) * relX;
    this.vY = 350 * relY;
  }

  reset() {
    this.x = dimensions.cW / 2 - this.w / 2;
    this.y = dimensions.cH / 2 - this.h / 2;

    this.vX = 100;
    this.vY = 200;
  }
}

module.exports = Ball;
