const Keystone = require('keystone');

describe('test', function(){

    this.timeout(10000);
    
    before( function(done){

        Keystone.init({
            'name': 'Keystone CMS',
            'mongo': 'mongodb://127.0.0.1:27017/mocha_tests',
            'cookie secret': 'My_Biscuit',
        });
        
        console.log('Keystone.init');
        
        Keystone.start({
            onMount: function() {
                console.log('KeystoneJS mounted');
            },
            onStart: function() {
                console.log('KeystoneJS onStart');
            },
            onHttpServerCreated: function() {
                console.log('KeystoneJS onHttpServerCreated');
            },
            onHttpsServerCreated: function() {
                console.log('KeystoneJS onHttpsServerCreated');
            }
        });
    
        return done();
    });

});


console.log('Keystone.start');