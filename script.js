$(document).ready(() => {

  $('#submit').on('click', (e) => {
    event.preventDefault()

    let $search = $('#search');

    $('.searchResultWrapper').empty();
    getData($search.val());
    $search.val('');
  })

  function getData(searchVal) {
    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php',
      data: {
        action: 'query',
        format: 'json',
        generator: 'search',
        gsrsearch: searchVal,
        gsrlimit: 10,
        prop: 'extracts',
        exintro: '',
        explaintext: '',
        exsentences: 1,
      },
      dataType: 'jsonp',
      success: loopThroughResults
    });
  }

  function loopThroughResults(data) {
    let results = data.query.pages;
    Object.keys(results).forEach((result) => {
      renderResults(
        results[result].pageid,
        results[result].title,
        results[result].extract
      );
    })
  }

  function renderResults(pageId, title, description) {
    let url = 'https://en.wikipedia.org/?curid=' + pageId;

    $('.searchResultWrapper').append(
      '<a href="' + url + '" target="_blank" class="searchResult">' +
        '<h2>' + title + '</h2>' +
        '<p>' + description + '</p>' +
      '</a>'
    )
  }
});


