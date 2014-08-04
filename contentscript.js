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
var business_name_q = business_name.replace(' ', '%20');
fs_url = fs_url.concat("q=" + business_name_q);
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
  		businesses = val;	// will be [] if none found, otherwise [{"address": "asdf", "name": "asdf"}, {"address2": "asdf"}]
  	}
  });
  // var business1 = businesses[0];
  // $.each(business1, function(key, val) {
    // console.log(key + ": " + val);
  // });
  match = businesses[0]["name"];
  match = match.toLowerCase().trim();
  business_name = business_name.toLowerCase().trim();

  if ((businesses.length > 0) && (match == business_name)) {   
    injectBanner();
  }
  else {
    injectOtherBanner();
  }
});

function injectBanner(bus_name) {
  // alert(bus_name + " is a FiveStars location!");

  // add montserrat and typekit
  $.get(chrome.extension.getURL('banner-styling.html'), function(data) {
    $(data).appendTo('head');
    console.log("successfully injected banner styling");
    // Or if you're using jQuery 1.8+:
    // $($.parseHTML(data)).appendTo('body');
  });

  $.get(chrome.extension.getURL('banner.html'), function(data) {
    $(data).insertAfter('.app-header');
  });

  // add FS-banner and FS-banner styling
  /* 
  var s = document.createElement('script');
  s.src = chrome.extension.getURL('banner.js');
  s.onload = function() {
      this.parentNode.removeChild(this);
  };
  (document.head||document.documentElement).appendChild(s);
  */

}

function injectOtherBanner() {
  // alert(bus_name + " is not a FiveStars location! Request it here");

 // add montserrat and typekit
  $.get(chrome.extension.getURL('banner-styling.html'), function(data) {
    $(data).appendTo('head');
  });

   $.get(chrome.extension.getURL('otherbanner.html'), function(data) {
    $(data).insertAfter('.app-header');
  });

}

function loadImageIntoBanner() {
  $(document).ready(function(){
    var logo_url = chrome.extension.getURL('fivestars_logo_login_white.png'); 
    console.log(logo_url);
    $("#FS-banner").append("<img src='" + logo_url + "'></img>");
  });
}




