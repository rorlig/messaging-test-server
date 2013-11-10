
var should = require('should');
var request = require('supertest');
var assert = require('assert');
var Facebook = require('../app/social/Facebook');
var Linkedin = require('../app/social/Linkedin');
var GooglePlus = require('../app/social/GooglePlus');
var ProviderFactory = require('../app/providers/ProviderFactory');


/*
 *  Testing Facebook APIs
 */

describe('Testing EventBrite APIs', function(){

	it('should get eventbrite events for default ip', function(done){

		var eventBriteObject = ProviderFactory.GetInstance().getProviderObject("EventBrite");
		assert.notEqual(eventBriteObject, null);

		eventBriteObject.getEvents(function(err, response){
			console.log('response is : ' + response);
//			assert.equal(err, null);
//			assert.equal(response.error, null);
			done();
		});
	})

	it('should filter by category', function(done){

		var eventBriteObject = ProviderFactory.GetInstance().getProviderObject("EventBrite", {cat: "seminar"});
		assert.notEqual(eventBriteObject, null);

		eventBriteObject.getEvents(function(err, response){
			console.log('response is : ' + response);
//			assert.equal(err, null);
//			assert.equal(response.error, null);
			done();
		});
	})

	it('should filter by date', function(done){

		var eventBriteObject = ProviderFactory.GetInstance().getProviderObject("EventBrite", {date: "today"});
		assert.notEqual(eventBriteObject, null);

		eventBriteObject.getEvents(function(err, response){
			console.log('response is : ' + response);
//			assert.equal(err, null);
//			assert.equal(response.error, null);
			done();
		});
	})

	it('should filter by location', function(done){

		var eventBriteObject = ProviderFactory.GetInstance().getProviderObject("EventBrite", {slat:42.36, slon:-71.06});
		assert.notEqual(eventBriteObject, null);

		eventBriteObject.getEvents(function(err, response){
			console.log('response is : ' + response);
//			assert.equal(err, null);
//			assert.equal(response.error, null);
			done();
		});
	})
//
	it('should filter by category and date', function(done){

		var eventBriteObject = ProviderFactory.GetInstance().getProviderObject("EventBrite", {cat: "seminar", date:"today"});
		assert.notEqual(eventBriteObject, null);

		eventBriteObject.getEvents(function(err, response){
			console.log('response is : ' + response);
//			assert.equal(err, null);
//			assert.equal(response.error, null);
			done();
		});
	})

	it('should perform a query', function(done){

		var eventBriteObject = ProviderFactory.GetInstance().getProviderObject("EventBrite", {q: "MIT"});
		assert.notEqual(eventBriteObject, null);

		eventBriteObject.getEvents(function(err, response){
			console.log('response is : ' + response);
//			assert.equal(err, null);
//			assert.equal(response.error, null);
			done();
		});
	})



});




