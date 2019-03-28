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

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function getIeColor(color) {
  if (/^#[0-9,a-f,A-F]+$/.test(color)){
    return color
  }
  if (/^rgba?\(/.test(color)){
    const rgb = (color.match(/^rgba?\((\d+)\s?,\s?(\d+)\s?,\s?(\d+).*\)/) || []).slice(1,4)
    return rgbToHex.apply(null, rgb)
  }
}

function setShadow(_ref) {
  var left = _ref.left,
      top = _ref.top,
      blur = _ref.blur,
      color = _ref.color;
  var filter = "drop-shadow(" + left + "px " + top + "px " + blur + "px " + color + ")";
  var msFilter = "progid:DXImageTransform.Microsoft.Dropshadow(OffX=" + left + ", OffY=" + top + ", Color='" + getIeColor(color) + "')";

  svg.style.filter = filter;
  circle.style.filter = filter;
}