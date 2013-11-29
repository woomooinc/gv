var Class  = require( 'node.class' );
var Player = Model( 'Player' );

module.exports = Class.extend({

  ok : function ( res, body ){
    res.statusCode = 200;
    res.result     = body;

    res.json( body );
  },

  created : function ( res, body ){
    res.statusCode = 201;
    res.result     = body;

    res.json( body );
  },

  // must not has res body
  no_content : function ( res ){
    res.header( 'warning', 404 );
    this.deleted( res );
  },

// -----------------------------------------------------------------------------

  token : function ( req, res, next ){
    var self  = this;
    var token = req.headers[ 'fb-token' ];

    if( !token ) return next();

    Token.find_one_by_key( token, function ( err, token ){
      if( err ) return next( err );
      if( token ){
        req.token           = token;
        req.session_user_id = token.user_id;

        // hijack res.end, update the token when res.end invoke
        var end = res.end;
        res.end = function ( chunk, encoding ){
          if( req.token ){
            req.token.markModified( 'trunk' );
            req.token.updated_at = Date.now();
            req.token.save( function ( err, token, count ){
              err && LOG.error( 500, res, err );
            });
          }

          res.end = end;
          res.end( chunk, encoding );
        };
      }

      next();
    });
  },

  // we must call `token` before `authorized`
  is_authenticated : function ( req, res, next ){
    var token = req.headers[ 'fb-token' ];

    if( !token ){
      return this.token_required( res );
    }

    if( req.session_user_id ) return next();

    this.unauthorized( res );
  },

  is_validate : function ( req, res, next ){
    if( req.form.isValid ) return next();

    this.bad_req( res, req.form.getErrors());
  },

  current_player : function ( req, res, next ){
    var seld = this;

    Player.findById( req.form.id, function ( err, player ){
      if( err )     return next( err );
      if( !player ) return self.no_content( res );

      req.current_player = player;
      next();
    })
  },

    next( err );
  }
});
