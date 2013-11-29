var Application = require( './application' );
var validate    = require( LIB_DIR + 'validations/api/players' );
var Player      = Model( 'Player' );

module.exports = Application.extend( validate, {

  init : function ( before, after ){
    before( this.token );
    before( this.is_authenticated );

    before( this.validate_show,   { only : [ 'show' ]});
    before( this.validate_update, { only : [ 'update' ]});
    before( this.current_player );

    before( this.is_validate );
  },

  show : function ( req, res, next ){
    var self = this;

    Player.show({
      current_player : req.current_player
    }, next,
    function ( player ){
      self.ok( res, player );
    });
  },

  update : function ( req, res, next ){
    var self = this;

    Player.update_prop( args, next,
      function ( player ){
        self.ok( res, player );
      });
  }
});
