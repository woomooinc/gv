var Application = require( './application' );
var validate    = require( LIB_DIR + 'validations/api/socket' );
var mediator    = require( LIB_DIR + 'mediator' );
var timer       = {};

module.exports = Application.extend( validate, {

  init : function ( before, after ){
    before( this.token );
    before( this.is_authenticated );

    before( this.validate_watch );
    before( this.is_validate );
  },

  watch : function ( req, res, next ){
    var connection = 'connect-' + params.user_id;
    // watch changes
    mediator.once( connection, function ( msg ){
      res.ok({ msg : msg });
    });

    // response every 30 sec even there is no new msg
    timer[ connection ] = setTimeout( function(){
      mediator.emit( connection, { msg : 'wait' });
    }, 30000 );
  }
});
