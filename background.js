chrome.tabs.query({active:true, currentWindow:true},function(tabs){
         chrome.tabs.executeScript(null, {file:"banner.js"});
});