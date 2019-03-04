document.addEventListener('DOMContentLoaded', start);

function start() {
  time();
  var defaultText = '#eee';
  var defaultBackground = '#333';
  chrome.storage.sync.get({
    background: defaultBackground,
    text: defaultText
  }, function(items) {
    document.querySelector('body').style.color=items.text;
    document.querySelector('body').style.backgroundColor = items.background;
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
