const request = require('supertest');
const assert = require('assert');
const app = require('../app.js');

describe('Contact Test', function(){

	it('it should create Contact', function(done){
		let contact = {
			name:'Helen',
			phone: '0703424391',
			email:'helen_adesola@yahoo.com'
		}
	   request(app)
      .post('/contact/')
      .send(contact)
      .set('Accept', 'application/json')
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res.body);
        assert.equal(res.body.name, 'Helen');
        done();
	})
})
});