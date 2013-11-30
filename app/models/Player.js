var request  = require( 'request' );
var mediator = require( LIB_DIR + 'mediator' );

var Player = {

  statics : {

    login_with_fb : function ( args, next, created ){
      var fb_id = args.fb_id;
      var self  = this;

      this.findOne({
        fb_id : fb_id
      }, function ( err, player ){
        if( err ) return next( err );

        if( !player ){
          player = new self({
            fb_id  : fb_id,
            name   : args.name,
            email  : args.email,
            avatar : '//graph.facebook.com/' + fb_id + '/picture'
          });
        }

        player.token      = UTILS.uid( 32 );
        player.fb_token   = args.fb_token;
        player.fb_raw     = args.fb_raw;
        player.updated_at = Date.now();

        player.save( function ( err, player, count ){
          if( err ) return next( err );

          created( player.full_info());
        });
      });
    },

    fb_player_info : function ( args, next, failed, created ){
      var self = this;

      request.get({
        uri : 'https://graph.facebook.com/' + args.fb_id,
        qs  : {
          access_token : args.fb_token
        }
      }, function ( err, res, body ){
          if( err ) return next( err );

          var player = JSON.parse( body );

          player.fb_raw   = body;
          player.fb_id    = args.fb_id;
          player.fb_token = args.fb_token;

          if( !player.email ) return failed( player );

          self.login_with_fb( player, next, created );
        });
    },

    show : function ( args, next, ok ){
      var current_player = args.current_player;

      var player = current_player.is_owner( args.session_player_id )
        ? current_player.full_info()
        : current_player.public_info();

      ok( player );
    }
  },

  methods : {

    is_owner : function ( player_id ){
      return player_id !== undefined ?
        this._id.toString() === player_id.toString() :
        false;
    },

    limited_info : function (){
      return {
        _id        : this._id,
        fb_id      : this.fb_id,
        name       : this.name,
        avatar     : this.avatar,
        created_at : this.created_at,
        updated_at : this.updated_at
      };
    },

    public_info : function (){
      return {
        _id        : this._id,
        game_id    : this._id,
        fb_id      : this.fb_id,
        name       : this.name,
        avatar     : this.avatar,
        buzz       : this.buzz,
        position   : this.position,
        created_at : this.created_at,
        updated_at : this.updated_at
      };
    },

    full_info : function (){
      return {
        _id        : this._id,
        game_id    : this.game_id,
        fb_id      : this.fb_id,
        name       : this.name,
        avatar     : this.avatar,
        buzz       : this.buzz,
        position   : this.position,
        created_at : this.created_at,
        updated_at : this.updated_at,

        token    : this.token,
        fb_token : this.fb_token,
        email    : this.email
      };
    },

    update_current_game : function ( game_id, next, success ){
      this.game_id = game_id;
      this.save( function ( err, game ){
        if( err ) return next( err );

        success( game );
      });
    },

    dice : function ( min, max ){
      return Math.random() * ( max - min ) + min;
    },

    new_pos : function ( number ){
      var tmp = this.position + number;

      return this.position = ( tmp > 29 ) ? tmp - 29 : tmp;
    }
  }
};

module.exports = Player;
