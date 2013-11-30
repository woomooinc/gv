var Class   = require( 'node.class' );
var fs      = require( 'fs' );
var lib     = require( '../lib' );
var fixture = UTILS.fixture;

module.exports = Class.extend({

  init : function ( client ){
    client.post( 'api/login/facebook', this.player_a_fb_login, 'fb#client_login' );
    client.post( 'api/login/facebook', this.player_b_fb_login, 'fb#client_login' );

    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_a_create_event,             'event#create' );
    client.post( 'api/events', this.player_b_create_event_with_no_img, 'event#create_with_no_img' );

    client.put( 'api/games', this.player_a_find_or_create_game_room, 'games#common' );
    client.put( 'api/games', this.player_b_find_or_create_game_room, 'games#common' );
    client.get( 'api/games/:game_id', this.player_b_get_game_detail, 'games#common' );

    client.put( 'api/games/:game_id', this.player_b_play, 'games#common' );

    client.get( 'api/games/:game_id/watch', this.player_b_watch_for_game_start, 'games#wait' );

    // client.get( 'api/stories/:story_id', this.player_b_get_story_detail, 'games#common' );
  },

  player_a_fb_login : function (){
    return {
      json : fixture( 'ori_player_a' ),
      args : {
        player : 'player_a'
      }
    };
  },

  player_b_fb_login : function (){
    return {
      json : fixture( 'ori_player_b' ),
      args : {
        player : 'player_b'
      }
    };
  },

  player_a_create_event : function (){
    var src  = fixture( 'ori_event' );
    var body = lib.multipart( src );

    body.push({
      'content-type'        : 'image/jpg',
      'content-disposition' : 'form-data; name="img_data"; filename="sample.jpg"',
      body                  : fs.readFileSync( FIXTURE_DIR + 'sample.jpg' )
    });

    return {
      headers : {
        'x-auth-token' : fixture( 'player_a' ).token,
        'content-type' : 'multipart/form-data'
      },
      multipart : body
    };
  },

  player_b_create_event_with_no_img : function (){
    return {
      headers : {
        'x-auth-token' : fixture( 'player_b' ).token
      },
      json : fixture( 'ori_event' )
    };
  },

  player_a_find_or_create_game_room : function (){
    return {
      headers : {
        'x-auth-token' : fixture( 'player_a' ).token
      },
      json : true
    };
  },

  player_b_find_or_create_game_room : function (){
    return {
      headers : {
        'x-auth-token' : fixture( 'player_b' ).token
      },
      json : true
    };
  },

  player_b_get_game_detail : function (){
    return {
      headers : {
        'x-auth-token' : fixture( 'player_b' ).token
      },
      json : true,
      params : {
        game_id : fixture( 'game' )._id
      }
    };
  },

  player_b_play : function (){
    return {
      headers : {
        'x-auth-token' : fixture( 'player_b' ).token
      },
      json : true,
      params : {
        game_id : fixture( 'game' )._id
      }
    };
  },

  player_b_watch_for_game_start : function (){
    return {
      headers : {
        'x-auth-token' : fixture( 'player_b' ).token
      },
      qs : {
        type : 'game'
      },
      json : true,
      params : {
        game_id : fixture( 'game' )._id
      }
    };
  }
});
