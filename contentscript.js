console.log("hi there!");

var business_name = $(".biz-page-title").text().trim();

// atrocious hax to get lat/long
var map_html = $(".lightbox-map").prop('outerHTML').trim();
var lat_index = map_html.indexOf('latitude');
var beg_index = lat_index - 7;
map_html = map_html.slice(beg_index, map_html.length - 1)
var end_index = map_html.indexOf('}');
map_html = map_html.slice(0, end_index + 1);
map_html = map_html.replace(/&(quot);/g,'"');
var map_json = $.parseJSON(map_html);
var business_lat = map_json.latitude;
var business_long = map_json.longitude;

// url manipulation
// http://www.fivestars.com/api/v2/businesses?near=37.7758,-122.4128&span=0.025,0.025&q=little%20griddle
var fs_url = "http://www.fivestars.com/api/v2/businesses?";
var business_name = business_name.replace(' ', '%20');
fs_url = fs_url.concat("q=" + business_name);
fs_url = fs_url.concat("&near=" + business_lat + "," + business_long);
fs_url = fs_url.concat("&span=0.05,0.05");

// ajax post to our api
$.getJSON(fs_url, function( data ) {
  var stuff = "";
  var businesses = "";
  $.each( data, function( key, val ) {
  	if (key == "data") {
  		stuff = val;
  	}
  });
  $.each(stuff, function(key, val) {
  	if (key == "businesses") {
  		businesses = val;	// will be [] if none found, otherwise [{"address": "asdf", "name": "asdf"}]
  	}
  });
  if (businesses.length == 0) {
  	alert("This business is not a FiveStars location. Request it here!");
  }
  else {
    match = businesses[0]["name"];
    injectBanner(match); 
  }
});

function injectBanner(bus_name) {
  alert(bus_name + " is a FiveStars location!");
  // chrome.tabs.onUpdated.addListener(function(tabId, changeInfo,tab) {
    chrome.tabs.executeScript({
      code: 'alert("wooowww2")'
    })
  // });
}




