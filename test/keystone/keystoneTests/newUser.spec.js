const Keystone = require('../common').keystone;
const assert = require('../common').assert;

it('New Models can be saved and retrieved', function(done){

  let User = new Keystone.List('User');
   
  let chef = new User.model({
    name: { first: 'chef', last: 'admin' },
    email: 'chefadmin@keystonejs.com',
    password: 'admin1234',
    canAccessKeystone: true,
    }).save();

    chef.save(function(err) {
        if (err) return console.error(err);
    });

    User.model.find({ name: /^chef/}, ('name email password canAccessKeystone'), function (err, user) {
    if (err) return next(err);
    
    assert.equal(user.name, 'chef');
    assert.equal(user.email, 'chefadmin@keystonejs.com');
    assert.equal(user.password, 'admin1234');
    assert.isTruth(user.canAccessKeystone);
  });  
});

