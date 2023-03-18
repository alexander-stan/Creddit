class Account {
    constructor(identifier, access_card, password, customer) {
        this.identifier = identifier;
        this.access_card = access_card;
        this.password = password;
        this.customer = customer;
        this.cards = [];
        this.cards.push(access_card)
    }
}