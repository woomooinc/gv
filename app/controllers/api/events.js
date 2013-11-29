var Application = require( './application' );
var validate    = require( LIB_DIR + 'validations/api/events' );
var Event       = Model( 'Event' );

module.exports = Application.extend( validate, {

  init : function ( before, after ){
    before( this.token );
    before( this.is_authenticated );

    before( this.validate_create );
    before( this.is_validate );
  },

  create : function ( req, res, next ){
    var self = this;
    var args = {
      title             : req.form.title,
      desc              : req.form.desc,
      point             : req.form.point,
      session_player_id : req.session_player_id,
      img_data          : req.files.img_data
    };

    Event.create( args, next,
      function ( event ){
        self.created( res, event );
      });
  }
});
