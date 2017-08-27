var dimensions = require('dimensions');
var images = require('img');
var modifier = require('modifier');
var createGame = require('menu');
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

  setTimeout(function () {
    window.addEventListener('click', conti, false);
  }, 5000);

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

    ctx.fillStyle = 'rgba(50, 50, 50, 0.5)';
    ctx.fillRect(0, 0, dimensions.cW, dimensions.cH);
    
    ctx.fillStyle = randomColor();
    ctx.font = '130px Geo';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Du vandt!!', dimensions.cW/2, dimensions.cH*0.13 + Math.sin(a)*50);
    
    ctx.fillStyle = 'white';
    ctx.font = '50px Geo';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('Det her spil er lavet af den', dimensions.cW/2, dimensions.cH*0.2 + 80);
    ctx.fillText('nye programmeringsklub på', dimensions.cW/2, dimensions.cH*0.2 + 130);
    ctx.fillText('Rysensteen! Vi kalder os', dimensions.cW/2, dimensions.cH*0.2 + 180);
    ctx.font = '70px Geo';
    ctx.fillText('rysCode', dimensions.cW/2, dimensions.cH*0.2 + 230);
    ctx.font = '50px Geo';
    ctx.fillText('Hvis du kan noget med com-', dimensions.cW/2, dimensions.cH*0.2 + 300);
    ctx.fillText('puter, eller bare synes det', dimensions.cW/2, dimensions.cH*0.2 + 350);
    ctx.fillText('er mega fedt, så kom og', dimensions.cW/2, dimensions.cH*0.2 + 400);
    ctx.fillText('vær med! Find os på:', dimensions.cW/2, dimensions.cH*0.2 + 450);
        
    ctx.fillStyle = 'yellow';
    ctx.font = '100px Geo';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('rysCode.dk', dimensions.cW/2, dimensions.cH*0.8 - Math.sin(a*0.8)*20);
    if (a > 20) {
      ctx.fillStyle = 'white';
      ctx.font = '30px Geo';
      ctx.fillText('Klik for at prøve igen', dimensions.cW/2, dimensions.cH - 50);
    }
  }

  return {
    loop,
  }
}

module.exports = menu;