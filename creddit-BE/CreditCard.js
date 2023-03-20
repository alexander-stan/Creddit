import Card from "./Card.js"

export default class CreditCard extends Card {
    constructor(credit_limit, interest_rate) {
        super();
        this.credit_limit = credit_limit;
        this.interest_rate = interest_rate
    }
}