var nyTimesAPI = require('./../../.env').nyTimesAPI;

function Search(allTheWords, exactPhrase, atLeastOne, withoutWords) {
  this.allTheWords = allTheWords;
  this.exactPhrase = exactPhrase;
  this.atLeastOne = atLeastOne;
  this.withoutWords = withoutWords;
}

Search.prototype.constructNYTimesURL = function (nyTimesAPI, lucene, page) {
  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

  url += '?';
  url += $.param(
    {
      'api-key': nyTimesAPI,
      'fq': lucene,
      'page': page
    }
  );

  return url;
};

Search.prototype.constructLucene = function(){
  var allTheWords = this.allTheWords.trim();
  var exactPhrase = this.exactPhrase.trim();
  var atLeastOne = this.atLeastOne.trim();
  var withoutWords = this.withoutWords.trim();

  lucene = "";
  if (allTheWords) {
    words = allTheWords.split(" ").forEach(function(word) {
      lucene += (lucene?" ":"") + "+" + word;
    });
  }
  if (withoutWords) {
    words = withoutWords.split(" ").forEach(function(word) {
      lucene += (lucene?" ":"") + "-" + word;
    });
  }
  if (atLeastOne) {
    lucene += (lucene?" ":"") + atLeastOne;
  }
  if (exactPhrase) {
    lucene += (lucene?" ":"") + '"' + exactPhrase + '"';
  }
  return lucene;
};


Search.prototype.searchNYTimes = function (page, thenCallBack, failCallBack){
  var lucene = this.constructLucene();
  var apiRequest = this.constructNYTimesURL(nyTimesAPI, lucene, page);
  $.get(apiRequest)
  .done(function(response){
    console.log(response);
    thenCallBack(response);
  })
  .fail(function(error){
    console.log(error);
    failCallBack(error);
  });

};

exports.searchModule = Search;
