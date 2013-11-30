var should  = require( 'should' );
var fixture = UTILS.fixture;

module.exports = {

  common : function ( args, err, res, body, log, next ){
    should.not.exist( err );

    res.should.be.json;
    res.should.have.status( 200 );

    fixture( 'story',  body );
    next();
  }
};
