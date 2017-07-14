// YOUR CODE HERE:
var messages = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
// POST request
$(document).on("ready", function() {
  $ajax({
    url: messages,
    method:'GET',
    dataType: 'json',
    success: onSuccess
  });

  function onSuccess(json) {
    var features = json;
    $("#info").append(features);
    $("#chats1").append("<p>" + features + "</p>");
    console.log(features);
  }
});

//



// var message = {
//   username: 'json lee',
//   text: 'ssssssuuuuuhhh dude',
// };
