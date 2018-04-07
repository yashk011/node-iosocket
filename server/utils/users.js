class Users{
  constructor () {

    this.users = [];


  }
  addUsers (id , name , room) {

    var user = {id, name , room};
    this.users.push(user);
    return user;

  }

  removeUsers (id) {
    var user = this.getUsers(id);

        if (user) {
          this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
  }

  getUsers (id) {

    return this.users.filter((user) => user.id === id)[0]

  }

  getUserList (room) {

    var users=this.users.filter((user) =>{
      return user.room ===room

    });

    var namesArray =users.map((user)=>{
      return user.name
    });

    return namesArray

  }

}

module.exports = {Users};
