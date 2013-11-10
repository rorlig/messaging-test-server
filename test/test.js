

var should = require('should');
var request = require('supertest');
var assert = require('assert');


//todo some tests are failing ? 

describe('Testing GET /api/user', function(){
  var url = 'http://localhost:3000';

  it('should return missing headers error if user information is missing in headers', function(done){

    request(url)
    .get('/api/user')
    .set('Accept', 'application/json')
    .end(function(err, res) {
        assert.equal(err, null);
        var body = res.body;
        assert.equal(body.code, 401);
        done();
    });
  })

  it('should return no user found if user is not in db', function(done){

    request(url)
      .get('/api/user')
      .set('Accept', 'application/json').
      set('UserId', '51e06e53d2edd1960700000')
      .end(function(err, res) {
//        assert(res.code, 200);
        assert.equal(err, null);
        var body = res.body;
        assert.equal(body.code, 401);
        assert.equal(body.message, "UserId Not Found in the Database");
        done();
      });
  })

  it('should return user object if user is in  db', function(done){

    var userId = '51e237dded93cc0000000005';
    request(url)
      .get('/api/user')
      .set('Accept', 'application/json').
      set('UserId', userId)
      .end(function(err, res) {
        assert.equal(err, null);
        var user = res.body;
        assert.equal(user._id, userId);
        done();
      });
  })
})


describe('TEST POST /api/user', function(){
  var url = 'http://localhost:3000';

  /* missing body */

  it ('should return error if request body is missing', function(done){
    request(url)
      .post('/api/user')
      .set('Accept', 'application/json')
      .set('UserId','51e22a088d1846f0f7000005')
      .end(function(err, res) {
        assert.equal(err, null);
        var body = res.body;
        assert.equal(body.code, 666);
        done();
      });
  })

  /* adding same account to the userId */

  it ('should return error if the userId is not in the database', function(done){
    request(url)
      .post('/api/user')
      .set('Accept', 'application/json')
      .set('UserId','51e22a488d1846f0f7000007')
      .send({"account": {
        "network": "Facebook",
        "networkId": 712803022,
        "accessToken": "AAADd5ZAMhoe0BAETW3CIv2QXDTlAP5hHuz59w2yShokiigGOahk03eUhkdJ7vsyDJEasjK5FLAIT8peBhhey9UstQK9mnmseNF1qIVQZDZD",
        "accessTokenExpiration": 1371268071822,
        "firstName": "Gaurav",
        "lastName":"Gupta"
      }
      })
      .end(function(err, res) {
        assert.equal(err, null);
        var body = res.body;
        assert.equal(body.code, 401);
        done();
      });
  })


  /* adding same account to the userId */

  it ('should return user object if the account is same as the one previously entered', function(done){
    request(url)
      .post('/api/user')
      .set('Accept', 'application/json')
      .set('UserId','51e237dded93cc0000000005')
      .send({"account": {
          "network": "Facebook",
          "networkId": 712803022,
          "accessToken": "AAADd5ZAMhoe0BAETW3CIv2QXDTlAP5hHuz59w2yShokiigGOahk03eUhkdJ7vsyDJEasjK5FLAIT8peBhhey9UstQK9mnmseNF1qIVQZDZD",
          "accessTokenExpiration": 1371268071822,
          "firstName": "Gaurav",
          "lastName":"Gupta"
           }
        })
      .end(function(err, res) {
        assert.equal(err, null);
        var body = res.body;
        assert.equal(res.body._id, '51e237dded93cc0000000005');
        assert.equal(res.body.account.length, 2);
        done();
      });
  })


  /* adding new account to the userId */

//  it ('should return user object with new account', function(done){
//    request(url)
//      .post('/api/user')
//      .set('Accept', 'application/json')
//      .set('UserId','51e22a488d1846f0f7000007')
//      .send({"account": {
//        "network": "Twitter",
//        "networkId": 712803032,
//        "accessToken": "AAADd5ZAMhoe0BAETW3CIv2QXDTlAP5hHuz59w2yShokiigGOahk03eUhkdJ7vsyDJEasjK5FLAIT8peBhhey9UstQK9mnmseNF1qIVQZDZD",
//        "accessTokenExpiration": 1371268071822,
//        "firstName": "Gaurav",
//        "lastName":"Gupta"
//      }
//      })
//      .end(function(err, res) {
//        assert.equal(err, null);
//        var body = res.body;
//        assert.equal(res.body._id, '51e22a488d1846f0f7000007');
//        assert.equal(res.body.account.length, 3);
//        done();
//      });
//  })

  /* logging in first time --> creates new account */

  it ('should return user object with new account', function(done){
    request(url)
      .post('/api/user')
      .set('Accept', 'application/json')
      .send({"account": {
        "network": "Facebook",
        "networkId": 1,
        "accessToken": "AAADd5ZAMhoe0BAETW3CIv2QXDTlAP5hHuz59w2yShokiigGOahk03eUhkdJ7vsyDJEasjK5FLAIT8peBhhey9UstQK9mnmseNF1qIVQZDZD",
        "accessTokenExpiration": 1371268071822,
        "firstName": "Rorlig",
        "lastName":"Test1"
      }
      })
      .end(function(err, res) {
        assert.equal(err, null);
        var body = res.body;
//        assert.equal(res.body.account.length, 1)
//        assert.equal(res.body.account[0].networkId, 1);
        done();
      });
  })

  /* logging in first time --> creates new account */
  //todo add before and after statements to this...
  it ('should return user object with previously existing account', function(done){
    request(url)
      .post('/api/user')
      .set('Accept', 'application/json')
      .send({"account": {
        "network": "Facebook",
        "networkId": 1,
        "accessToken": "AAADd5ZAMhoe0BAETW3CIv2QXDTlAP5hHuz59w2yShokiigGOahk03eUhkdJ7vsyDJEasjK5FLAIT8peBhhey9UstQK9mnmseNF1qIVQZDZD",
        "accessTokenExpiration": 1371268071822,
        "firstName": "Rorlig",
        "lastName":"Test1"
      }
      })
      .end(function(err, res) {
        assert.equal(err, null);
        var body = res.body;
//        assert.equal(res.body.account.length, 1)
//        assert.equal(res.body.account[0].networkId, 1);
        done();
      });
  })








})

describe('Testing GET /api/polls', function(){
  var url = 'http://localhost:3000';
})
