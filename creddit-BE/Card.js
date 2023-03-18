class Card {
    constructor(identifier, expiry_date, account, balance=0) {
        this.identifier = identifier;
        this.expiry_date = expiry_date;
        this.account = account
        this.balance = balance
    }
}