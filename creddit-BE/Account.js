import DebitCard from "./DebitCard.js"
let totalID = 0;

export default class Account {
    constructor(password) {
        this.identifier = ++totalID;
        this.access_card = new DebitCard(1000);
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
        cards.push(card);
    }

    removeCard(card) {
        var index = arr.indexOf(card);
        if (index > -1) {
            cards.splice(index, 1);
        }
    }

    setPassword(password) {
        this.password = password;
    }

    setCustomer(customer) {
        this.customer = customer;
    }
}