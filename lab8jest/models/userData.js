const initialUsersData = require('./initdata');
const User = require('./user');

class UserData {
    constructor() {
        this.n = 1;
        this.users = [];
        initialUsersData.forEach(user => {
            const newUser = new User(user.name, user.email); 
            this.addUser(newUser);
        });
    }

    // Method to add a user
    addUser(user) {
        if (this.findUserByEmail(user.email)) {
            return null
        }

        this.users.push(user);
        this.n = this.n + 1;
    }

    // Method to get a user by email
    findUserByEmail(email) {
        const find = this.users.filter(u => u.email === email)
        return find[0]?.name || null
    }

    // Method to clear all users
    removeOneUser() {
        if ( this.users.length > 0 ) {
            // return this.users.pop();
            const poped = this.users.pop();
            this.n -= 1
            return poped
        }   
    }

    // Method to clear two users
    removeTwoUser() {
        if ( this.users.length > 0 ) {
            const poped = this.users.splice(-2, 2);
            this.n -= 2
            return poped
        } 
    }

    // Method to clear all users
    getUserCount() {
        return this.users.length;
    }

    // Method to clear all users
    clearUsers() {
        this.users = [];
        this.n = 0;
    }
}

module.exports = UserData;