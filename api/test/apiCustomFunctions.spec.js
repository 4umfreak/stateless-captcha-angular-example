'use strict';
const PocketRegistry = require('pocket-registry');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

const sinon = require('sinon');
const apiCustomFunctions = require('../apiCustomFunctions');

let server;
describe('apiCustomFunctions', function() {
  beforeEach(function() {
    const registry = new PocketRegistry();
    server = {
      registry
    };
    server.registry.set('transomTemplate', {
      renderEmailTemplate: sinon.spy()
    });
    server.registry.set('transomSmtp', {
      sendFromNoReply: ({}, sinon.spy())
    });
  });

  it('includes a submitContactRequest function', function() {
    expect(apiCustomFunctions.submitContactRequest).to.exist;
    expect(Object.keys(apiCustomFunctions).length).to.equal(1);
  });

  it('submitContactRequest does stuff, then calls next()', function() {
    const request = {};
    const response = {};
    const next = () => {
      Promise.resolve();
    };
    expect(apiCustomFunctions.submitContactRequest(server, request, response, next))
      .to.eventually.be.fulfilled;
  });
});
