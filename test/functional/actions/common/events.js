var fs      = require( 'fs' );
var lib     = require( '../../lib' );
var fixture = UTILS.fixture;

module.exports = {

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
  }
};
