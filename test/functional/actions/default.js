var Class   = require( 'node.class' );
var fs      = require( 'fs' );
var lib     = require( '../lib' );
var fixture = UTILS.fixture;

module.exports = Class.extend({

  init : function ( client ){
    client.post( 'api/login/facebook', this.player_a_fb_login, 'fb#client_login' );
    client.post( 'api/login/facebook', this.player_b_fb_login, 'fb#client_login' );

    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event,             'event#create' );
    client.post( 'api/events', this.create_event_with_no_img, 'event#create_with_no_img' );

    client.post( 'api/events', this.create_event_with_no_img, 'event#create_with_no_img' );
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

  create_event : function (){
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

  create_event_with_no_img : function (){
    return {
      headers : {
        'x-auth-token' : fixture( 'player_b' ).token
      },
      json : fixture( 'ori_event' )
    };
  },
});
