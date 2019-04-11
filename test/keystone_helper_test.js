const Keystone = require('keystone');
const assert = require('chai').assert;


describe('Posts', function() {
    
    beforeAll('Start Keystone', function(done){
        console.log('Before Init');

        Keystone.init({
            'name': 'Keystone CMS',
            'mongo': 'mongodb://127.0.0.1:27017/mocha_tests',
            'cookie secret': 'My_Biscuit',
        });

        console.log('Keystone.init');

        Keystone.import('../server/models/');

        Keystone.start({
          onMount: function() {
              console.log('KeystoneJS mounted');
          },
          onStart: function() {
              console.log('KeystoneJS started');  
          },
          onHttpServerCreated: function() {
              console.log('KeystoneJS HTTP');
          },
          onHttpsServerCreated: function() {
              console.log('KeystoneJS HTTPS');
          }
        });
    });
    
    
    beforeEach(function(done){
      if (Keystone.mongoose.connection.db) return done();
      console.log('Connecting to ' + dbURI)
      Keystone.mongoose.connect(dbURI, done);
    });
   
    it('Mongoose is connected to Mongo', function(done){
      assert.equal(Keystone.mongoose.connection.readyState, 1);
      done();
    });
   
    it('should be a Mongoose Model', function(done) {
      Post = Keystone.list('Post');
   
      assert.isObject(Post);
      assert.Property(Post, 'model');
      assert.isFunction(Post.model); 
      
      assert.Property(Post, 'schema');
      assert.isObject(Post.schema);
   
      done();
    });
  });
