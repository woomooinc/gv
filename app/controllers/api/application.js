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

  // token or password not match
  unauthorized : function ( res ){
    this.error(
      new Error( 'unauthenticated' ),
      res, 401
    );
  },

  // the client has no right to access the resource
  forbidden : function ( res ){
    this.error(
      new Error( 'forbidden' ),
      res, 403
    );
  },

  token_required : function ( res ){
    this.error(
      new Error( 'token required' ),
      res, 400, '43'
    );
  },

// -----------------------------------------------------------------------------

  token : function ( req, res, next ){
    var self  = this;
    var token = req.headers[ 'fb-token' ];

    if( !token ) return next();

    Player.findOne({
      fb_token : token
    }, function ( err, player ){
      if( err ) return next( err );
      if( player ){
        req.session_player_id = player._id;
        req.session_player    = player;
      }

      next();
    })
  },

  // we must call `token` before `authorized`
  is_authenticated : function ( req, res, next ){
    var token = req.headers[ 'fb-token' ];

    if( !token ){
      return this.token_required( res );
    }

    if( req.session_player_id ) return next();

    this.unauthorized( res );
  },

  is_validate : function ( req, res, next ){
    if( req.form.isValid ) return next();

    this.bad_req( res, req.form.getErrors());
  },

  session_player : function ( req, res, next ){
    var self = this;

    Player.findById( req.session_player_id, function ( err, player ){
      if( err )     return next( err );
      if( !player ) return self.unauthorized( res );

      req.session_player = player;
      next();
    });
  }
});
