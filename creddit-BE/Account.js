import DebitCard from "./DebitCard.js"
let totalID = 0;

export default class Account {
    constructor(password,card) {
        this.identifier = ++totalID;
        this.access_card = card
        this.password = password;
        this.cards = [];
        this.cards.push(this.access_card)
    }

    // Getter Method(s)
    getIdentifier() { return this.identifier; }
    getAccessCard() { return this.access_card; }
    getCustomer() { return this.customer; }
    getPassword() { return this.password; }
    getCards() { return this.cards; }

    addCard(card) {
        this.cards.push(card);
    }

    removeCard(card) {
        var index = this.cards.indexOf(card);
        if (index > -1) {
            this.cards.splice(index, 1);
        }
    }

    setPassword(password) {
        this.password = password;
    }

    setCustomer(customer) {
        this.customer = customer;
    }
}