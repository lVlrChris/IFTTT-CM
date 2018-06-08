const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

//Test constants
const localIftttKey = '12345';
const fakePhoneNumber = '0031612345678';
const fakeCMToken = '1t2o3k4e5n';
const fakeCMSharedKey = '1s2h3a4r5e6d7k8e9y';

//call should function for starting point
chai.should();

//Use chaiHttp to make request to this API
chai.use(chaiHttp);

describe('Validation of the actionFields key', () => {
    it('should throw an error when the actionFields key is not provided', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "ifttt_source": {
                    "id": "2",
                    "url": "https://ifttt.com/myrecipes/personal/2"
                },
                "user": {
                    "timezone": "Pacific Time (US & Canada)"
                }
            })
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.errors[0].should.have.property('status');
                res.body.errors[0].should.have.property('message');
                done();
            });
    });

    it('should not throw an error when actionFields is provided', (done) => {
        chai.request(server)
            .post('/api/ifttt/v1/actions/send_voice_message')
            .set('IFTTT-Service-Key', localIftttKey)
            .send({
                "actionFields": {
                    "sender": "0031687654321",
                    "receiver": fakePhoneNumber,
                    "body": "This is a sample message",
                    "language": "nl",
                    "token": fakeCMToken,
                    "username": "sampleUsername",
                    "key": fakeCMSharedKey
                },
                "ifttt_source": {
                    "id": "test",
                    "url": "test"
                },
                "user": {
                    "timezone": "Pacific Time (US & Canada)"
                }
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('data');
                res.body.data[0].should.have.property('id');
                res.body.data[0].should.have.property('url');
                done();
            });
    });
});

describe('Validation of sender', () => {
    //incorrect values
    //missing value
    //missing key
    //correct values

});

describe('Validation of reveiver', () => {
    //incorrect values
    //missing value
    //missing key
    //correct values
});

describe('Validation of body', () => {
    //incorrect values
    //missing value
    //missing key
    //correct values
});

describe('Validation of language', () => {
    //incorrect values
    //missing value
    //missing key
    //correct values
});

describe('Validation of token', () => {
    //incorrect values
    //missing value
    //missing key
    //correct values
});

describe('Validation of username', () => {
    //incorrect values
    //missing value
    //missing key
    //correct values
});

describe('Validation of key', () => {
    //incorrect values
    //missing value
    //missing key
    //correct values
});
