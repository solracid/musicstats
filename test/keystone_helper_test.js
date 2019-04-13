const Keystone = require('keystone');
const assert = require('chai').assert;

describe('Posts', function() {
    
    before(function(done){

        Keystone.init({
            'name': 'Keystone CMS',
            'mongo': 'mongodb://127.0.0.1:27017/mocha_tests',
            'cookie secret': 'My_Biscuit',
        });

        Keystone.import('../server/models/');

        Keystone.start({});

        done();
    });
    
    
    beforeEach(function(done){
      if (Keystone.mongoose.connection.db) return done();
      console.log('Connecting to ' + dbURI)
      Keystone.mongoose.connect(dbURI, done);
    });

    after(function(done){
      Keystone.mongoose.connection.close();
      console.log("Mongoose connection closed")
      done();
    });
   
    it('Mongoose is connected to Mongo', function(done){
      assert.equal(Keystone.mongoose.connection.readyState, 1);
      done();
    });
   
    it('should be a Mongoose Model', function(done) {
      Recipe = Keystone.list('recipes');
   
      assert.isObject(Recipe);
      assert.property(Recipe, 'name');     
      assert.property(Recipe, 'state');
      assert.isObject(Recipe.ingredientList);
   
      done();
    });
  });
