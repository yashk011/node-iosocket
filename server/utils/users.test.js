const expect = require('expect');
const {Users} = require('./users.js');

describe('Users' ,() =>{

  beforeEach(() =>{


    users = new Users();
    users.users = [{
      id : '1',
      name :'moni',
      room: 'itm'

    }, {
      id : '2',
      name :'princy',
      room: 'itm'
    } ,{
    id : '3',
    name :'mai',
    room: 'nit' }
  ]
  });

  it('should create new users' , () =>{

    var users = new Users();
    var user = {
      id: '123',
      name: 'Yash',
      room: 'NIT raipur'

    }

    var resUser = users.addUsers(user.id , user.name , user.room);
    expect(users.users).toEqual([user]);

  });

  it('should return names of users in same room ' , () =>{

    var resUsers = users.getUserList('itm');
    expect(resUsers).toEqual(['moni','princy']);

  });

  it('should return names of users in same room ' , () =>{

    var resUsers = users.getUserList('nit');
    expect(resUsers).toEqual(['mai']);

  });

  it('should remove a user' , () =>{
    var resUser = users.removeUsers('1');
    expect(resUser).toEqual([users.users[1] , users.users[2]])


  });

  it('should not a remove a user' , () =>{
    var resUser = users.removeUsers('0');
    expect(resUser).toEqual(users.users)



  });

  it('should find a user' ,() =>{
    var resUser = users.getUsers('1');
    expect(resUser).toEqual([{id : '1' , name : 'moni' , room :'itm'}]);

  });

  it('should not find a user' , () =>{
    var resUser = users.getUsers('0');
    expect(resUser).toEqual([]);


  });
});
