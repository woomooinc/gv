var should = require( 'should' );

module.exports = {

  client_login : function ( args, err, res, body, log, next ){
    should.not.exist( err );

    res.should.be.json;
    res.should.have.status( 201 );

    body.should.have.property( '_id' ).with.lengthOf( 24 );
    body.should.have.property( 'fb_id' );
    body.should.have.property( 'fb_token' ).have.type( 'string' );
    body.should.have.property( 'token' ).have.type( 'string' );
    body.should.have.property( 'name' ).have.type( 'string' );
    body.should.have.property( 'email' ).have.type( 'string' );
    body.should.have.property( 'avatar' ).have.type( 'string' );
    body.should.have.property( 'position' ).have.type( 'number' );
    body.should.have.property( 'buzz' ).have.type( 'number' );
    body.created_at.toString().should.have.lengthOf( 13 );
    body.updated_at.toString().should.have.lengthOf( 13 );

    UTILS.fixture( args.player, body );
    next();
  }
};

