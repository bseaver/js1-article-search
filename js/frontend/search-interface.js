

$(document).ready(function(){
  $("#search_terms").submit(function() {
    event.preventDefault();
    var allTheWords = $("#all-the-words").val();
    var exactPhrase = $("#exact-phrase").val();
    var atLeastOne = $("#at-least-one").val();
    var withoutWords = $("#without-words").val();
    alert("ALL: " + allTheWords + "; EXACT: " + exactPhrase + "; AT LEAST ONE: " + atLeastOne + "; WITHOUT WORDS:" + withoutWords);
  });
});
