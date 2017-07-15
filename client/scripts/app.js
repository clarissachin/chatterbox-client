// YOUR CODE HERE:

// Rooms
// [1] Allow users to create rooms and enter existing rooms - Rooms are defined by the .roomname property of messages, so you'll need to filter them somehow.
// Socializing
// [2] Allow users to 'befriend' other users by clicking on their user name
// [2a] Display all messages sent by friends in bold

var messages = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages?limit=100';
window.roomName = [];
window.friends = [];
window.jsonObj = [];
// GET request
$(document).on('ready', function() {
  var $getRequest = function() {
    $.ajax({
      url: messages,
      method: 'GET',
      data: { order: '-createdAt' },
      dataType: 'json',
      success: onSuccess
    });
  };
//POST request
  $('#submitText').click(function() {
    var msgText = $('#inputMsg').val();
    var userName = $('#userName').val();
    var roomName = $('#roomName').val();
    window.roomName.push(roomName);
    // console.log('window.roomName is', window.roomName);
    var jsonObj = {
      roomname: roomName,
      text: msgText,
      username: userName,
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

  $('#submitText').click(function() {
    console.log('roomName is', window.roomName[0]);
  });
  $('body').on("click", ".userNameTag", function() {
    var txt = $(this).text();
    for (var i = 0; i < window.jsonObj.length; i++) {
      var username = window.jsonObj[i]['username'];
      if (username.length >= 1 && username === txt && window.friends.indexOf(username) === -1) {
        window.friends.push(username);
      }
    }
    // console.log('ive been clicked'+ window.jsonObj[0]);
  });
  var onSuccess = function(json) {
    var jsonArray = json.results;
    window.jsonObj = jsonArray;
    console.log(jsonArray);
    $('#info').append(json);
    $('#chats1').append('<p>' + json + '</p>');
    if (window.roomName[window.roomName.length - 1] !== undefined) {
      $('#chatBox').remove();
      $('body').append('<div id="chatBox"></div>');
      for (var i = jsonArray.length - 100; i < jsonArray.length; i++) {
        if (jsonArray[i]['roomname'] === window.roomName[window.roomName.length - 1]) {
          var msg = JSON.stringify(jsonArray[i]['text']);
          if (msg !== undefined && !msg.includes('<') && jsonArray[i]['text'].length!==0) {
            $('#chatBox').append('<p>' + msg + '-  ' + '<a href= "#" class= "userNameTag">' + jsonArray[i]['username'] + '</a></p>');
          } else {
            console.log('saved you: a threat was found');
          }
        }
      }
    } else {
      for (var k = jsonArray.length - 50; k < jsonArray.length; k++) {
        var msg = JSON.stringify(jsonArray[k]['text']);
        if (msg !== undefined && !msg.includes('<') && jsonArray[k]['text'].length!==0) {
          $('#chatBox').append('<p>' + msg + '-  ' + jsonArray[k]['username'] + '</p>');
        } else {
          console.log('saved you: a threat was found');
        }
      }
    }
    return json;
  };
  var postSuccess = function(data) {
    $getRequest();
  };
  var handleError = function(data) {
    console.log('Post failed.');
  };
});
