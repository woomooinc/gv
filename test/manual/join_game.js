var fs        = require( 'fs' );
var req       = require( 'request' );
var file_path = __dirname.split( 'manual' )[ 0 ] + 'functional/fixtures/player_b.json';
var player    = JSON.parse( fs.readFileSync( file_path ));

// player is trying to matching a game
req({
  method  : 'PUT',
  uri     : 'http://127.0.0.1:4000/api/games',
  headers : {
    'x-auth-token' : player.token
  },
}, function ( err, res, body ){
  if( err ) return console.log( err );

  console.log( body );
});
