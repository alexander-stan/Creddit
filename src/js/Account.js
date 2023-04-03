export default class Account {
	constructor(password, card) {
		this.access_card = card;
		this.password = password;
		this.cards = [];
	}

	// Getter Method(s)
	getAccessCard() {
		return this.access_card;
	}
	getPassword() {
		return this.password;
	}
	getCards() {
		return this.cards;
	}

	// Setter Method(s)
	setPassword(password) {
		this.password = password;
	}
	setCustomer(customer) {
		this.customer = customer;
	}

	addCard(card) {
		this.cards.push(card);
	}

	removeCard(type) {
		for (let i = this.cards.length-1; i >= 0; i--) {
			if (this.cards[i].constructor.name == type) {
				if (this.cards[i].getBalance() == 0) {
					this.cards.splice(i, 1);
					return true;
				}
				return false;
			}
		}
		return false;
	}

	getCardByNumber(num) {
		let accCard = null;

		// Loop over every card in the account and check if the Identifier lines up
		for (let j = 0; j < this.cards.length; j++) {
			if (this.cards[j].getIdentifier() == num) {
				accCard = this.cards[j];
			}
		}

		// Also check the Access Card (NOTE: This card is separate from the Card List)
		if (accCard == null) {
			if (this.access_card.getIdentifier() == num) {
				accCard = this.access_card;
			}
		}

		// If we found a card return it, else return NULL
		if (accCard != null) {
			return accCard;
		} 
		return null;
	}
}
