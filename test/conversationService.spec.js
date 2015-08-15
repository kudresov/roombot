'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var should = require('chai').should();
var mockery = require('mockery');
var bookingMock = require('./bookingService-mock');

chai.use(chaiAsPromised);

var sut;

describe('Conversation service', function() {
    before(function(){
        mockery.registerMock('./bookingService', bookingMock);
        mockery.enable({ useCleanCache: true, warnOnReplace: true, warnOnUnregistered: false});
        sut = require('../service/conversationService');
    });

    after(function() {
      mockery.disable();
    });

    it('should be not null', function(){
      should.exist(sut);
    });

    describe('with rooms list request', function(){
      it('should return list of available rooms', function(){
        var expectedResponse = ['Rooms available:',
                                'EBT 2.2',
                                'EBT 2.1'
                               ].join('\n');

        return sut.message('available rooms now').should.eventually.equal(expectedResponse);
      });
    });

    describe('with rooms list request at 13:00', function(){
      it('should return a list of available rooms', function(){
        var expectedResponse = ['Rooms available:',
                                'EBT 2.5',
                                'EBT 2.1'
                               ].join('\n');

        return sut.message('available rooms at 13:00').should.eventually.equal(expectedResponse);    
      });
    });

    describe('with rooms list request at 1pm', function(){
      it('should return a list of available rooms', function(){
        var expectedResponse = ['Rooms available:',
                                'EBT 2.5',
                                'EBT 2.1'
                               ].join('\n');

        return sut.message('available rooms at 1pm').should.eventually.equal(expectedResponse);    
      });
    });

    describe('with rooms list request at 14:00', function(){
      xit('should return a list of available rooms', function(){
        var expectedResponse = ['Rooms available:',
                                'EBT 2.5'
                               ].join('\n');

        return sut.message('available rooms at 14:00').should.eventually.equal(expectedResponse);    
      });
    });
});