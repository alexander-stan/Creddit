import Customer from "./Customer.js";
import Account from "./Account.js";
import DebitCard from "./DebitCard.js";
import CreditCard from "./CreditCard.js";

export default class Bank {
	constructor() {
		this.customers = [];
		this.loadCustomers();
	}

	// Getter Method(s)
	getCustomers() {
		return this.customers;
	}

	transfer(card1, card2, amount) {
		// Check if a argument wasn't passed
		if (card1 == null || card2 == null || amount == null) {
			return false;
		}

		// Check if card1 is a Card object (Debit or Credit)
		if (
			typeof card1 != "object" ||
			(card1.constructor.name != "DebitCard" &&
				card1.constructor.name != "CreditCard")
		) {
			return false;
		}

		// Check if card2 is a Card object (Debit or Credit)
		if (
			typeof card2 != "object" ||
			(card2.constructor.name != "DebitCard" &&
				card2.constructor.name != "CreditCard")
		) {
			return false;
		}

		// Try the Withdraw operation for card1, Deposit into card2
		// Deposit should realistically never fail if Withdraw does not
		if (
			this.withdraw(card1, amount) == false ||
			this.deposit(card2, amount) == false
		) {
			return false;
		}

		return true;
	}

	deposit(card, amount) {
		// Check if a argument wasn't passed
		if (card == null || amount == null) {
			return false;
		}

		// Check if the card argument is a Card object (Debit or Credit)
		if (
			typeof card != "object" ||
			(card.constructor.name != "DebitCard" &&
				card.constructor.name != "CreditCard")
		) {
			return false;
		}

		// Check if the number passed is a Integer >= 0
		if (typeof amount != "number" || amount < 0) {
			return false;
		}

		amount = parseFloat(amount.toFixed(2));

		if (card.constructor.name == "DebitCard") {
			// Set the balance of the card
			card.setBalance(card.getBalance() + amount);
			card.addTransaction(amount,new Date().toLocaleString());
			localStorage.setItem('customers', JSON.stringify(this.customers));
		} else {
			// Credit Card
			// Set the balance of the card
			card.setBalance(card.getBalance() - amount);
			card.addTransaction(-amount,new Date().toLocaleString());
			localStorage.setItem('customers', JSON.stringify(this.customers));
		}
		return card;
	}

	withdraw(card, amount) {
		// Check if a argument wasn't passed
		if (card == null || amount == null) {
			return false;
		}

		// Check if the card argument is a Card object (Debit or Credit)
		if (
			typeof card != "object" ||
			(card.constructor.name != "DebitCard" &&
				card.constructor.name != "CreditCard")
		) {
			return false;
		}

		// Check if the number passed is a Integer >= 0
		if (typeof amount != "number" || amount < 0) {
			return false;
		}

		amount = parseFloat(amount.toFixed(2));

		if (card.constructor.name == "DebitCard") {
			// Ensure the card has funds and the transaction is not past its limit
			if (card.getBalance() < amount || card.getTransactionLimit() < amount) {
				return false;
			}
			// Set the balance of the card
			card.setBalance(card.getBalance() - amount);
			card.addTransaction(-amount,new Date().toLocaleString());
			localStorage.setItem('customers', JSON.stringify(this.customers));
		} else {
			// Credit Card
			// Ensure the card is not being used past its Credit limit
			if (card.getBalance() + amount > card.getCreditLimit()) {
				return false;
			}
			// Set the balance of the card
			card.setBalance(card.getBalance() + amount);
			card.addTransaction(amount,new Date().toLocaleString());
			localStorage.setItem('customers', JSON.stringify(this.customers));
		}

		return card;
	}

	loadCard(card) {
		console.log(card);
	}

	// This function will load existing customers from the Database
	loadCustomers() {
		var retrievedCustomers = JSON.parse(localStorage.getItem("customers"));
		if (retrievedCustomers == null) {
			return null;
		} else {
			for (let i = 0; i < retrievedCustomers.length; i++) {
				let access_card = new DebitCard();
				// retrievedCustomers[i].primaryAccount.access_card.identifier
				access_card.setBalance(retrievedCustomers[i].primaryAccount.access_card.balance);
                access_card.setIdentifier(retrievedCustomers[i].primaryAccount.access_card.identifier);
				for (let k = 0; k < retrievedCustomers[i].primaryAccount.access_card.transaction_history.length; k++) {
					access_card.addTransaction(retrievedCustomers[i].primaryAccount.access_card.transaction_history[k][0],retrievedCustomers[i].primaryAccount.access_card.transaction_history[k][1])
				}
				let account = new Account(retrievedCustomers[i].primaryAccount.password,access_card);
				for (let j = 0; j < retrievedCustomers[i].primaryAccount.cards.length; j++) {
					this.loadCard(retrievedCustomers[i].primaryAccount.cards[j]);
					if (retrievedCustomers[i].primaryAccount.cards[j].credit_limit == undefined) {
						let debit = new DebitCard();
						debit.setIdentifier(retrievedCustomers[i].primaryAccount.cards[j].identifier);
						debit.setBalance(retrievedCustomers[i].primaryAccount.cards[j].balance);
						debit.setTransactionLimit(retrievedCustomers[i].primaryAccount.cards[j].transaction_limit);
						for (let k = 0; k < retrievedCustomers[i].primaryAccount.cards[j].transaction_history.length; k++) {
							debit.addTransaction(retrievedCustomers[i].primaryAccount.cards[j].transaction_history[k][0],retrievedCustomers[i].primaryAccount.cards[j].transaction_history[k][1])
						}
						account.addCard(debit);
					} else {
						let credit = new CreditCard();
						credit.setIdentifier(retrievedCustomers[i].primaryAccount.cards[j].identifier);
						credit.setBalance(retrievedCustomers[i].primaryAccount.cards[j].balance);
						credit.setCreditLimit(retrievedCustomers[i].primaryAccount.cards[j].credit_limit);
						credit.setInterestRate(retrievedCustomers[i].primaryAccount.cards[j].interest_rate);
						for (let k = 0; k < retrievedCustomers[i].primaryAccount.cards[j].transaction_history.length; k++) {
							credit.addTransaction(retrievedCustomers[i].primaryAccount.cards[j].transaction_history[k][0],retrievedCustomers[i].primaryAccount.cards[j].transaction_history[k][1])
						}
						account.addCard(credit);
					}
				}
				this.customers.push(new Customer(retrievedCustomers[i].username,retrievedCustomers[i].email,account));
			}
		}
		return this.customers;
	}

	addCardToCustomer(customer,card) {
		if (customer == null || card == null) {
			return false;
		}

		if (typeof(customer) != 'object' || customer.constructor.name != 'Customer') {
			return false;
		}

		if (typeof(card) != 'object' || (card.constructor.name != 'DebitCard' && card.constructor.name != 'CreditCard')) {
			return false;
		}

		customer.getPrimaryAccount().addCard(card);
		localStorage.setItem('customers', JSON.stringify(this.customers));
		return true;
	}

	removeCardFromCustomer(customer,type) {
		if (type == 'DebitCard') {
			customer.getPrimaryAccount().removeCard(type);
			localStorage.setItem('customers', JSON.stringify(this.customers));
			return true;
		} else if (type == 'CreditCard') {
			customer.getPrimaryAccount().removeCard(type);
			localStorage.setItem('customers', JSON.stringify(this.customers));
			return true;
		}
		return false;
	}

	// Create a brand new Customer Object
	createCustomer(name, email, password) {
		for (let i = 0; i < this.customers.length; i++) {
			if (this.customers[i].getEmail() == email) {
				return null;
			}
		}

		// Create Main Card, Account, and Customer (Link them)
		let card = new DebitCard();
		let account = new Account(password, card);
		let customer = new Customer(name, email, account);

		// Push the customer instance to the Customer array
		this.customers.push(customer);

		// Register the Customer in the Database
		localStorage.setItem("customers", JSON.stringify(this.customers));

		return customer;
	}

	createCreditCard(customer, credit_limit, interest_rate) {
		// Check if the account passed in is an Account object
		if (typeof customer != "object" || customer.constructor.name != "Customer") {
			return null;
		}

		// Check if the credit_limit is a valid Integer > 0
		if (typeof credit_limit != "number" || credit_limit <= 0) {
			return null;
		}

		// Check if the interest_Rate is a valid Float between 0 and 1 exclusively
		if (
			typeof interest_rate != "number" ||
			interest_rate <= 0 ||
			interest_rate >= 1
		) {
			return null;
		}

		// Ensure account only has 5 Credit Cards
		let account = customer.getPrimaryAccount();

		let counter = 0;
		for (let i = 0; i < account.cards.length; i++) {
			if (account.getCards()[i].constructor.name == 'CreditCard') {
				counter += 1;
			}
		}
		if (counter == 5) {
			return null;
		}

		// Create the Credit Card, link to account, return instance of card
		let card = new CreditCard(credit_limit, interest_rate);
		this.addCardToCustomer(customer,card);
		return card;
	}

	createDebitCard(customer, transaction_limit) {
		// Check if the account passed in is an Account object
		if (typeof customer != "object" || customer.constructor.name != "Customer") {
			return null;
		}

		// Check if the transaction_limit is a valid Integer > 0
		if (typeof transaction_limit != "number" || transaction_limit <= 0) {
			return null;
		}

		// Ensure account only has 5 Debit Cards
		let account = customer.getPrimaryAccount();

		let counter = 0;
		for (let i = 0; i < account.getCards().length; i++) {
			if (account.getCards()[i].constructor.name == 'DebitCard') {
				counter += 1;
			}
		}
		if (counter == 4) {
			return null;
		}

		// Create the Debit Card, link to account, return instance of card
		let card = new DebitCard(transaction_limit);
		this.addCardToCustomer(customer,card);
		return card;
	}

	getCustomerByEmail(email) {
		// Look for a customer by that email
		for (let i = 0; i < this.customers.length; i++) {
			if (this.customers[i].getEmail() == email) {
				return this.customers[i];
			}
		}
		return null;
	}

	getAccountByEmail(email) {
		// Look for a customer by that email and return their account (so we can E-Transfer payment)
		for (let i = 0; i < this.customers.length; i++) {
			if (this.customers[i].getEmail() == email) {
				return this.customers[i].getPrimaryAccount();
			}
		}
		return null;
	}
}
