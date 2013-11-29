module.exports = function ( map ){
  map.get( '/','welcome#index' );

  map.namespace( 'api', function ( api ){
    api.get(  'login/facebook', 'fb#new' );
    api.post( 'login/facebook', 'fb#create' );

    api.get(  'games/:id',       'games#show' );
    api.put(  'games',           'games#update_or_create' );
    api.put(  'games/:id',       'games#update' );
    api.get(  'games/:id/watch', 'games#watch' );

    api.post( 'events', 'events#create' );

    api.get(  'histories/:id', 'histories#show' );

  });
};
