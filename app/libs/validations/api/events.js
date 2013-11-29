var form  = require( 'express-form2' );
var field = form.field;

form.configure({
  autoTrim      : true,
  errorCodeOnly : true
});

module.exports = {

  validate_create : form(
    field( 'desc' ).required().maxLength( 1000, '08' ),
    field( 'point' ).required().isInt().min( -100 ).max( 100 )
  )
};
