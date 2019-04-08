const Keystone = require('keystone');


console.log('Before Init');

Keystone.init({
    'name': 'Keystone CMS',
    'mongo': 'mongodb://127.0.0.1:27017/mocha_tests',
    'cookie secret': 'My_Biscuit',
});

console.log('Keystone.init');

Keystone.import('../server/models/');


// Keystone.mongoose.connect('http://0.0.0.0:3000/', 'mocha_tests');
// Keystone.mongoose.connection.on('open', function() {

//     // Run tests here

//     // Use Keystone.list('Key') to access Lists and execute queries
//     // as you would in your main application

// });

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


describe('Posts', function() {
    beforeEach(function(done){
      if (Keystone.mongoose.connection.db) return done();
      console.log('Connecting to ' + dbURI)
      Keystone.mongoose.connect(dbURI, done);
    });
   
    it('should be a connection to Mongo', function(done){
      Keystone.mongoose.connection.db.should.be.a('Object');
      done();
    });
   
    it('should be a Mongoose Model', function(done) {
      Post = Keystone.list('Post');
   
      Post.should.be.a('Object');
      Post.should.have.property('model').be.a('Function');
      Post.should.have.property('schema').be.a('Object');
   
      done();
    });
  });