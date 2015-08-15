'use strict';

var Slack = require('slack-client');

var request = require("request");

var token = 'xoxb-9134797522-z9OSephq9GA5KaNDl3kX2OHv';

var slack = new Slack(token, true, true);

slack.on('open', function () {
    var channels = Object.keys(slack.channels)
        .map(function (k) { return slack.channels[k]; })
        .filter(function (c) { return c.is_member; })
        .map(function (c) { return c.name; });

    var groups = Object.keys(slack.groups)
        .map(function (k) { return slack.groups[k]; })
        .filter(function (g) { return g.is_open && !g.is_archived; })
        .map(function (g) { return g.name; });

    console.log('Welcome to Slack. You are ' + slack.self.name + ' of ' + slack.team.name);

    if (channels.length > 0) {
        console.log('You are in: ' + channels.join(', '));
    }
    else {
        console.log('You are not in any channels.');
    }

    if (groups.length > 0) {
       console.log('As well as: ' + groups.join(', '));
    }
});

slack.on('message', function(message) {
    var channel = slack.getChannelGroupOrDMByID(message.channel);
    var user = slack.getUserByID(message.user);

    if (message.type === 'message') {
        var isAboutRoom = message.text.indexOf('room') > -1;

        if (isAboutRoom) 
        {
            request({
              uri: "http://private-002a5-meetingroom.apiary-mock.com/meeting_rooms",
              method: "GET",
              timeout: 10000,
              followRedirect: true,
              maxRedirects: 10
            }, function(error, response, body) {

                var roomName = [];
                var data = JSON.parse(body)
                for (var i = data.length - 1; i >= 0; i--) {
                    var room = data[i];
                    console.log('----');
                    console.log(room.room_name);
                    roomName.push(room.room_name);
                };
                // console.log(roomName);
                var msg = roomName.join('\n');
                var finalMsg = "These rooms are available: \n" + msg;
                channel.send(finalMsg);
            });
        };

        console.log(channel.name + ':' + user.name + ':' + message.text);
    }
});

slack.login();