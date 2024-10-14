const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  
  // 測試正確讀取整數輸入
  test('convertHandler should correctly read a whole number input', function(done) {
    let input = '32L';
    assert.equal(convertHandler.getNum(input), 32);
    done();
  });

  // 測試正確讀取小數輸入
  test('convertHandler should correctly read a decimal number input', function(done) {
    let input = '32.5L';
    assert.equal(convertHandler.getNum(input), 32.5);
    done();
  });

  // 測試正確讀取分數輸入
  test('convertHandler should correctly read a fractional input', function(done) {
    let input = '1/2L';
    assert.equal(convertHandler.getNum(input), 0.5);
    done();
  });

  // 測試正確讀取帶小數的分數輸入
  test('convertHandler should correctly read a fractional input with a decimal', function(done) {
    let input = '5.4/3L';
    assert.equal(convertHandler.getNum(input), 1.8);
    done();
  });

  // 測試對雙分數的錯誤返回
  test('convertHandler should correctly return an error on a double-fraction', function(done) {
    let input = '3/2/3L';
    assert.equal(convertHandler.getNum(input), 'invalid number');
    done();
  });

  // 測試當沒有數字輸入時默認為 1
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function(done) {
    let input = 'kg';
    assert.equal(convertHandler.getNum(input), 1);
    done();
  });

  // 測試正確讀取每個有效的單位
  test('convertHandler should correctly read each valid input unit', function(done) {
    let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    input.forEach(function(ele) {
      assert.equal(convertHandler.getUnit(ele), ele);
    });
    done();
  });

  // 測試無效單位的錯誤返回
  test('convertHandler should correctly return an error for an invalid input unit', function(done) {
    let input = '32g';
    assert.equal(convertHandler.getUnit(input), 'invalid unit');
    done();
  });

  // 測試每個有效單位的對應轉換單位
  test('convertHandler should return the correct return unit for each valid input unit', function(done) {
    let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    let expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
    input.forEach(function(ele, i) {
      assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
    });
    done();
  });

  // 測試每個有效單位的完整拼寫
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function(done) {
    let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    let expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
    input.forEach(function(ele, i) {
      assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
    });
    done();
  });

  // 測試將 gal 正確轉換為 L
  test('convertHandler should correctly convert gal to L', function(done) {
    let input = [5, 'gal'];
    let expected = 18.92705;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); // 使用 approximately 來避免小數點誤差
    done();
  });

  // 測試將 L 正確轉換為 gal
  test('convertHandler should correctly convert L to gal', function(done) {
    let input = [5, 'L'];
    let expected = 1.32086;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    done();
  });

  // 測試將 mi 正確轉換為 km
  test('convertHandler should correctly convert mi to km', function(done) {
    let input = [5, 'mi'];
    let expected = 8.0467;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    done();
  });

  // 測試將 km 正確轉換為 mi
  test('convertHandler should correctly convert km to mi', function(done) {
    let input = [5, 'km'];
    let expected = 3.10686;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    done();
  });

  // 測試將 lbs 正確轉換為 kg
  test('convertHandler should correctly convert lbs to kg', function(done) {
    let input = [5, 'lbs'];
    let expected = 2.26796;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    done();
  });

  // 測試將 kg 正確轉換為 lbs
  test('convertHandler should correctly convert kg to lbs', function(done) {
    let input = [5, 'kg'];
    let expected = 11.0231;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    done();
  });

});
