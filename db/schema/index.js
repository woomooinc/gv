var Schema = function ( Schema ){

/**
 * Module dependencies.
 * @private
 */
  var ObjectId = Schema.ObjectId;

  var common_opt = {
    versionKey : false
  };

  var Models = {

    Player : new Schema({
      game_id    : { type : ObjectId, ref : 'Game' }, // current playing game
      name       : { type : String, required : true }, // startup name
      fb_id      : { type : String, default : '' },
      fb_token   : { type : String, default : '' },
      fb_raw     : { type : String, default : '' },
      email      : { type : String, required : true, unique : true },
      avatar     : { type : String, required : true },

      buzz       : { type : Number, default : 0 }, // 0 ~ 100
      position   : { type : Number, default : 0 }, // 0 ~ 29

      created_at : { type : Number, default : Date.now },
      updated_at : { type : Number, default : Date.now }
    }, common_opt ),

    Game : new Schema({
      players        : [{ type : ObjectId, ref : 'Player' }],
      events         : [{ type : ObjectId, ref : 'Event' }],
      current_player : { type : ObjectId, required : true, ref : 'Player' },
      end            : { type : Boolean, default : false },

      created_at     : { type : Number, default : Date.now },
      updated_at     : { type : Number, default : Date.now }
    }, common_opt ),

    Event : new Schema({
      player_id  : { type : ObjectId, ref : 'Player' }, // event creator
      desc       : { type : String, default : '' },
      point      : { type : Number, default : 1 },
      url        : { type : String, default : '' },

      created_at : { type : Number, default : Date.now },
      updated_at : { type : Number, default : Date.now }
    }, common_opt )
  };

  // auto update `updated_at` on save
  Object.keys( Models ).forEach( function ( model ){
    if( Models[ model ].tree.updated_at !== undefined ){
      Models[ model ].pre( 'save', function ( next ){
        this.updated_at = this.isNew?
          this.created_at :
          Date.now();

        next();
      });
    }
  });

  return Models;
};

/**
 * Exports module.
 */
module.exports = Schema;
