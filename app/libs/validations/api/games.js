var form  = require( 'express-form2' );
var field = form.field;
var r     = require( '../regex' );

form.configure({
  autoTrim      : true,
  errorCodeOnly : true
});

module.exports = {

  validate_id : form(
    field( 'id' ).required().is( r.id, '01' )
  ),

  validate_watch : form(
    field( 'id' ).required().is( r.id, '01' ),
    field( 'type' ).required().is( r.watch_type, '01' )
  ),
};
