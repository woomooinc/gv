var Story = {

  statics : {

    show : function ( args, next, no_content, ok ){
      this.findById( args.stroy_id, function ( err, stroy ){
        if( err )    return next( err );
        if( !stroy ) return no_content();

        ok( stroy );
      });
    }
  }
};

module.exports = Story;
