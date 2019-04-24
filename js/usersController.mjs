export class UsersController {
    constructor() {
        this.users = [];
    }

    addUser(id, name){
        let user = new User(id, name);
        this.users.push(user);
    }

    getUserById(id){
        return this.users.find(u => u.id === id);
    }
}
