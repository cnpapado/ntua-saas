const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("./index.js");
const res = require("express/lib/response");

chai.should();
chai.use(chaiHttp);

describe("Tests in the example server", () => {
    it("Hello world GET request", (done) => {
        chai.request(server)
            .get("/")
            .end((err, res) => {
                if (err) {
                    done(err);
                    process.exit(1);
                } else {
                    res.should.have.status(200);
                    res.body.meta.msg.should.be.a("string");
                    res.body.meta.code.should.be.a("number");

                    done();
                }
            });
    });
});