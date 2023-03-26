import Card from "./Card.js"

export default class CreditCard extends Card {
    constructor(credit_limit=1500, interest_rate=0.12) {
        super();
        this.credit_limit = credit_limit;
        this.interest_rate = interest_rate;
    }

    // Getter Method(s)
    getCreditLimit() { return this.credit_limit; }
    getInterestRate() { return this.interest_rate; }

    // Setter Method(s)
    setCreditLimit(limit) { this.credit_limit = limit; }
    setInterestRate(rate) { this.interest_rate = rate; }
}