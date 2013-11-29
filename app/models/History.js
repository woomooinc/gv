var History = {

  statics : {

    show : function ( args, next, no_content, ok ){
      this.findById( args.history_id, function ( err, history ){
        if( err )      return next( err );
        if( !history ) return no_content();

        ok( history );
      });
    }
  }
};

module.exports = History;
