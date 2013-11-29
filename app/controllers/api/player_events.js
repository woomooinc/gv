var Application = require( './application' );
var validate    = require( LIB_DIR + 'validations/api/player_events' );
var Event       = Model( 'Event' );

module.exports = Application.extend( validate, {

  init : function ( before, after ){
    before( this.token );
    before( this.is_authenticated );

    before( this.validate_show );
    before( this.is_validate );
  },

  show : function ( req, res, next ){
    var self = this;
    var args = {
      player_id : req.form.player_id,
      event_id  : req.form.id
    };

    Event.show( args, next,
      function (){
        self.no_content( res );
      },
      function ( event ){
        self.ok( res, event );
      });
  }
});
