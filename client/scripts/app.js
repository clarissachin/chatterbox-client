// YOUR CODE HERE:

// Rooms
// [1] Allow users to create rooms and enter existing rooms - Rooms are defined by the .roomname property of messages, so you'll need to filter them somehow.
// Socializing
// [2] Allow users to 'befriend' other users by clicking on their user name
// [2a] Display all messages sent by friends in bold

var messages = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages?limit=10000';
// var messagesTwo = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/roomName/messages';
// POST request
$(document).on('ready', function() {
  var $getRequest = function() {
    $.ajax({
      url: messages,
      method: 'GET',
      dataType: 'json',
      success: onSuccess
    });
  };

  $('#submitText').click(function() {
    var msgText = $('#inputMsg').val();
    var userName = $('#userName').val();
    var roomName = $('#createRoom').val();
    var jsonObj = {
      roomname: roomName,
      text: msgText,
      username: userName
    };
    $.ajax({
      url: messages,
      type: 'POST',
      data: jsonObj,
      dataType: 'json',
      success: postSuccess,
      error: handleError
    });
    $('form').trigger('reset');
  });

  var handleError = function(data) {
    console.log('data is', data);
  };
  var onSuccess = function(json) {
    var jsonArray = json.results;
    $('#info').append(json);
    $('#chats1').append('<p>' + json + '</p>');
    for (var i = jsonArray.length - 50; i < jsonArray.length; i++) {
      var msg = JSON.stringify(jsonArray[i]['text']);
      if (msg !== undefined && !msg.includes('<') && jsonArray[i]['text'].length!==0) {
        $('#chatBox').append('<p>' + msg + '-  ' + jsonArray[i]['username'] + '</p>');
      } else {
        console.log('saved you: a threat was found');
      }
    }
  };

  var postSuccess = function(data) {
    console.log('postSuccess reached! data is', data);
    $getRequest();
    //  postRequest.done(function(postMsg) {
      //  $('body').append('<p>' + data + '</p>');
    //  });
  };

  // function postSuccess(json)
});


//



// var message = {
//   username: 'json lee',
//   text: 'ssssssuuuuuhhh dude',
// };
