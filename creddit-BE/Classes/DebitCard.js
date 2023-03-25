import Card from "./Card.js"

export default class DebitCard extends Card {
    constructor(transaction_limit) {
        super();
        this.transaction_limit = transaction_limit;
    }

    // Getter Method(s)
    getTransactionLimit() { return this.transaction_limit; }
}