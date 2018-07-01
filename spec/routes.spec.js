const request = require('request');

describe("server", () => {
  let app;
  beforeAll(() => {
    app = require('../app');
  });

  describe("GET /", () => {
    let data = {};
    beforeAll((done) => {
      request.get('http://localhost:3000/', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      })
    });

    it('should return status 200', () => {
      expect(data.status).toBe(200);
    });
    it('should return object data', () => {
      expect(typeof data.body).toEqual('object');
    });
  });
  describe("POST /USD/100/A", () => {
    let data = {};
    beforeAll((done) => {
      request.post('http://localhost:3000/USD/100/A', (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      })
    });
    it('should return validation error', () => {
      expect(data.status).toBe(404);
    });
  });
  describe("POST /USD/100/EUR", () => {
    let data = {};
    beforeAll((done) => {
      request.post('http://localhost:3000/USD/100/EUR', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      })
    });
    it('should return status 201', () => {
      expect(data.status).toBe(201);
      expect(data.body).toEqual(jasmine.any(Number))
    });
  })
});