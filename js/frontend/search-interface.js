var Search = require('./../js/backend/search.js').searchModule;
var searchSample = require('./../js/backend/search_sample.js').searchResultSample;

var displayResults = function(searchResult) {
  var displayResult;
  if (searchResult.status == "OK") {
    if(searchResult.response.docs.length === 0){
      displayResult = '<div class="well"><p>' + searchResult.copyright + '</p><p>No Results Found</p></div>';
    } else {
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
  }

  if (displayResult) {
    $("#searchOutput").html(displayResult);
  }
};

var displayFailure = function(searchResult){
  var displayResult = "";

  if (!displayResult && typeof searchResult == "object") {
    if(typeof searchResult.responseJSON == "object" && typeof searchResult.responseJSON.message == "string"){
      displayResult += '<p>Search failed.</p>';
      displayResult += '<p>Response Message: ' + searchResult.responseJSON.message + '</p>';
    }

    if(typeof searchResult.statusText == "string"){
      displayResult += '<p>Status Text: ' + searchResult.statusText + '</p>';
    }

    if(typeof searchResult.status == "number"){
      displayResult += '<p>Status Number: ' + searchResult.status + '</p>';
    }
  }

  if (!displayResult) {
    displayResult = '<p>Call to search failed for unknown reason.</p>';
  }

  displayResult = '<div class="well">' + displayResult + '</div>';

  $("#searchOutput").html(displayResult);
};


$(document).ready(function(){
  $("#search_terms").submit(function(event) {
    event.preventDefault();
    var allTheWords = $("#all-the-words").val();
    var exactPhrase = $("#exact-phrase").val();
    var atLeastOne = $("#at-least-one").val();
    var withoutWords = $("#without-words").val();

    // displayResults(searchSample);
    var newSearch = new Search();
    newSearch.searchNYTimes(allTheWords, exactPhrase, atLeastOne, withoutWords, 0, displayResults, displayFailure);
  });
});
