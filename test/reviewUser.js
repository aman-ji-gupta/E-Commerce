let server = require("../index");
let chaiHttp = require("chai-http");
const utils = require("../model/userSchema");
let routes = require("../routes/userRoutes");
const chai = require("chai")

chai.should();
chai.use(chaiHttp);

describe("Register API", ()=>{
    it("if user is already registered it should return conflict error",(done)=>{
        const data = {
    name : "aman",
    email : "amanqa1aaaa@gmail.com",
    contact : "7999901077",
    password : "aman123",
    confirmPassword: "aman123",
    gender:"male"
        };
        chai
        .request(server)
        .post("/user/signup")
        .send(data)
        .end((err , res)=>{
            res.should.have.status(409);
            res.should.be.a("object");
            res.body.should.have.property("status").eq("Failed");
            res.body.should.have.property("Message").eq("User Already Registered...!");
                done();
        })
    }),
    
    // it("if Internal server error", (done)=>{
    //     const data = {
    //         name : "aman",
    //         email : "amanqa1aaaa@gmail.com",
    //         contact : "7999901077",
    //         password : "aman123",
    //         confirmPassword: "aman123",
    //         gender:"male"
    //             };
    //             chai
    //             .request(server)
    //             .post("/user/signup")
    //             .send(data)
    //             .end((err , res) =>{
    //                 res.should.have.status(500);
    //         res.should.be.a("object");
    //         res.body.should.have.property("status").eq("Failed");
    //         res.body.should.have.property("Message").eq("Internal server error...!");
    //             done();
    //             })
    //     }),

        it("if details entered correctly ..it should return status 200", (done)=>{
            const data = {
                name : "aman",
                email : "amanqa1aaaaq@gmail.com",
                contact : "7999901077",
                password : "aman123",
                confirmPassword: "aman123",
                gender:"male"
            
            };
                    chai
                    .request(server)
                    .post("/user/signup")
                    .send(data)
                    .end((err , res) =>{
                        res.should.have.status(200);
                         res.should.be.a("object");
                    done();
                    })
            })


})

describe("Login API" , ()=>{
    it("if details entered correctly ..it should return login details", (done)=>{
        const data = {
            email : "amanqa1aaaaq@gmail.com",
            password : "aman123"
        
        };
                chai
                .request(server)
                .post("/user/login")
                .send(data)
                .end((err , res) =>{
                    res.should.have.status(200);
                     res.should.be.a("object");
                     res.body.should.have.property("status").eq("success");
                  res.body.should.have.property("message").eq("Login success");
                done();
                })
        }),

        it("if details does not entered correctly ..it should not return login details", (done)=>{
            const data = {
                email : "amanqa1aaaaq@gmail.com",
                 password : "aman1213"
            
            };
                    chai
                    .request(server)
                    .post("/user/login")
                    .send(data)
                    .end((err , res) =>{
                        res.should.have.status(401);
                         res.should.be.a("object");
                         res.body.should.have.property("status").eq("failed");
                      res.body.should.have.property("message").eq("unauthorized user..!");
                    done();
                    })
            })
})