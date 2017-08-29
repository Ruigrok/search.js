
// Save an article
$(document).on("click", ".save-article", function (event) {
    event.preventDefault();
    var articleId = $(this).attr("data-id");

    $.post("/save/" + articleId, function (data) {
        //modal?
    })
});

function displaySaved(data) {
    $('#saved-div').empty();

    for (var i = 0; i < data.length; i++) {
        var article = $('<div class="col s12 m10 offset-m1" id="' + data[i]._id + '">');
        var card = $('<div class="card">');
        var content = $('<div class="card-content white-text">')
        var span = $('<span class="card-title">');
        span.text(data[i].title);


        var action = $('<div class="card-action"><a href="' + data[i].link
            + '"target="_blank">Open</a><a href="#" class="article-comments" data-id="' + data[i]._id + '">Notes</a>'
            + '<a href="#", class="remove" data-id="' + data[i]._id + '">Remove</a>');

        content.append(span);
        card.append(content, action);
        article.append(card);

        $('#saved-div').append(article);
    }
}

// Retrieve saved articles
$('#js-saved, #hacker-saved, #reddit-saved, #echo-saved').on("click", function () {
    $('.saved-btn').removeClass("btn-active");
    $(this).addClass("btn-active");
    var source = $(this).attr("value");

    $.get("/saved/" + source, function (data) {
        displaySaved(data);
    })
})

// Unsave articles
$(document).on("click", ".remove", function (event) {
    event.preventDefault();
    var articleId = $(this).attr("data-id");

    $.post("/remove/" + articleId, function (data) {
        $("#"+ articleId).remove();
    })
});