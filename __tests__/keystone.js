const Keystone = require('keystone');

beforeAll( done => {
    Keystone.init({
        'name': 'Keystone CMS',
        'cookie secret': 'My_Biscuit',
      });
    Keystone.start();

    done();
})

describe('Test Keystone CMS own features', () => {

    test('Keystone connects to MongoDB', (done) => {
        expect(Keystone.mongoose.connections._listening).toBeTruthy;
        done();
    });
});

// afterAll(()=> {
//     Keystone.keystone.closeDatabaseConnection(()=>{})
// })