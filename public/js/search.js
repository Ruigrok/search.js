
function articleDisplay(data) {
    for (var i = 0; i < data.length; i++) {
        var article = $('<div class="col s12 m10 offset-m1">');
        var card = $('<div class="card">');
        var content = $('<div class="card-content white-text">')
        var span = $('<span class="card-title">');
        span.text(data[i].title);


        var action = $('<div class="card-action"><a href="' + data[i].link
            + '"target="_blank">Open</a><a href="#" class="save" data-id="' + data[i]._id + '">Save</a>');

        content.append(span);
        card.append(content, action);
        article.append(card);

        $('#article-div').append(article);
    }
}

$('#echo-js').on("click", function () {
    $('#article-div').empty();
    $.get("/scrape/echojs", function (data) {
        articleDisplay(data);
    })
})

$('#reddit').on("click", function () {
    $.get("/scrape/reddit", function (data) {
        articleDisplay(data);
        $('#article-div').empty();
    })
})



