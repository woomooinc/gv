var form  = require( 'express-form2' );
var field = form.field;
var r     = require( '../regex' );

form.configure({
  autoTrim      : true,
  errorCodeOnly : true
});

module.exports = {

  validate_show : form(
    field( 'id' ).required().is( r.id, '01' )
  ),

  validate_update : form(
    field( 'id' ).required().is( r.id, '01' ),
    field( 'name' ).len( 1, 50, '02' ),
    field( 'email' ).isEmail().custom( function ( val ){
      return val ? val.toLowerCase() : val;
    }),
    field( 'buzz' ).isInt().min( 0 ).max( 100 ),
    field( 'position' ).isInt().min( 0 ).max( 29 )
  )
};
