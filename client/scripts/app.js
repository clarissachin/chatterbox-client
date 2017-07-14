// YOUR CODE HERE:
var messages = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
// POST request
$(document).on("ready", function() {
  $.ajax({
    url: messages,
    method:'GET',
    dataType: 'json',
    success: onSuccess,
  });

  $.ajax({
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes',
    method:'POST',
    dataType: 'json',
    success: postSuccess,
  });

  function onSuccess(json) {
    var jsonArray = json.results;
    $("#info").append(json);
    $("#chats1").append("<p>" + json + "</p>");
    console.log(jsonArray[14]);
    for (var i = 0; i < jsonArray.length; i++) {
      for (key in jsonArray[i]) {
        var msg = (jsonArray[i]['text']);
        $("#chatBox").append("<p>" + msg + "</p>");
      }
    }
   }

   function postSuccess()
});


//



// var message = {
//   username: 'json lee',
//   text: 'ssssssuuuuuhhh dude',
// };
