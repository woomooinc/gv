var should  = require( 'should' );
var fixture = UTILS.fixture;

module.exports = {

  create : function ( args, err, res, body, log, next ){
    should.not.exist( err );

    res.should.be.json;
    res.should.have.status( 201 );

    var event = JSON.parse( body );

    Object.keys( event ).should.have.lengthOf( 8 );

    event.should.have.property( '_id' ).with.lengthOf( 24 );
    event.should.have.property( 'player_id' ).with.lengthOf( 24 );
    event.should.have.property( 'title' ).have.type( 'string' );
    event.should.have.property( 'desc' ).have.type( 'string' );
    event.should.have.property( 'buzz' ).have.type( 'number' );
    event.should.have.property( 'url' ).have.type( 'string' );
    event.created_at.toString().should.have.lengthOf( 13 );
    event.updated_at.toString().should.have.lengthOf( 13 );

    fixture( 'event',  event );
    next();
  },

  create_with_no_img : function ( args, err, res, body, log, next ){
    should.not.exist( err );

    res.should.be.json;
    res.should.have.status( 201 );

    Object.keys( body ).should.have.lengthOf( 8 );

    body.should.have.property( '_id' ).with.lengthOf( 24 );
    body.should.have.property( 'player_id' ).with.lengthOf( 24 );
    body.should.have.property( 'title' ).have.type( 'string' );
    body.should.have.property( 'desc' ).have.type( 'string' );
    body.should.have.property( 'buzz' ).have.type( 'number' );
    body.should.have.property( 'url' ).have.type( 'string' );
    body.created_at.toString().should.have.lengthOf( 13 );
    body.updated_at.toString().should.have.lengthOf( 13 );

    fixture( 'event',  body );
    next();
  },
};

