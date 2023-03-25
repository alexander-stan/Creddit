import Card from "./Card.js"

export default class CreditCard extends Card {
    constructor(credit_limit, interest_rate) {
        super();
        this.credit_limit = credit_limit;
        this.interest_rate = interest_rate
    }

    // Getter Method(s)
    getCreditLimit() { return this.credit_limit; }
    getInterestRate() { return this.interest_rate; }
}