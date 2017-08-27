var images = {};

function addImage(path, name) {
  var img = new Image();
  img.src = path;

  images[name] = img;
}

addImage('images/gitte.png', 'gitte');
addImage('images/bg.png', 'bg');

module.exports = images;