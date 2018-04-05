const expect = require('expect');

var {generateMessage} = require('./message.js');
var {generateLocationMessage} = require('./message.js');
describe('generateMessage' , () =>{

  it('should generate correct message object' ,() =>{

    var from = 'yash';
    var text ='test message';
    var res = generateMessage(from , text);

    expect(res).toInclude({
      from ,
      text
    });
    expect(res.createdAt).toBeA('number');

  });

});

describe('generateLocationMessage' , () =>{

  it('should generate correct url of location' , () =>{

    var from ='Admin';
    var lat = 1;
    var long = 1;
    var url = 'https://www.google.com/maps?q=1,1';
    var res= generateLocationMessage(from , lat, long);

    expect(res).toInclude({
      from ,
      url
    });
    expect(res.createdAt).toBeA('number');

  });


});
