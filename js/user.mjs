// Definition for a user

class User {
    constructor(id, name){
        this.name = name;
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

}
