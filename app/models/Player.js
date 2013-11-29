var request = require( 'request' );

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

        player.fb_token   = args.fb_token;
        player.fb_raw     = args.fb_raw;
        player.updated_at = Date.now();

        player.save( function ( err, player, count ){
          if( err ) return next( err );

          created( player );
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
    },

    update_props : function ( args, next, ok ){
      var session_player = args.session_player;
      var src            = args.player;

      if( src.name )     session_player.name     = src.name;
      if( src.email )    session_player.email    = src.email;
      if( src.buzz )     session_player.buzz     = src.buzz;
      if( src.position ) session_player.position = src.position;

      session_player.save( function ( err, player, count ){
        if( err ) return next( err );

        ok( player.public_info());
      });
    }
  },

  methods : {

    is_owner : function ( player_id ){
      return player_id !== undefined ?
        this._id.toString() === player_id.toString() :
        false;
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
        game_id    : this._id,
        fb_id      : this.fb_id,
        name       : this.name,
        avatar     : this.avatar,
        buzz       : this.buzz,
        position   : this.position,
        created_at : this.created_at,
        updated_at : this.updated_at,

        fb_token : this.fb_token,
        email    : this.email
      };
    }
  }
};

module.exports = Player;
