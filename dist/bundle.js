/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var canvas = document.getElementById('can');
var ctx = canvas.getContext('2d');
var dimensions = __webpack_require__(1);
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
  cW: 600,
  cH: 1000,
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Player = __webpack_require__(5);
var Opponent = __webpack_require__(8);
var Ball = __webpack_require__(9);
var touch = __webpack_require__(6);
var dimensions = __webpack_require__(1);
var images = __webpack_require__(10);
var createWin = __webpack_require__(14);
var ctx = __webpack_require__(0).ctx;

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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var createMenu = __webpack_require__(12);
var dimensions = __webpack_require__(1);
var module = __webpack_require__(11);
var cW = dimensions.cW;
var cH = dimensions.cH;

var canvas = __webpack_require__(0);

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

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = 1/60;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var dimensions = __webpack_require__(1);
var canvas = __webpack_require__(0);
var modifier = __webpack_require__(4);
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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__(7);
var canvas = __webpack_require__(0);
var dimensions = __webpack_require__(1);

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

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

module.exports = {
  isMobile: mobile,
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var dimensions = __webpack_require__(1);
var canvas = __webpack_require__(0);
var modifier = __webpack_require__(4);
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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dimensions = __webpack_require__(1);
var modifier = __webpack_require__(4);
var images = __webpack_require__(10);
var ctx = __webpack_require__(0).ctx;

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


/***/ }),
/* 10 */
/***/ (function(module, exports) {

var images = {};

function addImage(path, name) {
  var img = new Image();
  img.src = path;

  images[name] = img;
}

addImage('images/gitte.png', 'gitte');
addImage('images/bg.png', 'bg');

module.exports = images;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

var data = {
  currentModule: null,
};

function setModule(m) {
  data.currentModule = window.module = m;
}

module.exports = {
  data,
  setModule,
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var dimensions = __webpack_require__(1);
var images = __webpack_require__(10);
var modifier = __webpack_require__(4);
var createGame = __webpack_require__(2);
var ctx = __webpack_require__(0).ctx;

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

/***/ }),
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var dimensions = __webpack_require__(1);
var images = __webpack_require__(10);
var modifier = __webpack_require__(4);
var createGame = __webpack_require__(12);
var ctx = __webpack_require__(0).ctx;

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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map