import Customer from "./Customer.js"
import Account from "./Account.js"
import DebitCard from "./DebitCard.js"
import CreditCard from "./CreditCard.js"

export default class Bank {
    constructor() {
        this.accounts = []
        this.customers = []
        this.loadCustomers();
        this.loadAccounts();
    }

    transfer(card1,card2,amount) {
        if (card1.getBalance() >= amount) {
            card1.setBalance(card1.getBalance() - amount);
            card2.setBalance(card2.getBalance() + amount);
        } else {
            return false;
        }
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

    payBill() {

    }

    // This function will load existing customers from the DB
    loadCustomers() {
        
    }

    // This function will load existing accounts from the DB
    loadAccounts() {

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
        if (typeof(account) != 'object' || account.constructor.name != 'Account') {
            return null;
        }
        
        if (typeof(credit_limit) != 'number' || credit_limit <= 0) {
            return null;
        }

        if (typeof(interest_rate) != 'number' || interest_rate <= 0 || interest_rate >= 1) {
            return null;
        }

        let card = new CreditCard(credit_limit, interest_rate);
        account.addCard(card);
        return card;
    }

    createDebitCard(account, transaction_limit) {
        if (typeof(account) != 'object' || account.constructor.name != 'Account') {
            return null;
        }
        
        if (typeof(transaction_limit) != 'number' || transaction_limit <= 0) {
            return null;
        }

        let card = new DebitCard(transaction_limit);
        account.addCard(card);
        return card;
    }
}