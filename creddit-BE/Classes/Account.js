import DebitCard from "./DebitCard.js"

export default class Account {
    constructor(password,card) {
        this.access_card = card
        this.password = password;
        this.cards = [];
    }

    // Getter Method(s)
    getAccessCard() { return this.access_card; }
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

    getCardByNumber(num) {

        let accCard = null;

        for (let j = 0; j < this.cards.length; j++) {
            if (this.cards[j].getIdentifier() == num){
                accCard = this.cards[j];
            }
        }

        if (accCard == null){ 
            if (this.access_card.getIdentifier() == num){
                accCard = this.access_card;
            }
        }
        if (accCard != null) {
            return accCard;
        }
        return null;
    }
}