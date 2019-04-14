const Keystone = require('../common').keystone;
const assert = require('../common').assert;

it('Mongoose is connected to Mongo', function(done){
    assert.equal(Keystone.mongoose.connection.readyState, 1);
    done();
  });