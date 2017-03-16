var nyTimesAPI = require('./../../.env').nyTimesAPI;

function Search() {
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

Search.prototype.constructLucene = function(allTheWords, exactPhrase, atLeastOne, withoutWords){
  allTheWords = allTheWords.trim();
  exactPhrase = exactPhrase.trim();
  atLeastOne = atLeastOne.trim();
  withoutWords = withoutWords.trim();

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

Search.prototype.searchNYTimes = function (allTheWords, exactPhrase, atLeastOne, withoutWords, page, thenCallBack, failCallBack){
  var lucene = this.constructLucene(allTheWords, exactPhrase, atLeastOne, withoutWords);
  var apiRequest = this.constructNYTimesURL(nyTimesAPI, lucene, page);
  $.get(apiRequest)
  .then(function(response){
    console.log(response);
    thenCallBack(response);
  })
  .fail(function(error){
    console.log(error);
    failCallBack(error);
  });

};

// Weather.prototype.getWeather = function(city, callBack) {
//   $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey)
//     .then
//     (
//       function(response)
//       {
//         console.log(JSON.stringify(response));
//         console.log(response);
//         callBack(true, response.weather[0].description, city);
//         // $('.showWeather').text("The weather in " + city + " is " + response.weather[0].description);
//       }
//     )
//     .fail
//     (
//       function(error)
//       {
//         console.log(JSON.stringify(error));
//         console.log(error);
//
//         callBack(false, error.responseJSON.message);
//         // $('.showWeather').text(error.responseJSON.message);
//       }
//     );
//
// };

exports.searchModule = Search;
