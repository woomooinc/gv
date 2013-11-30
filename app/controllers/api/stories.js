var Application = require( './application' );
var validate    = require( LIB_DIR + 'validations/api/stories' );
var Story       = Model( 'Story' );

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
      stroy_id : req.form.id
    };

    Story.show( args, next,
      function (){
        self.no_content( res );
      },
      function ( stroy ){
        self.ok( res, stroy );
      });
  }
});
