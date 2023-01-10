// const {expect} = require("chai");
// const request = require("supertest");
// const app = require("../server");
// require('dotenv').config();

// describe('User dashboard Routes', ()=> {
//     before(function(done) {
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
//                 .set(saveCookies)
//                 //Verify
//                 .end( function(err, res) {
//                 expect(res.status).to.eq(statusCode);
//                 expect(res.body.id).not.to.be.null;
//                 expect(res.body.firstname).to.eq(resBody.firstname);
//                 expect(res.body.email).to.eq(resBody.email);
//                 expect(res.body.location).to.eq(resBody.location);
//                 expect(res.body.contact).to.eq(resBody.contact);
//                 if (err) {
//                     throw err;
//                 } 
//                 done();
//                 });         
            
//     });

//     describe('/dashboard', ()=> {
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
//     };

//             //Exercise
//             const response = await request(app)
//             .get('/dashboard')
//             .set('Accept', 'application/json')
//             .set('Content-Type', 'application/json')
//             .set('Cookie', 'connect.sid=s%3AtQ2I1E4luUDDKAaATn5w41LCIUveOp4I.uIOLQGsDx8dPWzCAtw1XKStUfuw49yRj7RPcNR6h%2BP8')

//             //Verify
//             expect(response.status).to.eq(statusCode);
//             expect(response.body.details).to.eq(details.summary);
//             expect(response.body.details).to.eq(details.vendors);
//         });

//     // describe('/dashboard/profile', ()=> {
//     //     it('Updates the user profile and return a 200 status code', async()=> {
//     //         //Setup
//     //         const statusCode = 200;
//     //         const data = {
//     //             "password" : "admin@StoreFront22.",
//     //             "email" : "steppak199@gmail.com"
//     //         };
//     //         const info = {
//     //             "location": "Online"
//     //         };

//     //         //Exercise
//     //         const response = await request(app)
//     //         .post('/dashboard/profile')
//     //         .send(info)

//     //         //Verify
//     //         expect(response.status).to.eq(statusCode);
//     //         expect(response.body.data);
//     //     });
//     // });

//     // describe('dashboard/projects', ()=> {
//     //     it('Sends all data requested by a registered user', async()=> {
//     //         //Setup
//     //         const statusCode = 200;
//     //         const data = {
//     //             "password" : "admin@StoreFront22.",
//     //             "email" : "stefanhoon@gmail.com"
//     //         };

//     //         //Exercise
//     //         const response = await request(app)
//     //         .post('/login')
//     //         .send(data);
//     //         response
//     //         .get('/dashboard/projects')

//     //         //Verify
//     //         expect(response.status).to.eq(statusCode);
//     //         expect(response.body.data)
        
//     //     });
//     // });
// });
// });
