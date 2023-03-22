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
        card.setBalance(card.getBalance() + amount);
    }

    withdraw(card,amount) {
        
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
        let card = new DebitCard(1000);
        let account = new Account(password,card);
        let customer = new Customer(name,email,account);
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
        
        if (typeof(transaction_limit) != 'number' || credit_limit <= 0) {
            return null;
        }

        let card = new DebitCard(credit_limit, interest_rate);
        account.addCard(card);
        return card;
    }
}