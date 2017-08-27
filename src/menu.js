var dimensions = require('dimensions');
var images = require('img');
var modifier = require('modifier');
var createGame = require('game');
var ctx = require('canvas').ctx;

var setModule = null;

function randomColor() {
  var r = Math.floor(Math.random()*255);
  var g = Math.floor(Math.random()*255);
  var b = Math.floor(Math.random()*255);

  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

function newGitte() {
  return {
    x: Math.random()*(dimensions.cW-100) + 50,
    y: Math.random()*(dimensions.cH-100) + 50,
    vX: Math.random()*500 - 250,
    vY: Math.random()*500 - 250,
  }
}

function conti() {
  setModule(createGame(setModule));

  window.removeEventListener('click', conti, false);
}

function menu(onSetModule) {
  setModule = onSetModule;

  var a = 0;

  var list = [
    newGitte(),
    newGitte(),
    newGitte(),
    newGitte(),
    newGitte(),
    newGitte(),
    newGitte(),
  ];

  window.addEventListener('click', conti, false);

  function loop() {
    ctx.drawImage(images.bg, 0, 0, dimensions.cW, dimensions.cH);
    
    a += 0.1;

    list.forEach(function (gitte) {
      gitte.x += gitte.vX*modifier;
      gitte.y += gitte.vY*modifier;

      if (gitte.x > dimensions.cW || gitte.x < 0) {
        gitte.vX *= -1;
      }
      if (gitte.y > dimensions.cH || gitte.y < 0) {
        gitte.vY *= -1;
      }

      ctx.save();
      ctx.translate(gitte.x, gitte.y);
      ctx.rotate(a);
      ctx.drawImage(images.gitte, -100, -100, 200, 200);
      ctx.restore();
    });
    
    ctx.fillStyle = 'rgba(50, 50, 50, 0.3)';
    ctx.fillRect(0, 0, dimensions.cW, dimensions.cH);
    
    ctx.fillStyle = randomColor();
    ctx.font = '130px Geo';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Gitte Pong!!', dimensions.cW/2, dimensions.cH*0.4 + Math.sin(a)*100);
        
    ctx.fillStyle = 'white';
    ctx.font = '100px Geo';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('rysCode.dk', dimensions.cW/2, dimensions.cH*0.8 - Math.sin(a*0.8)*20);
    ctx.font = '50px Geo';
    ctx.fillText('Klik for at fortsætte', dimensions.cW/2, dimensions.cH - 50);
  }

  return {
    loop,
  }
}

module.exports = menu;