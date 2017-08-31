$(document).ready(function () {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    $('.collapsible').collapsible();
});

$(document).on("click", ".article-comments", function (event) {
    event.preventDefault();
    $('#comment-container').empty();
    $('#textarea1, #icon_prefix').val('');
    $('#textarea1, #icon_prefix').trigger('autoresize');
    var articleId = $(this).attr("data-id");
    $('#add-comment').attr("data-id", articleId);

    $.get("/article/" + articleId, function (data) {
        $('#modal-header').text(data[0].title);

        for (var i = 0; i < data[0].notes.length; i++) {
            displayComment(data[0].notes[i])
        }
    })
    $('#note-modal').modal('open');
});


// When you click the savenote button
$(document).on("click", "#add-comment", function () {
    var articleId = $(this).attr("data-id");

    var newComment = {
        "title": $('.userInp').val(),
        "body": $('.userInp2').val()
    }

    $.post("/article/" + articleId, newComment, function (data) {
        console.log(data);

    })

    $('#textarea1, #icon_prefix').val('');
    $('#textarea1, #icon_prefix').trigger('autoresize');
});

$(document).on("click", "#delete", function () {
    var commentId = $(this).attr("data-id");

    $.post("/delete/" + commentId, commentId, function (data) {

    })
});


function displayComment(data) {
    var card = $('<div class="card">');
    var content = $('<div class="card-content white-text">')
    var title = $('<span class="card-title">');
    title.text(data.title);
    var body = $('<p>');
    body.append(data.body)

    var action = $('<div href="#" class="card-action comment-card right-align"><a data-id="' + data._id
        + '"id="delete">Delete</a></div>');

    content.append(title, body);
    card.append(content, action);

    $('#comment-container').append(card);
}