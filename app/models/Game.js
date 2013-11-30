var mediator = require( LIB_DIR + 'mediator' );

var Game = {

  statics : {

    show : function ( args, next, no_content, forbidden, ok ){
      this.findById( args.game_id ).
        populate( 'players', '-email -fb_token -fb_raw' ).
        populate( 'events' ).
        exec( function ( err, game ){
          if( err )   return next( err );
          if( !game ) return no_content();

          if( !game.players.indexOf( args.session_player_id )){
            return forbidden();
          }

          ok( game );
        });
    },

    // join a game
    create_or_update : function ( args, next, ok ){
      var self              = this;
      var session_player    = args.session_player;
      var session_player_id = session_player._id;

      this.findOne({
        $where : 'this.players.length < 5'
      }).
      exec( function ( err, game ){
        if( err ) return next( err );

        if( !game ){
          game = new self({
            events         : args.events,
            current_player : session_player_id
          });
        }

        game.players.addToSet( session_player_id );
        game.save( function ( err, game ){
          if( err ) return next( err );

          session_player.update_current_game( game._id, next, function ( player ){

            self.
              findById( game._id ).
              populate( 'players', '-email -fb_token -fb_raw -token' ).
              populate( 'events' ).
              exec( function ( err, game ){
                ok( game );
                // notify players in this game pool
                mediator.emit( 'game-' + game._id, {
                  api  : 'game/:game_id',
                  data : {
                    game_id : game._id
                  },
                  changed : {
                    player_id : session_player_id
                  }
                });
              });
          });
        });
      });
    },

    update_prop : function ( args, next, no_content, forbidden, ok ){
      var History           = Model( 'History' );
      var session_player    = args.session_player;
      var session_player_id = session_player._id;
      var game_id           = args.game_id;

      this.show({
        game_id           : args.game_id,
        session_player_id : args.session_player._id
      }, next, no_content, forbidden, function ( game ){

        game.current_player = session_player_id;
        game.save( function ( err, game ){
          if( err ) return next( err );

          var dice    = session_player.dice( 1, 6 );
          var new_pos = session_player.new_pos( dice );
          var event   = game.events[ new_pos ];
          var buzz    = session_player.new_buzz( event.buzz );

          var history = new History({
            game_id   : game_id,
            player_id : session_player_id,
            event_id  : event._id,
            dice      : dice,
            buzz      : buzz,
            position  : new_pos
          });

          if( buzz > 70 && event.title === 'IPO' ){
            // win and end the game
            history.status = 'end';
            game.players = [];
          }else if( buzz < 0 ){
            // lost and quit
            game.players.pull( session_playerid );
          }

          game.save( function ( err, game ){
            if( err ) return next( err );

            history.save( function ( err, history ){
              if( err ) return next( err );

              ok( game );
              // notify players in this game pool
              mediator.emit( 'history-' + game._id, {
                api  : 'histories/:history_id',
                data : {
                  history_id : history._id
                }
              });
            })
          });
        });
      });
    }
  }
};

module.exports = Game;
