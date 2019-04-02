"use strict";

var svgShadow = document.getElementById('svgShadow');
var params = {
  left: 0,
  top: 0,
  blur: 0,
  red: 0,
  green: 0,
  blue: 0,
  opacity: 1
};

function setFilterDimensions() {
  var maxOffset = 20;
  var maxBlur = 80;
  var filter = svgShadow.querySelector('filter');

  var _svgShadow$getAttribu = svgShadow.getAttribute('viewBox').split(' ').map(parseFloat),
      x = _svgShadow$getAttribu[0],
      y = _svgShadow$getAttribu[1],
      width = _svgShadow$getAttribu[2],
      height = _svgShadow$getAttribu[3];

  filter.setAttribute('x', x - maxOffset - maxBlur);
  filter.setAttribute('y', y - maxOffset - maxBlur);
  filter.setAttribute('width', width + (maxOffset + maxBlur) * 2);
  filter.setAttribute('height', height + (maxOffset + maxBlur) * 2);
}

function setParam(key, val) {
  params[key] = val;
  setShadow(params);
}

function setShadow(_ref) {
  var left = _ref.left,
      top = _ref.top,
      blur = _ref.blur,
      red = _ref.red,
      green = _ref.green,
      blue = _ref.blue,
      opacity = _ref.opacity;
  //const filter = `drop-shadow(${left}px ${top}px ${blur}px ${color})`
  //svg.style.filter = filter
  setSvgShadow(svgShadow, {
    left: left,
    top: top,
    blur: blur,
    red: red,
    green: green,
    blue: blue,
    opacity: opacity
  });
}

function setSvgShadow(svgElement, _ref2) {
  var left = _ref2.left,
      top = _ref2.top,
      blur = _ref2.blur,
      red = _ref2.red,
      green = _ref2.green,
      blue = _ref2.blue,
      opacity = _ref2.opacity;
  var gBlur = svgElement.querySelector('feGaussianBlur');
  var mColor = svgElement.querySelector('feColorMatrix');
  var offset = svgElement.querySelector('feOffset');
  gBlur.setAttribute('stdDeviation', blur);
  offset.setAttribute('dx', left);
  offset.setAttribute('dy', top);
  mColor.setAttribute('values', "0 0 0 0 " + red + "   0 0 0 0 " + green + "   0 0 0 0 " + blue + "  0 0 0 " + opacity + " 0");
}

setFilterDimensions();
controls.querySelectorAll('input').forEach(function (input) {
  var name = input.getAttribute('name');
  input.addEventListener('change', function (event) {
    return setParam(name, event.target.value);
  });
  input.value = params[name];
  setShadow(params);
});