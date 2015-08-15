'use strict';

var q = require('q');
var natural = require('natural');
var _ = require('underscore');

var tokenizer = new natural.RegexpTokenizer({pattern: ' '});

var conversation = {
    message: function(msg) {
        var tokens = tokenizer.tokenize(msg);
        var time = _.last(tokens);
        var result;

        var now = ['Rooms available:',
                    'EBT 2.2',
                    'EBT 2.1'
                   ].join('\n');

        var thirteen = ['Rooms available:',
                        'EBT 2.5',
                        'EBT 2.1'
                       ].join('\n');



        if (time === '13:00') {
            result = thirteen;
        } else {
            result = now;
        }

        return q.fcall(function () {
            return result;
        });
    }
};

module.exports = conversation;