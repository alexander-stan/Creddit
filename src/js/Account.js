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
				this.cards.splice(i, 1);
				return true;
			}
		}
		return false;
	}

	getCardByNumber(num) {
		let accCard = null;

		for (let j = 0; j < this.cards.length; j++) {
			if (this.cards[j].getIdentifier() == num) {
				accCard = this.cards[j];
			}
		}

		if (accCard == null) {
			if (this.access_card.getIdentifier() == num) {
				accCard = this.access_card;
			}
		}
		if (accCard != null) {
			return accCard;
		}
		return null;
	}
}
