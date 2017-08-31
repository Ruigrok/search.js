
function articleDisplay(data) {
    $('#article-div').empty();

    for (var i = 0; i < data.length; i++) {
        var article = $('<div class="col s12 m10 offset-m1">');
        var card = $('<div class="card">');
        var content = $('<div class="card-content white-text">')
        var span = $('<span class="card-title">');
        span.text(data[i].title);


        var action = $('<div class="card-action"><a href="' + data[i].link
            + '"target="_blank">Open</a><a href="#" class="save-article" data-id="' + data[i]._id + '">Save</a>');

        content.append(span);
        card.append(content, action);
        article.append(card);

        $('#article-div').append(article);
    }
}

$('#js, #hacker, #reddit, #echo').on("click", function () {
    $('.search-btn').removeClass("btn-active");
    $(this).addClass("btn-active");
    var source = $(this).attr("value");
    $('#article-div').empty();

    $.get("/scrape/" + source, function(data) {
        articleDisplay(data);
    })

})








