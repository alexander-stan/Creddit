import Card from "./Card.js"

export default class DebitCard extends Card {
    constructor(transaction_limit=500) {
        super();
        this.transaction_limit = transaction_limit;
    }

    // Getter Method(s)
    getTransactionLimit() { return this.transaction_limit; }

    // Setter Method(s)
    setTransactionLimit(limit) { this.transaction_limit = limit; }
}