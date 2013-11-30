module.exports = function ( map ){
  map.get( '/','welcome#index' );

  map.namespace( 'api', function ( api ){
    api.get(  'login/facebook', 'fb#new' );
    api.post( 'login/facebook', 'fb#create' );

    api.get(  'games/:id',       'games#show' );
    api.put(  'games',           'games#create_or_update' );
    api.put(  'games/:id',       'games#update' );
    api.get(  'games/:id/watch', 'games#watch' );

    api.post( 'events', 'events#create' );

    api.get(  'stories/:id', 'stories#show' );

  });
};
