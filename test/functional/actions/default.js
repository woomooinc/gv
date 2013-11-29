var Class   = require( 'node.class' );
var fs      = require( 'fs' );
var lib     = require( '../lib' );
var fixture = UTILS.fixture;

module.exports = Class.extend({

  init : function ( client ){
    client.post( 'api/login/facebook', this.facebook_login, 'fb#client_login' );

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

  facebook_login : function (){
    return {
      json : fixture( 'someone' )
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
        'x-auth-token' : fixture( 'user' ).token,
        'content-type' : 'multipart/form-data'
      },
      multipart : body
    };
  },

  create_event_with_no_img : function (){
    return {
      headers : {
        'x-auth-token' : fixture( 'user' ).token
      },
      json : fixture( 'ori_event' )
    };
  },
});
