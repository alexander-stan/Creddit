let totalID = 0;

export default class Card {
    constructor() {
        this.identifier = ++totalID;
        this.expiry_date = new Date();
        this.expiry_date.setFullYear(this.expiry_date.getFullYear() + 3);
        this.balance = 0
        this.transaction_history = []
    }

    // Getter Method(s)
    getIdentifier() { return this.identifier; }
    getExpiryDate() { return this.expiry_date; }
    getBalance() { return this.balance; }
    getTransactionHistory() { return this.transaction_history; }

    // Setter Method(s)
    setBalance(balance) { this.balance = balance; }

    addTransaction(transaction) {
        this.transaction_history.push([transaction,new Date()]);
    }
}