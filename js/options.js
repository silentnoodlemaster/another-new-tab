function update() {
  chrome.storage.sync.set({
    background: background.value,
    text: text.value,
    font: font.value
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
  font.value = defaultFont;
  var status = document.getElementById('status');
    status.textContent = 'Remember to click save.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
}

function previewFont() {
  document.getElementById("font-preview").style.fontFamily=font.value;
}

function startup() {
  background = document.getElementById("background");
  text = document.getElementById("text");
  font = document.getElementById("font");
  save = document.getElementById("save");
  loadDefault = document.getElementById("reset");
  font.addEventListener("input", previewFont);
  chrome.storage.sync.get({
    background: defaultBackground,
    text: defaultText,
    font: defaultFont
  }, function(items) {
    background.value = items.background;
    text.value = items.text;
    font.value = items.font;
    save.addEventListener("click", update);
    loadDefault.addEventListener("click", reset);
  });
}
var defaultText = "#eeeeee";
var defaultBackground = "#333333";
var defaultFont = 'sans-serif';
document.addEventListener("DOMContentLoaded", startup, false);
