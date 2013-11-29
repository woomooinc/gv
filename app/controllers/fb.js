var Application = require( CONTROLLER_DIR + './application' );
var Player        = Model( 'Player' );
var passport    = require( 'passport' );

module.exports = Application.extend({

  init : function ( before, after ){
    before( this.failure_redirect, { only : [ 'create' ]});
  },

  failure_redirect : passport.authenticate( 'facebook', {
    failureRedirect : '/'
  }),

  new : passport.authenticate( 'facebook', {
    scope : [ 'email' ]
  }),

  create : function ( req, res, next ){
    var self = this;
    var player = req.user._json; // with password it must be req.user not req.session_user

    player.fb_raw   = req.player._raw;
    player.fb_token = req.player.fb_token;

    Player.login_with_fb( player,
      // error
      function ( err ){
        req.flash( 'flash-error', 'There is something wrong with Facebook Login :(' );
        res.render( 'sessions/new' );
      },
      // success
      function ( player ){
        req.session.player_id = player._id;
        req.session.token     = player.fb_token;

        res.redirect( '/' );
      });
  }
});
