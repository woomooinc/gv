var fixture = UTILS.fixture;

module.exports = {

  build_2_players_and_30_events : function ( client ){
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

  }
};
