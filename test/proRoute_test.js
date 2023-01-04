// const {expect} = require("chai");
// const request = require("supertest");
// const app = require("../server");
// require('dotenv').config();

// describe('User dashboard Routes', ()=> {
//     describe('/dashboard', ()=> {
//         it('Checks if User is authenticated to access dashboard and returns a 200 status code', async()=>{
//             //Setup
//             const statusCode = 200;
//             const data = {
//                 "password" : "admin@StoreFront22.",
//                 "email" : "stefanhoon@gmail.com"
//             };

//             //Exercise
//             const response = await request(app)
//             .post('/login')
//             .send(data);
//             response
//             .get('/dashboard')

//             //Verify
//             expect(response.status).to.eq(statusCode);
//             expect(response.body.data);
//         });

//         it('Checks if User is NOT authenticated access dashboard and returns a 402 status code', async()=>{
//             //Setup
//             const statusCode = 402;
//             const data = {
//                 "password" : "admin@StoreFront22.",
//                 "email" : "stefanhoon@gmail.com"
//             };

//             //Exercise
//             const response = await request(app)
//             .get('/dashboard')

//             //Verify
//             expect(response.status).to.eq(statusCode);
//             expect(response.body.data);
//         });
//     });

//     describe('/dashboard/profile', ()=> {
//         it('Updates the user profile and return a 200 status code', async()=> {
//             //Setup
//             const statusCode = 200;
//             const data = {
//                 "password" : "admin@StoreFront22.",
//                 "email" : "stefanhoon@gmail.com"
//             };
//             const info = {
//                 "location": "Online"
//             };

//             //Exercise
//             const response = await request(app)
//             .post('/login')
//             .send(data)
//             response
//             .send(info)
//             .post('/dashboard/profile')

//             //Verify
//             expect(response.status).to.eq(statusCode);
//             expect(response.body.data).has.property('id');
//         });
//     });

//     describe('dashboard/projects', ()=> {
//         it('Sends all data requested by a registered user', async()=> {
//             //Setup
//             const statusCode = 200;
//             const data = {
//                 "password" : "admin@StoreFront22.",
//                 "email" : "stefanhoon@gmail.com"
//             };

//             //Exercise
//             const response = await request(app)
//             .post('/login')
//             .send(data);
//             response
//             .get('/dashboard/projects')

//             //Verify
//             expect(response.status).to.eq(statusCode);
//             expect(response.body.data)
        
//         });
//     });
// })