import Account from "./Account.js"

export default class Customer {
    constructor(username,email,account) {
        this.username = username;
        this.email = email;
        if (!(account instanceof Account)) {
            throw new Error("The account parameter must be an instance of the Account class");
        }
        this.primaryAccount = account;
    }

    // Getter Method(s)
    getPrimaryAccount() { return this.primaryAccount; }
    getUsername() { return this.username; }
    getEmail() { return this.email; }
}