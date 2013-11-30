var fixture = UTILS.fixture;

module.exports = {

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
  }
};
