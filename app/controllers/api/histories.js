var Application = require( './application' );
var validate    = require( LIB_DIR + 'validations/api/histories' );
var History     = Model( 'History' );

module.exports = Application.extend( validate, {

  init : function ( before, after ){
    before( this.token );
    before( this.is_authenticated );

    before( this.validate_show );
    before( this.is_validate );
  },

  show : function ( req, res, next ){
    var self = this;
    var args = {
      history_id : req.form.id
    };

    History.show( args, next,
      function (){
        self.no_content( res );
      },
      function ( history ){
        self.ok( res, history );
      });
  }
});
