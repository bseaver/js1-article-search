var Search = require('./../js/backend/search.js').searchModule;
var searchSample = require('./../js/backend/search_sample.js').searchResultSample;

var displayResults = function(searchResult) {
  console.log(searchResult);
  // Handle copyright and error
  // Loop through resonse:docs
  //  headline:main link to web_url
  //  lead_paragraph
  //  byline:original
  //  pub_date
  // Paging controls

  var displayResult;
  if (searchResult.status == "OK") {
    displayResult = '<div class="well"><p>' + searchResult.copyright + '</p></div>';
    searchResult.response.docs.forEach(function(doc){
      displayResult += '<div class="well">';
      displayResult += '<p><a href="' + doc.web_url + '" target="_blank">' + doc.headline.main + '</a></p>';
      displayResult += '<p>' + doc.lead_paragraph + '</p>';
      displayResult += '<p>' + doc.byline.original + '</p>';
      displayResult += '<p>' + doc.pub_date.slice(0,10) + '</p>';
      displayResult += '</div>';
    });
  }

  if (displayResult) {
    $("#searchOutput").html(displayResult);
  }
};

$(document).ready(function(){
  $("#search_terms").submit(function(event) {
    event.preventDefault();
    var allTheWords = $("#all-the-words").val();
    var exactPhrase = $("#exact-phrase").val();
    var atLeastOne = $("#at-least-one").val();
    var withoutWords = $("#without-words").val();

    displayResults(searchSample);

  });
});
