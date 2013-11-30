var fixture = UTILS.fixture;

module.exports = {

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
  },

  player_b_watch_for_story_start : function (){
    return {
      headers : {
        'x-auth-token' : fixture( 'player_b' ).token
      },
      qs : {
        type : 'story'
      },
      json : true,
      params : {
        game_id : fixture( 'game' )._id
      }
    };
  }
};
