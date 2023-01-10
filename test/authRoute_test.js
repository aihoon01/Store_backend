// const {expect} = require("chai");
// const request = require("supertest");
// const app = require("../server");
// require('dotenv').config();
// const baseURL = process.env.baseURLT; //Change for production
// describe('ACCOUNT REGISTRATION AND SIGN IN', () => {
//     // Test For various authentication endpoints
//     // describe('/register', () => {
//     //     it('Registers New users and returns a 200 status code', async () => {
//     //         //Setup
//     //         const data = {
//     //             "firstname": "admin",
//     //             "email": "stefanhoons@gmail.com",
//     //             "password": "admin@StoreFront22.",
//     //             "password2": "admin@StoreFront22."
                
//     //         };
//     //         const statusCode = 201;

//     //         //Exercise
//     //         const response = await request(app)
//     //         .post('/register')
//     //         .query({role: 'individual'})
//     //         .send(data)
//     //         //Verify
//     //         expect(response.status).to.eq(statusCode);
//     //         expect(response.body.data);

//     //     });

//     //     it('Checks if email already exists and sends a 404 status code and a message prompt', async () => {
//     //         //Setup
//     //         const data = {
//     //             "firstname": "admin",
//     //             "email": "stefanhoon@gmail.com",
//     //             "password": "admin@StoreFront22.",
//     //             "password2": "admin@StoreFront22."
                
//     //         };
//     //         const statusCode = 404;

//     //         //Exercise
//     //         const response = await request(app)
//     //         .post('/register')
//     //         .query({role: 'individual'})
//     //         .send(data)
//     //         //Verify
//     //         expect(response.status).to.eq(statusCode);
//     //         expect(response.body.data)

//     //     });

//     //      it ("Checks user inputs if they meet the input requirements", async() => {
//     //         //Setup
//     //         const data = {
//     //             "firstname": "admin",
//     //             "email": "stefanhoongmail.com",
//     //             "password": "admin@StoreFront",
//     //             "password2": "admin@StoreFront"
                
//     //         };
//     //         const statusCode = 401;
//     //         //Exercise
//     //         const response = await request(app)
//     //         .post('/register')
//     //         .query({role: 'individual'})
//     //         .send(data)

//     //         //Verify
//     //         expect(response.status).to.eq(statusCode);
//     //         expect(response.body.data);
//     //      })
//     // });

//     // describe('/verify-email', ()=> {
//     //     it('Checks if verification link has already been registered and return a 404 status code and prompt', async()=> {
//     //         //Setup
//     //         const url = 'https://amalistore.netlify.app/authentication/verify-email?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmbmFtZSI6IkFkbWluIiwibG5hbWUiOiJhZG1pbiIsImJuYW1lIjoiIiwiZW1haWwiOiJzdGVmYW5ob29uQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiQDE5ZXBoZW5QSy4hIiwicm9sZSI6ImluZGl2aWR1YWwifQ.z5cn8kSAx4C1j9QkZI3WuVi99tVV8XVsrZUTN_UYKO4'

//     //         const statusCode = 404;
            
//     //         //Exercise
//     //         const response = await request(app)
//     //         .get('/verify-email')
            
//     //         //Verify
//     //         expect(response.status).to.eq(statusCode);
//     //         expect(response.body.data);
        
//     //     });

//     //     it('Checks if verification link is invalid and return a 404 status code with prompt', async()=> {
//     //         //Setup
//     //         const url = 'https://amalistore.netlify.app/authentication/verify-email?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmbmFtZSI6IkFkbWluIiwibGhbWUiOiJhZG1pbiIsImJuYW1lIjoiIiwiZW1haWwiOiJzdGVmYW5ob29uQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiQDE5ZXBoZW5QSy4hIiwicm9sZSI6ImluZGl2aWR1YWwifQ.z5cn8kSAx4C1j9QkZI3WuVi99tVV8XVsrZUTN_UYKO4'

//     //         const statusCode = 404;
            
//     //         //Exercise
//     //         const response = await request(app)
//     //         .get('/verify-email')
            
//     //         //Verify
//     //         expect(response.status).to.eq(statusCode);
//     //         expect(response.body.data);
        
//     //     });
//     // });

//     describe("/login", ()=> {
//         it('Checks if user is authenticated to log in', async()=> {
//             //Setup
//             const data = {
//                 "password" : "admin@StoreFront22.",
//                 "email" : "steppak199@gmail.com"
//             };

//             const resBody = {
//                 "firstname": "Admin",
//                 "email": "steppak199@gmail.com",
//                 "location": "Ghana-Accra",
//                 "contact": "+233501590079"
//             };
            
//             const statusCode = 200;

//             //Exercise
//             const response = await request(app)
//             .post('/login')
//             .send(data)

//             //Verify
//             expect(response.status).to.eq(statusCode);
//             expect(response.body.id).not.to.be.null;
//             expect(response.body.firstname).to.eq(resBody.firstname);
//             expect(response.body.email).to.eq(resBody.email);
//             expect(response.body.location).to.eq(resBody.location);
//             expect(response.body.contact).to.eq(resBody.contact);
//         });

//         it('Checks if user is NOT authenticated to log in', async()=> {
//             //Setup
//             const data = {
//                 "password" : "admin@StorFront22.",
//                 "email" : "stefanhn@gmail.com"
//             };
            
//             const statusCode = 401;

//             //Exercise
//             const response = await request(app)
//             .post('/login')
//             .send(data)

//             //Verify
//             expect(response.status).to.eq(statusCode);
//             expect(response.body.data)
//         })
//     });

//     describe('/Logout', ()=> {
//         it('Successfully logs a user out with a 200 status code', async()=> {
//             //Setup
//             const statusCode =200;
//             //Exercise
//             const response = await request(app)
//             .get('/logout')
//             //Verify
//             expect(response.status).to.eq(statusCode);
            
//         });
//     });

//     describe('/Reset', ()=> {
//         it('Sends a reset password link if user exists with a 200 status code', async()=> {
//             //Setup
//             const statusCode = 200;
//             const data = {
//                 "email": "stefanhoon@gmail.com"
//             };

//             //Exercise
//             const response = await request(app)
//             .post('/reset')
//             .send(data)

//             //Verify
//             expect(response.status).to.eq(statusCode);
//             expect(response.body.data);
//         });
//     });

//     describe('/Reset-Password', ()=> {
//         it('Checks if password reset link is not valid and sends a 404 status code', async()=> {
//             //Setup
            
//             const statusCode = 404;
//             const data = {
//                 "password" : "89usda.eaworSS@",
//                 "password2": "89usda.eaworSS@"
//             };

//             //Exercise
//             const response =  await request(app)
//             .post('/reset-password?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJleHBpcmUiOjE2NzI0NzU2OTM3MDh9.qvjYrY36GQjDeThq3681TsE3GhzsXeaHca7S_eJOxC8&id=1')
//             .send(data)
//             .set('Accept', 'application/json')
//             .set('Content-type', 'application/json')
            

            
//             //Verify
//             expect(response.status).to.eq(statusCode);
//             expect(response.body.data);
//             // done();
//     });

//         it('Checks if user inputs are invalid and sends a 401 status code', async()=> {
//             //Setup
            
//             const statusCode = 401;
//             const data = {
//                 "password" : "89usda.eaworSS",
//                 "password2": "89usda.eaworS"
//             }

//             //Exercise
//             const response = await request(app)
//             .post('/reset-password?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJleHBpcmUiOjE2NzI0NzU2OTM3MDh9.qvjYrY36GQjDeThq3681TsE3GhzsXeaHca7S_eJOxC8&id=1')
//             .send(data)
            
//             //Verify
//             expect(response.status).to.eq(statusCode);
//             expect(response.body.data);
//         });
//     });
// });

