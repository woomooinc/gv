var Event = {

  statics : {

    create : function ( args, next, creataed ){
      // upload

      console.log( args );

      new this({
        desc  : args.title,
        desc  : args.desc,
        point : args.point,
        player_id : args.session_player_id
      }).save( function ( err, event ){
        if( err ) return next( err );

        creataed( event );
      });
    }
  }
};

module.exports = Event;
