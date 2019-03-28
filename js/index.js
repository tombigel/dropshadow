"use strict";

var params = {
  left: 10,
  top: 10,
  blur: 10,
  color: 'rgba(0, 0, 0, .5)'
};

controls.querySelectorAll('input').forEach(function (input) {
  var name = input.getAttribute('name');
  input.addEventListener('change', function (event) {
    return setParam(name, event.target.value);
  });
  input.value = params[name];
  setShadow(params);
});

function setParam(key, val) {
  params[key] = val;
  setShadow(params);
}

function setShadow(_ref) {
  var left = _ref.left,
      top = _ref.top,
      blur = _ref.blur,
      color = _ref.color;
  var filter = "drop-shadow(" + left + "px " + top + "px " + blur + "px " + color + ")";

  svg.style.filter = filter;
  circle.style.filter = filter;
}