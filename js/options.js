function update() {
  chrome.storage.sync.set({
    background: background.value,
    text: text.value
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function reset() {
  background.value = defaultBackground;
  text.value = defaultText;
  var status = document.getElementById('status');
    status.textContent = 'Remember to click save.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
}

function startup() {
  background = document.getElementById("background");
  text = document.getElementById("text");
  save = document.getElementById("save");
  loadDefault = document.getElementById("reset");
  chrome.storage.sync.get({
    background: defaultBackground,
    text: defaultText
  }, function(items) {
    background.value = items.background;
    text.value = items.text;
    save.addEventListener("click", update);
    loadDefault.addEventListener("click", reset);
  });
}
var defaultText = "#eeeeee";
var defaultBackground = "#333333";
document.addEventListener("DOMContentLoaded", startup, false);
