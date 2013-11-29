var EventEmitter = require( 'events' ).EventEmitter;
var mediator     = new EventEmitter;

mediator.setMaxListeners( 51200 );

module.exports = mediator;
