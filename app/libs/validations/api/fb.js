var form  = require( 'express-form2' );
var field = form.field;
var r     = require( '../regex' );

form.configure({
  autoTrim      : true,
  errorCodeOnly : true
});

module.exports = {

  validate_create : form(
    field( 'fb_id' ).required(),
    field( 'fb_token' ).required()
  )
};
