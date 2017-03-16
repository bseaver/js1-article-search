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

Search.prototype.digger = function(myProperty, subProperties) {
  // result = "";
  // failed = false;
  // workingProperty;
  //
  // if (subProperties.length === 1) {
  //   if (subProperties[0] in myProperty) {
  //     workingProperty = myProperty[subProperties[0]];
  //     failed = (workingProperty === null);
  //   } else {
  //     failed = true;
  //   }
  // }
  //
  // for (var index = 0; index < subProperties.length; index++) {
  //   if (subProperties[index] in workingProperty) {
  //     workingProperty = workingProperty[subProperties[index]];
  //     failed = (workingProperty === null);
  //   } else {
  //     failed = true;
  //   }
  // }
  //
  // if (!failed) {
  //   result = workingProperty;
  // }
  // return result;
};


Search.prototype.NYTimesExtractor = function(inputResponse) {
  result = {source: "Digger", status: "bad"};
  result["status"] = this.digger(inputResponse, ['status']);
  console.log(result);
};


Search.prototype.searchNYTimes = function (page, thenCallBack, failCallBack){
  var lucene = this.constructLucene();
  var apiRequest = this.constructNYTimesURL(nyTimesAPI, lucene, page);
  var thisSearch = this;
  $.get(apiRequest)
  .done(function(response){
    console.log(response);
    thisSearch.NYTimesExtractor(response);
    thenCallBack(response);
  })
  .fail(function(error){
    console.log(error);
    failResponse = error;
    failCallBack(error);
  });
};

exports.searchModule = Search;
