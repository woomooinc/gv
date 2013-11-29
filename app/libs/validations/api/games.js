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
  )
};
