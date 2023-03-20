import Account from "./Account.js"

export default class Customer {
    constructor(username,email,password) {
        this.username = username;
        this.email = email;
        this.primaryAccount = new Account(password);
    }

    // Getter Method(s)
    getPrimaryAccount() { return this.primaryAccount; }
    getUsername() { return this.username; }
    getEmail() { return this.email; }
}