var Class   = require( 'node.class' );
var lib     = require( '../lib' );
var fixture = UTILS.fixture;

module.exports = Class.extend(

  require( './data' ),
  require( './common/fb' ),
  require( './common/events' ),
  require( './common/games' ),

{

  init : function ( client ){
    this.build_2_players_and_30_events( client );

    client.put( 'api/games',                this.player_a_find_or_create_game_room, 'games#common' );
    client.get( 'api/games/:game_id/watch', this.player_b_watch_for_game_start,     'games#player_joined' );
  }
});
