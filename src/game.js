var Player = require('player');
var Opponent = require('opponent');
var Ball = require('ball');
var touch = require('touch');
var dimensions = require('dimensions');
var images = require('img');
var createWin = require('win');
var ctx = require('canvas').ctx;

var setModule = null;

function win() {
  setModule(createWin(setModule));
}

function game(onSetModule) {

  setModule = onSetModule;

  var player, opponent, ball;

  function setup() {
    player = new Player();
    opponent = new Opponent();
    ball = new Ball();
  }

  function loop() {
    var touchX = touch.position.x;
    if (touchX) {

      if (player.x + player.w/2 < touchX) {
        player.moveRight();
      }

      if (player.x + player.w/2 > touchX) {
        player.moveLeft();
      }
    }

    // Collision
    if (ball.x <= player.x + player.w && ball.x + ball.w >= player.x
        && ball.y + ball.h >= player.y && ball.y <= player.y + player.h
    ) {
      var bX = ball.x + ball.w/2;
      if (bX < player.x + player.w/3) {
        ball.shoot(-1, -1);
      }
      if (bX > player.x + player.w/3 && bX < player.x + player.w/3*2) {
        ball.shoot(0, -1);
      }
      if (bX > player.x + player.w/3*2) {
        ball.shoot(1, -1);
      }
    }

    if (ball.x <= opponent.x + opponent.w && ball.x + ball.w >= opponent.x
        && ball.y >= opponent.y && ball.y <= opponent.y + opponent.h
    ) {
      opponent.newOffset();
      var bX = ball.x + ball.w/2;
      if (bX < opponent.x + opponent.w/3) {
        ball.shoot(-1, 1);
      }
      if (bX > opponent.x + opponent.w/3 && bX < opponent.x + opponent.w/3*2) {
        ball.shoot(0, 1);
      }
      if (bX > opponent.x + opponent.w/3*2) {
        ball.shoot(1, 1);
      }
    }

    // Win or lose
    if (ball.y + ball.h < 0) {
      player.score++;
      ball.reset();

    } else if (ball.y > dimensions.cH) {
      if (Math.abs(ball.vY) > 200) opponent.score++;
      ball.reset();
    }

    if (player.score >= 3) {
      win();
    }

    ball.move();

    opponent.moveToBall(ball.x + ball.w/2, ball.y);

    ctx.drawImage(images.bg, 0, 0, dimensions.cW, dimensions.cH);

    ctx.fillStyle = 'white';
    ctx.font = '80px Geo';
    ctx.fillText(opponent.score, dimensions.cW-50, dimensions.cH/2 - 50);
    ctx.fillText(player.score, dimensions.cW-50, dimensions.cH/2 + 50);

    player.draw();
    opponent.draw();
    ball.draw();
  }

  setup();

  return {
    setup,
    loop,
    getData: function () {
      return {
        player,
        opponent,
        ball
      };
    }
  };

}

module.exports = game;