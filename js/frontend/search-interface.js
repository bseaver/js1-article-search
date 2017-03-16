var Search = require('./../js/backend/search.js').searchModule;
var searchSample = require('./../js/backend/search_sample.js').searchResultSample;

var newSearch;
var newResult;

var displayResults = function(searchResult) {
  newResult = searchResult;
  done = false;
  var displayResult = "";

  if (!done && newResult.status != "OK") {
    displayResult += '<div class="well"><p>Returned Status: ' + newResult.status + '</p></div>';
    done = true;
  }

  if (!done && newResult.response.docs.length === 0 && newResult.response.meta.offset <= 0) {
    displayResult = '<div class="well"><p>' + newResult.copyright + '</p><p>No Results Found</p></div>';
    done = true;
  }

  if (!done && newResult.response.docs.length === 0 && newResult.response.meta.offset > 0) {
    displayResult += '<div class="well"><p>No further results returned</p></div>';
    done = true;
  }

  if (!done && newResult.response.docs.length > 0 && newResult.response.meta.offset <= 0) {
    displayResult += '<div class="well"><p>' + newResult.copyright + '</p></div>';
  }

  if (!done && newResult.response.docs.length > 0) {
    newResult.response.docs.forEach(function(doc){
      displayResult += '<div class="well">';
      displayResult += '<p><a href="' + doc.web_url + '" target="_blank">' + doc.headline.main + '</a></p>';
      displayResult += '<p>' + doc.lead_paragraph + '</p>';
      if ("byline" in doc && doc.byline != null && "original" in doc.byline) {
        displayResult += '<p>' + doc.byline.original + '</p>';
      }
      displayResult += '<p>' + doc.pub_date.slice(0,10) + '</p>';
      displayResult += '</div>';
    });
  }

  if (displayResult) {
    $("#searchOutput").append(displayResult);
  }
};

var displayFailure = function(searchResult){
  newResult = undefined;
  var displayResult = "";

  if (!displayResult && typeof searchResult == "object") {
    if(typeof searchResult.responseJSON == "object" && typeof searchResult.responseJSON.message == "string"){
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
    displayResult = '<p>Reason: Unknown.</p>';
  }

  displayResult = '<div class="well"><p>Search failed.</p>' + displayResult + '</div>';

  $("#searchOutput").append(displayResult);
};


$(document).ready(function(){
  $("#search_terms").submit(function(event) {
    event.preventDefault();
    var allTheWords = $("#all-the-words").val();
    var exactPhrase = $("#exact-phrase").val();
    var atLeastOne = $("#at-least-one").val();
    var withoutWords = $("#without-words").val();

    // displayResults(searchSample);
    $("#searchOutput").empty();
    newSearch = new Search(allTheWords, exactPhrase, atLeastOne, withoutWords);
    newSearch.searchNYTimes(0, displayResults, displayFailure);
  });

  var win = $(window);
  win.scroll(function(){
    if($(document).height() - win.height() == win.scrollTop()){
      console.log("end of document reached.");
      if (typeof newResult != "object") {
        return;
      }
      if (newResult.response.docs.length < 10) {
        return;
      }
      var nextPage = Math.floor(newResult.response.meta.offset / 10) + 1;
      console.log(nextPage);
      newSearch.searchNYTimes(nextPage, displayResults, displayFailure);
    }
  });
});
