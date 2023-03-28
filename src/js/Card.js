export default class Card {
	constructor(cardNum = "") {
		if (cardNum == "") {
			this.identifier = this.generateCardNumber();
		} else {
			this.identifier = cardNum;
		}
		this.expiry_date = new Date();
		this.expiry_date.setFullYear(this.expiry_date.getFullYear() + 3);
		this.balance = 0;
		this.transaction_history = [];
	}

	// Getter Method(s)
	getIdentifier() {
		return this.identifier;
	}
	getExpiryDate() {
		return this.expiry_date;
	}
	getBalance() {
		return this.balance;
	}
	getTransactionHistory() {
		return this.transaction_history;
	}

	// Setter Method(s)
	setBalance(balance) {
		this.balance = balance;
	}
	setIdentifier(identifier) {
		this.identifier = identifier;
	}

	addTransaction(customer,transaction) {
		// store data as March 23, 2020 @ 12:00:00 AM
		this.transaction_history.push([transaction, new Date().toLocaleString()]);
		// set the local storage to the new transaction history at customers[] > email > primaryAccount > access_card > transaction_history
		for (let i = 0; i < JSON.parse(localStorage.getItem('customers')).length; i++) {
			let customerSearch = JSON.parse(localStorage.getItem('customers'))[i];
			if (customerSearch.email == customer.getEmail()) {
				customerSearch.primaryAccount.access_card.transaction_history = this.transaction_history;
				let customers = JSON.parse(localStorage.getItem('customers'));
				customers[i] = customerSearch;
				localStorage.setItem('customers', JSON.stringify(customers));
				break;
			}
		}
	}

	generateCardNumber() {
		// We utilize the Luhn algorithm to generate a valid identification number
		// The first 6 digits of a credit/debit card number are the issuer identification number (IIN).
		// We utilize 5 as the IIN for Creddit (just a randomly chosen number)
		const IIN = "5" + Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join("");
		// Generate the next 9 digits randomly
		const accountNum = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join("");
		// The last digit is a check digit calculated using the Luhn algorithm.
		const cardNumb = IIN + accountNum + "0"; // 16 Digits Long
		// The rest of the code is its "hashing" before returning
		const checkDigit = (10 -(Array.from(cardNumb).reverse().reduce((sum, digit, i) => {
			const value = parseInt(digit, 10) * (i % 2 ? 2 : 1);
			return sum + (value > 9 ? value - 9 : value);
		}, 0) % 10)) %10;
		return cardNumb.slice(0, -1) + checkDigit;
	}
}
