alert("hello");
var banner_raw_css = '<style>#FS-banner{background-color:#0076B5;text-align:center;}</style>';
var banner_raw_html = '<div id="FS-banner"><h3 style="color:white;">This business is a FiveStars location!</h3></div>';

$("head").append(banner_raw_css);
$(banner_raw_html).insertAfter(".app-header");

/*
$(document).ready(function(){
   $("#banner").load("banner.html");
});
*/