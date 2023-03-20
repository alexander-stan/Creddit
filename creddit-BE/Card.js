let totalID = 0;

export default class Card {
    constructor() {
        this.identifier = ++totalID;
        this.expiry_date = new Date();
        this.expiry_date.setFullYear(this.expiry_date.getFullYear() + 3);
        this.balance = 0
    }

    // Getter Method(s)
    getIdentifier() { return this.identifier; }
    getExpiryDate() { return this.expiry_date; }
    getBalance() { return this.balance; }
}