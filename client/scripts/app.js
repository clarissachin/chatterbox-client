// YOUR CODE HERE:
var messages = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages?limit=10000';
// var messagesTwo = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/roomName/messages';
// POST request
$(document).on("ready", function() {
  var $getRequest = function() {
    $.ajax({
    url: messages,
    method:'GET',
    dataType: 'json',
    success: onSuccess
  });
  }

$("button").click(function() {
    var msgText = $("#inputMsg").serialize()
    // console.log(msgText);
    var jsonObj = {
      roomname: 'jason Tester',
      text: msgText,
      username: 'clarissa'
    }
    $.ajax({
      url: messages,
      type:'POST',
      data:jsonObj,
      contentType: 'text',
      success: postSuccess,
      error: handleError
    });
    // $('form').trigger('reset')
  });

//   var postRequest = $.ajax({
//     url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes',
//     type:'POST',
//     data: $("#inputMsg").val(),
//     contentType: 'application/json',
//     success: postSuccess,
// });

  function handleError(data) {
    console.log('shhh');
    console.log('data is', data);
  }
  function onSuccess(json) {
    var jsonArray = json.results;
    // console.log('json', jsonArray);
    for (var i = 5000; i < jsonArray.length; i++) {
      if(jsonArray[i]['username']==='clarissa'){
        console.log(jsonArray[i]);
      }
    }
    $("#info").append(json);
    $("#chats1").append("<p>" + json + "</p>");
    console.log('jsonArray.length is', jsonArray.length);
    for (var i = 0; i < jsonArray.length; i++) {
        var msg = (jsonArray[i]['text']);
        $("#chatBox").append("<p>" + i + "--" + msg + "</p>");
    }
   }

   function postSuccess(data) {
     console.log('postSuccess reached! data is', data);
     $getRequest();
    //  postRequest.done(function(postMsg) {
      //  $('body').append("<p>" + data + "</p>");
    //  });
   }

  // function postSuccess(json)
});


//



// var message = {
//   username: 'json lee',
//   text: 'ssssssuuuuuhhh dude',
// };
