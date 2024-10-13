'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  // 定義 GET 路由來處理 /api/convert 請求
  app.get('/api/convert', (req, res) => {
    let input = req.query.input; // 獲取查詢參數 input
    let initNum = convertHandler.getNum(input); // 取得數值部分
    let initUnit = convertHandler.getUnit(input); // 取得單位部分

    // 處理錯誤情況
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return res.send('invalid number and unit');
    }
    if (initNum === 'invalid number') {
      return res.send('invalid number');
    }
    if (initUnit === 'invalid unit') {
      return res.send('invalid unit');
    }

    // 轉換數值和單位
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let spelledOutInitUnit = convertHandler.spellOutUnit(initUnit);
    let spelledOutReturnUnit = convertHandler.spellOutUnit(returnUnit);
    
    // 組裝返回的結果
    let response = {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: `${initNum} ${spelledOutInitUnit} converts to ${returnNum} ${spelledOutReturnUnit}`
    };

    // 返回結果
    res.json(response);
  });

};
