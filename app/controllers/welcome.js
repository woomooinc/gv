var Class = require( 'node.class' );

module.exports = Class.extend({

  index : function ( req, res, next ){
    res.render( 'welcome/index', {
      layout : false
    });
  },

  game : function ( req, res, next ){
    res.render( 'welcome/game', {
      layout : false
    });
  },
});
