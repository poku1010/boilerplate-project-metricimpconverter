const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
  // 測試：轉換有效的輸入，例如 10L
  test('Convert a valid input such as 10L: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '10L' }) // 模擬查詢參數 input = '10L'
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body); // 檢查返回結果是個物件
        assert.property(res.body, 'initNum');
        assert.property(res.body, 'initUnit');
        assert.property(res.body, 'returnNum');
        assert.property(res.body, 'returnUnit');
        assert.property(res.body, 'string');
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        done();
      });
  });

  // 測試：轉換無效的輸入單位，例如 32g
  test('Convert an invalid input such as 32g: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '32g' }) // 模擬查詢參數 input = '32g'
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid unit'); // 預期結果應該是無效單位
        done();
      });
  });

  // 測試：轉換無效的數字，例如 3/7.2/4kg
  test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' }) // 模擬查詢參數 input = '3/7.2/4kg'
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number'); // 預期結果應該是無效數字
        done();
      });
  });

  // 測試：轉換無效的數字和單位，例如 3/7.2/4kilomegagram
  test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' }) // 模擬查詢參數 input = '3/7.2/4kilomegagram'
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number and unit'); // 預期結果應該是無效數字和單位
        done();
      });
  });

  // 測試：未提供數字，輸入僅為單位，例如 kg
  test('Convert with no number such as kg: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: 'kg' }) // 模擬查詢參數 input = 'kg'
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body); // 檢查返回結果是個物件
        assert.property(res.body, 'initNum');
        assert.property(res.body, 'initUnit');
        assert.property(res.body, 'returnNum');
        assert.property(res.body, 'returnUnit');
        assert.property(res.body, 'string');
        assert.equal(res.body.initNum, 1); // 預期數字為預設的 1
        assert.equal(res.body.initUnit, 'kg');
        done();
      });
  });

});
