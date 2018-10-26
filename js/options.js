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
function startup() {
  background = document.querySelector("#background");
  text = document.querySelector("#text");
  chrome.storage.sync.get({
    background: defaultBackground,
    text: defaultText
  }, function(items) {
    background.value = items.background;
    text.value = items.text;
    background.addEventListener("change", update);
    text.addEventListener("change", update);
  });
}
var defaultText = "#eee";
var defaultBackground = "#333";
document.addEventListener("DOMContentLoaded", startup, false);
