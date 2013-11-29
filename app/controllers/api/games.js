var Application = require( './application' );
var validate    = require( LIB_DIR + 'validations/api/games' );
var Game        = Model( 'Game' );

module.exports = Application.extend( validate, {

  init : function ( before, after ){
    before( this.token );
    before( this.is_authenticated );

    before( this.validate_show,             { only : [ 'show' ]});
    before( this.validate_create_or_update, { only : [ 'create_or_update' ]});
    before( this.is_validate );
  },

  show : function ( req, res, next ){
    var self = this;

    Game.show({
      session_game : req.session_player
    }, next,
    function ( game ){
      self.ok( res, game );
    });
  },

  create_or_update : function ( req, res, next ){
    var self = this;

    Game.update_prop({
      session_player : req.session_player
    }, next,
    function ( game ){
      self.ok( res, game );
    });
  }
});
