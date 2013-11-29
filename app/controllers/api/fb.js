var Application = require( './application' );
var validate    = require( LIB_DIR + 'validations/api/fb' );
var passport    = require( 'passport' );
var Player      = Model( 'Player' );

module.exports = Application.extend( validate, {

  init : function ( before, after ){
    before( this.validate_create, { only : [ 'create' ]});
    before( this.is_validate );
  },

  new : passport.authenticate( 'facebook', {
    scope   : [ 'email' ],
    display : 'touch'
  }),

  create : function ( req, res, next ){
    var self = this;

    Player.fb_user_info( req.form, next,
      // custom error handle
      function ( user ){
        LOG.error( 400, res, user );
        self.error(
          new Error( 'facebook api error/down, might be token error' ),
          res, 400, '017'
        );
      },
      // success
      function ( user ){
        self.created( res, user );
      });
  }
});
