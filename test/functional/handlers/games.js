var should  = require( 'should' );
var fixture = UTILS.fixture;

module.exports = {

  common : function ( args, err, res, body, log, next ){
    should.not.exist( err );

    res.should.be.json;
    res.should.have.status( 200 );

    Object.keys( body ).should.have.lengthOf( 7 );

    body.should.have.property( '_id' ).with.lengthOf( 24 );

    body.players.should.be.instanceof( Array );
    body.events.should.be.instanceof( Array );
    body.should.have.property( 'current_player' ).have.type( 'string' );
    body.should.have.property( 'status' ).have.type( 'string' );
    body.created_at.toString().should.have.lengthOf( 13 );
    body.updated_at.toString().should.have.lengthOf( 13 );

    fixture( 'game',  body );
    next();
  },

  wait : function ( args, err, res, body, log, next ){
    should.not.exist( err );

    res.should.be.json;
    res.should.have.status( 200 );

    Object.keys( body ).should.have.lengthOf( 1 );
    body.should.have.property( 'api' ).have.type( 'string' );

    next();
  },

  player_joined : function ( args, err, res, body, log, next ){
    should.not.exist( err );

    res.should.be.json;
    res.should.have.status( 200 );

    Object.keys( body ).should.have.lengthOf( 3 );
    body.should.have.property( 'api' ).have.type( 'string' );
    body.should.have.property( 'data' ).have.type( 'object' );
    body.should.have.property( 'changed' ).have.type( 'object' );
    body.data.should.have.property( 'game_id' ).with.lengthOf( 24 );
    body.changed.should.have.property( 'player_id' ).with.lengthOf( 24 );

    next();
  }
};
