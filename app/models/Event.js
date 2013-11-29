var Flow   = require( 'node.flow' );
var moment = require( 'moment' );
var fs     = require( 'fs' );
var mkdirp = require( 'mkdirp' );

var Event = {

  statics : {

    create : function ( args, next, creataed ){
      var img_data = args.img_data;

      var event = new this({
        title     : args.title,
        desc      : args.desc,
        buzz      : args.buzz,
        player_id : args.session_player_id
      });

      var flow = new Flow();

      if( img_data ){
        var dir = event.gen_dir();

        flow.series( function ( _next ){
          fs.exists( dir, function ( is_exist ){
            if( is_exist ) return _next()

            mkdirp( event.gen_dir(), function ( err ){
              if( err ) return _next( err );

              _next()
            });
          });
        });

        flow.series( function ( _next ){
          var format = img_data.type.split( '/' )[ 1 ];

          fs.rename( img_data.path, event.gen_new_path( format ), function ( err ){
            if( err ) return _next( err );

            _next();
          });
        });
      }

      flow.error( function ( err ){
        if( err ) return next( err );
      });

      flow.end( function ( _next ){
        event.save( function ( err, event ){
          if( err ) return next( err );

          creataed( event );
        });
      });
    }
  },

  methods : {

    gen_dir : function (){
      return PUB_DIR + 'img/' + moment().format( 'YYYYMMDD' );
    },

    gen_url : function ( format ){
      var host   = CONF.server.base_url;
      var dir    = moment().format( 'YYYYMMDD' );
      var uid    = UTILS.uid( 24 );
      var format = format;

      this.tmp_url = [ 'img/', dir, '/', uid, '_o.', format ].join( '' );

      return this.url = host + this.tmp_url;
    },

    gen_new_path : function ( format ){
      this.gen_url( format );

      return PUB_DIR + this.tmp_url;
    }
  }
};

module.exports = Event;
