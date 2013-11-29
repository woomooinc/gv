var form  = require( 'express-form2' );
var field = form.field;

form.configure({
  autoTrim      : true,
  errorCodeOnly : true
});

module.exports = {

  validate_watch : form(
    field( 'event' ).required()
  )
};
