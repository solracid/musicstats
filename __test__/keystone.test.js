const Keystone = require('keystone');


describe('Test Keystone CMS own features', () => {

    beforeAll( async(done) => {
        
        jest.setTimeout(30000);
    
        console.log('beforeAll');
        Keystone.init({
            'name': 'Keystone CMS',
            'mongo': 'mongodb://127.0.0.1:27017/jest_${process.env.TEST_SUITE}',
            'cookie secret': 'My_Biscuit',
        });
        console.log('beforeAll 2'); 
        await Keystone.start({
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
   
        console.log('beforeAll 3')

        done();
    });
    
    
    afterAll((done)=> {
        Keystone.closeDatabaseConnection(()=>{})
        console.log('Keystone disconnected');
        return done();
    });

   
    test('Keystone connects to MongoDB', (done) => {
        console.log('perform test');
        expect(Keystone.mongoose.connections._listening).toBeTruthy;
        expect(Keystone.mongoose.connections.length).toBeGreaterThan(0);
    });

    
});


