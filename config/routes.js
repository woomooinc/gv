module.exports = function ( map ){
  map.get( '/','welcome#index' );

  map.namespace( 'api', function ( api ){
    api.get(  'login/facebook', 'fb#new' );
    api.post( 'login/facebook', 'fb#create' );

    api.get(  'players/:id', 'players#show' );
    api.put(  'players/:id', 'players#update' );

    api.get(  'games/:id', 'games#show' );
    api.put(  'games',     'games#update_or_create' );

    api.post( 'events', 'events#create' );

    api.get(  'players/:player_id/events', 'player_events#show' );

    api.get(  'socket', 'socket#watch' );
  });
};
