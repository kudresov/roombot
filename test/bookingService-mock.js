'use strict';

var q = require('q');

var bookingService = {
    getAvailableRooms: function(time){
        var result;

        var now = ['Rooms available:',
                    'EBT 2.2',
                    'EBT 2.1'
                   ].join('\n');

        var thirteen = ['Rooms available:',
                        'EBT 2.5',
                        'EBT 2.1'
                       ].join('\n');


        if (time.hour() === 13) {
            result = thirteen;
        } else {
            result = now;
        }

        return q.fcall(function () {
            return result;
        });
    }
};

module.exports = bookingService;