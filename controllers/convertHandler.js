function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    let numRegex = /^[\d.\/]+/;
    let numMatch = input.match(numRegex);

    if (!numMatch) {
      result = 1;
    } else {
      let numStr = numMatch[0];
      if (numStr.includes('/')) {
        let fractionParts = numStr.split('/');
        if (fractionParts.length > 2) {
          return 'invalid number';
        }
        result = parseFloat(fractionParts[0]) / parseFloat(fractionParts[1]);
      } else {
        result = parseFloat(numStr);
      }
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    let unitRegex = /[a-zA-Z]+$/;
    let unitMatch = input.match(unitRegex);

    if (!unitMatch) {
      return 'invalid unit';
    }

    const validUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    result = unitMatch[0].toLowerCase();
    
    if (result === 'l') {
      result = 'L';
    }

    return validUnits.includes(result) ? result : 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    return unitMap[initUnit] || 'invalid unit';
  };

  this.spellOutUnit = function(unit) {
    const spellOutMap = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return spellOutMap[unit] || 'invalid unit';
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
  
    switch(initUnit) {
      case 'gal':
        result = (initNum * galToL).toFixed(5); // 保留 5 位小數
        break;
      case 'L':
        result = (initNum / galToL).toFixed(5); // 保留 5 位小數
        break;
      case 'lbs':
        result = (initNum * lbsToKg).toFixed(5); // 保留 5 位小數
        break;
      case 'kg':
        result = (initNum / lbsToKg).toFixed(5); // 保留 5 位小數
        break;
      case 'mi':
        result = (initNum * miToKm).toFixed(5); // 保留 5 位小數
        break;
      case 'km':
        result = (initNum / miToKm).toFixed(5); // 保留 5 位小數
        break;
      default:
        result = 'invalid unit';
    }
  
    return parseFloat(result); // 將結果轉換回數字類型
  };
    
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
