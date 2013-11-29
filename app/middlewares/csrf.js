module.exports = function ( app, express ){
  app.dynamicHelpers({
    csrf : function ( req, res ){
      return req.session._csrf;
    }
  });

  return function ( req, res, next ){
    return ( /^api.greedyvalley.com$/.test( req.headers.host ) ||
             /^\/api\/[a-z]+/.test( req.url )) ?
               next() : express.csrf()( req, res, next );
  };
};
