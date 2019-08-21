document.addEventListener('DOMContentLoaded', start);

function start() {
  time();
  var defaultText = '#eeeeee';
  var defaultBackground = '#333333';
  var defaultFont = 'sans-serif';
  chrome.storage.sync.get({
    background: defaultBackground,
    text: defaultText,
    font: defaultFont
  }, function(items) {
    document.querySelector('body').style.color=items.text;
    document.querySelector('body').style.backgroundColor = items.background;
    document.querySelector('body').style.fontFamily = items.font;
  });
}

function time() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  h = checkTime(h);
  m = checkTime(m);
  hm = h + ':' + m;
  var _time = document.getElementById('time');
  if(_time.innerText != hm )
    _time.innerHTML = hm;
  var t = setTimeout(time, 500);
}

function checkTime(i) {
  if (i < 10) {i = '0' + i;}
  return i;
}
