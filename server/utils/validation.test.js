const expect = require('expect');
const {isRealString} = require('./validation.js');

describe('Validation Tests' , () =>{

    it('should reject non-string values' , () =>{

      var str = 1244;
      res = isRealString(str);
      expect(res).toBe(false);

    });


    it('should reject string with only spaces' , () =>{

      var str ="   ";
      res = isRealString(str);
      expect(res).toBe(false);


    });


    it('should allow string with non space characters' , () =>{

      var str ="    Yash  ";
      res = isRealString(str);
      expect(res).toBe(true);


      });

});
