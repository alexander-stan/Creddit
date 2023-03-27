import Customer from "./Customer.js"
import Account from "./Account.js"
import DebitCard from "./DebitCard.js"
import CreditCard from "./CreditCard.js"

export default class Bank {
    constructor() {
        this.customers = []
        this.loadCustomers();
    }

    transfer(card1,card2,amount) {
        // Check if card1 is a Card object (Debit or Credit)
        if (typeof(card1) != 'object' || (card1.constructor.name != 'DebitCard' && card1.constructor.name != 'CreditCard')) {
            return false;
        }

        // Check if card2 is a Card object (Debit or Credit)
        if (typeof(card2) != 'object' || (card2.constructor.name != 'DebitCard' && card2.constructor.name != 'CreditCard')) {
            return false;
        }

        // Try the Withdraw operation for card1, Deposit into card2
        // Deposit should realistically never fail if Withdraw does not
        if (this.withdraw(card1,amount) == false || this.deposit(card2,amount) == false) {
            return false;
        }
        
        return true;
    }

    deposit(card,amount) {
        // Check if the card argument is a Card object (Debit or Credit)
        if (typeof(card) != 'object' || (card.constructor.name != 'DebitCard' && card.constructor.name != 'CreditCard')) {
            return false;
        }

        // Check if the number passed is a Integer >= 0
        if (typeof(amount) != 'number' || amount < 0) {
            return false;
        }
        
        if (card.constructor.name == 'DebitCard') {
            // Set the balance of the card
            card.setBalance(card.getBalance() + amount);
            card.addTransaction(amount);
        } else { // Credit Card
            // Set the balance of the card
            card.setBalance(card.getBalance() - amount);
            card.addTransaction(-amount);
        }

        return card;
    }

    withdraw(card,amount) {
        // Check if the card argument is a Card object (Debit or Credit)
        if (typeof(card) != 'object' || (card.constructor.name != 'DebitCard' && card.constructor.name != 'CreditCard')) {
            return false;
        }     
        
        // Check if the number passed is a Integer >= 0
        if (typeof(amount) != 'number' || amount < 0) {
            return false;
        }

        if (card.constructor.name == 'DebitCard') {
            // Ensure the card has funds and the transaction is not past its limit
            if (card.getBalance() < amount || card.getTransactionLimit() < amount) {
                return false;
            }

            // Set the balance of the card
            card.addTransaction(-amount);
            card.setBalance(card.getBalance() - amount);
        } else { // Credit Card
            // Ensure the card is not being used past its Credit limit
            if (card.getBalance() + amount > card.getCreditLimit()) {
                return false;
            }

            // Set the balance of the card
            card.addTransaction(amount);
            card.setBalance(card.getBalance() + amount);     
        }

        return card;
    }

    // This function will load existing customers from the DB
    loadCustomers() {
        
    }

    // Create a brand new Customer Object
    createCustomer(name,email,password) {
        // Create Main Card, Account, and Customer (Link them)
        let card = new DebitCard(1000);
        let account = new Account(password,card);
        let customer = new Customer(name,email,account);

        // Push the customer instance to the Customer array
        this.customers.push(customer);

        // Register the Customer in the Database

        return customer;
    }

    createCreditCard(account, credit_limit, interest_rate) {
        // Check if the account passed in is an Account object
        if (typeof(account) != 'object' || account.constructor.name != 'Account') {
            return null;
        }
        
        // Check if the credit_limit is a valid Integer > 0
        if (typeof(credit_limit) != 'number' || credit_limit <= 0) {
            return null;
        }

        // Check if the interest_Rate is a valid Float between 0 and 1 exclusively
        if (typeof(interest_rate) != 'number' || interest_rate <= 0 || interest_rate >= 1) {
            return null;
        }

        // Create the Credit Card, link to account, return instance of card
        let card = new CreditCard(credit_limit, interest_rate);
        account.addCard(card);
        return card;
    }

    createDebitCard(account, transaction_limit) {
        // Check if the account passed in is an Account object
        if (typeof(account) != 'object' || account.constructor.name != 'Account') {
            return null;
        }
        
        // Check if the transaction_limit is a valid Integer > 0
        if (typeof(transaction_limit) != 'number' || transaction_limit <= 0) {
            return null;
        }

        // Create the Debit Card, link to account, return instance of card
        let card = new DebitCard(transaction_limit);
        account.addCard(card);
        return card;
    }

    getCardByEmail(email) {
        // Look for a customer by that email (so we can E-Transfer)
        for (const customer in customers) {
            if (customer.getEmail() == email) {
                return customer.getPrimaryAccount();
            }
        }
        return null;
    }
}