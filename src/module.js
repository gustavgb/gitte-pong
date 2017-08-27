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