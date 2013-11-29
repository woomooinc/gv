var fs = require( 'fs' );

module.exports = {

  check_len : function ( $obj, name, len, errs ){
    if( $obj.length !== len ){
      errs.push( 'The amount of ' + name + ' should be `' + len + '` but now is ' + $obj.length );
    }

    return errs;
  },

  check_val : function ( subject, name, val, errs ){
    if( subject !== val ){
      errs.push( 'Value of ' + name + ' should be `put` but now is ' + subject );
    }

    return errs;
  },

  rm_file : function ( file ){
    if( fs.existsSync( file )){
      fs.unlinkSync( file );
    }
  },

  /**
   * multipart
   *
   * Transform json to http POST body
   *
   * @param body {Object} json object
   * @return
   */
  multipart : function ( body ){
    var result = [];
    var travel = function ( obj, ns ){
      Object.keys( obj ).forEach( function ( key ){
        var tmp  = obj[ key ];
        var type = UTILS.is( tmp );
        var name = ns !== undefined ?
          ns + '[' + key + ']' :
          key;

        if( type === 'object' ){
          travel( tmp, name );
        }else{
          result.push({
            'content-disposition' : 'form-data; name="' + name + '";',
            body                  : tmp.toString()
          });
        }
      });
    };

    travel( body );

    return result;
  }
};
