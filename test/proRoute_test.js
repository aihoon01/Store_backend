// const {expect, assert} = require("chai");
// const request = require("supertest");
// const app = require("../server");
// require('dotenv').config();

// describe('User dashboard Routes', ()=> {
//     beforeEach(function() {
//                 //Setup
//                 const data = {
//                     "password" : "admin@StoreFront22.",
//                     "email" : "steppak199@gmail.com"
//                 };
    
//                 const resBody = {
//                     "firstname": "Admin",
//                     "email": "steppak199@gmail.com",
//                     "location": "Ghana-Accra",
//                     "contact": "+233501590079"
//                 };
                
//                 const statusCode = 200;
    
//                 //Exercise
//                 request(app)
//                 .post('/login')
//                 .send(data)
//                 .set('Accept', 'application/json')
//                 .set('Content-Type', 'application/json')      
            
//     });

//     describe('/dashboard', () => {

//         it('Checks if User is authenticated to access dashboard and returns a 200 status code', async()=>{
//             //Setup
//             const statusCode = 200;
//             const details ={ 
//                 summary: {
//                 "sitesCreated": "-",
//                 "views": "-",
//                 "orders": "-",
//                 "earnings": "-"
//             },
//         vendors: {}
//         };

//             //Exercise
//             const response = await request(app)
//             .get('/dashboard')
//             .set('Accept', 'application/json')
//             .set('Content-Type', 'application/json')
//             .set('Cookie', 'connect.sid')

//             //Verify
//             // expect(response.status).to.eq(statusCode);
//             assert.equal(response.status, statusCode);
//             assert.deepEqual(response.body.vendors, details.vendors)
//             assert.deepEqual(response.body.summary, details.summary)
//         });
//     });

//     describe('/dashboard/profile', () => {
//         it('Updates the user profile and return a 200 status code', async()=> {
//             //Setup
//             const statusCode = 200;
//             const info = {
//                 "location": "Online",
//                 "email": "steppka199@gmail.com",
//                 "firstname": "Admin",
//                 "role": "individual"
//             };

//             //Exercise
//             const response = await request(app)
//             .post('/dashboard/profile')
//             .set('Accept', 'application/json')
//             .set('Content-Type', 'application/json')
//             .set('Cookie', 'connect.sid')
//             .query({id: 1})
//             .send(info)

//             //Verify
//             expect(response.status).to.eq(statusCode);
//             // expect(response.body.data);
//         });

//     });

//     describe('/dashboard/projects', ()=> {
//         it('Creates a user store and save the store properties', async()=> {
//             //Setup
//             const statusCode = 200;
//             const results = {
//             "Amalitech": {"Rate": "90%", "Level": "100"}
//             };
//             //Exercise
//             const response = await request(app)
//             .post('/dashboard/projects')
//             .set('Cookie', 'connect.sid')
//             .query({uid:1})
//             .send(results)

//             //Verify
//             expect(response.status).to.eq(statusCode);
//             // expect(response.body.data)
        
//         });
//     });

//     describe('/dashboard/projects', ()=> {
//         it('Sends all data requested by a registered user', async()=> {
//             //Setup
//             const statusCode = 200;
//             const results = {
//             "Amalitech": {"Rate": "90%", "Level": "100"}
//             };
//             //Exercise
//             const response = await request(app)
//             .get('/dashboard/projects')
//             .set('Cookie', 'connect.sid')
//             .query({uid:1})

//             //Verify
//             expect(response.status).to.eq(statusCode);
//             assert.deepEqual(response.body.Amalitech, results.Amalitech);
        
//         });
//     });
// });
