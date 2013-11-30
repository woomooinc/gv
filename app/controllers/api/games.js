var Application = require( './application' );
var validate    = require( LIB_DIR + 'validations/api/games' );
var Game        = Model( 'Game' );
var Event       = Model( 'Event' );

var mediator    = require( LIB_DIR + 'mediator' );
var timer       = {};

module.exports = Application.extend( validate, {

  init : function ( before, after ){
    before( this.token );
    before( this.is_authenticated );

    before( this.validate_id,    { only : [ 'show', 'update' ]});
    before( this.validate_watch, { only : [ 'watch' ]});
    before( this.is_validate,    { only : [ 'show', 'update', 'watch' ]});

    before( this.events, { only : [ 'create_or_update' ]});
  },

  events : function ( req, res, next ){
    var self = this;

    Event.
      find().
      limit( 50 ).
      exec( function ( err, events ){
        if( err )            return next( err );
        if( !events.length ) return self.no_content( res );

        req.events = events;

        next();
      });
  },

// -----------------------------------------------------------------------------

  show : function ( req, res, next ){
    var self = this;
    var args = {
      game_id           : req.form.id,
      session_player_id : req.session_player_id
    };

    Game.show( args, next,
      function (){
        self.no_content( res );
      },
      function (){
        self.forbidden( res );
      },
      function ( game ){
        self.ok( res, game );
      });
  },

  create_or_update : function ( req, res, next ){
    var self = this;
    var args = {
      session_player : req.session_player,
      events         : req.events
    };

    Game.create_or_update( args, next,
      function ( game ){
        self.ok( res, game );
      });
  },

  // receive command
  update : function ( req, res, next ){
    var self = this;
    var args = {
      game_id        : req.form.id,
      session_player : req.session_player
    };

    Game.update_prop( args, next,
      function (){
        self.no_content( res );
      },
      function (){
        self.forbidden( res );
      },
      function ( game ){
        self.ok( res, game );
      });
  },

  watch : function ( req, res, next ){
    var self = this;
    var name = req.form.type + '-' + req.form.id;

    // watch changes
    mediator.once( name, function ( msg ){
      self.ok( msg );
    });

    // response every 30 sec even there is no new msg
    timer[ name ] = setTimeout( function (){
      mediator.emit( name, { api : 'wait' });
    }, 30000 );
  }
});
