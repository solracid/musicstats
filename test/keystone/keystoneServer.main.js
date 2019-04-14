const Keystone = require("./common").keystone
const moment = require('./common').moment

function importTest(name, path) {
  describe(name, function () {
      require(path);
  });
}

describe("KeystoneJS Server Tests", function () {

  before(function(done){
    Keystone.init({
        'name': 'Keystone CMS',
        'mongo': 'mongodb://127.0.0.1:27017/mocha_tests',
        'cookie secret': 'My_Biscuit',
    });
    Keystone.start({
      onMount: function () {
        console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: KeystoneJS mounted Successfuly');
        },
      onStart: function() {
        console.log([moment().format('HH:mm:ss:SSS')] + ' e2e: KeystoneJS Started Successfully');
        done();
        }
    });
});

  after(function(done){
    Keystone.mongoose.connection.close();
    console.log("Mongoose connection closed")
    done();
  });

  importTest("Keystone connects to the DB", './keystoneTests/mongooseConnection.spec');
  importTest("Keystone registers Schemas as Lists", './keystoneTests/registerLists.spec');
  
  after(function () {
      console.log("after all tests");
  });    
});


