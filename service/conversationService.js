'use strict';

var natural = require('natural');
var _ = require('underscore');
var chrono = require('chrono-node');
var moment = require('moment');

var bookingService = require('./bookingService');

var tokenizer = new natural.RegexpTokenizer({pattern: ' '});

var conversation = {
    message: function(msg) {
        var tokens = tokenizer.tokenize(msg);
        var time = _.last(tokens);
        var parsedTime = chrono.parse(time);
        var momentTime = moment({hour: parsedTime[0].start.knownValues.hour});

        return bookingService.getAvailableRooms(momentTime);
    }
};

module.exports = conversation;