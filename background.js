var extension_url = chrome.runtime.getURL("index.html");
function isOptionsUrl(url) {
  if(url == extension_url) {
    return true;
  }
  return false;
}
// Find options page in all opened tabs
function goToOptions() {
  chrome.tabs.query({ currentWindow: true }, function(tabs) {
    for (var i = 0, tab; tab = tabs[i]; i++) {
      if (tab.url && isOptionsUrl(tab.url)) {
        chrome.tabs.update(tab.id, {active: true});
        return;
      }
    }
    chrome.tabs.create({url: extension_url});
  });
}
// Called when the user clicks on the browser action.
chrome.action.onClicked.addListener(function(tab) {
  goToOptions();
});