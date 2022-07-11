const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../routes.js");
const res = require("express/lib/response");

chai.should();
chai.use(chaiHttp);

describe("Tests in the auxiliary REST server", () => {
    it("/check-availability endpoint succeeds (resource is available)", (done) => {
        chai.request(server)
            .get("/check-availability")
            .end((err, res) => {
                if (err) {
                    done(err);
                    process.exit(1);
                } else {
                    res.should.have.status(200);
                    done();
                }
            });
    });

    it("download dummy file with /download-file", (done) => {
        chai.request(server)
            .get("/download-file?csv_path=datasets/agpt/2022_01_01_02_AggregatedGenerationPerType16.1.BC.csv")
            .end((err, res) => {
                if (err) {
                    done(err);
                    process.exit(1);
                } else {
                    res.should.have.status(200);
                    done();
                }
            });
    });

});




