import Customer from "./Customer.js"

export default class Bank {
    constructor() {
        this.accounts = []
        this.customers = []
        this.loadCustomers();
        this.loadAccounts();
    }

    transfer(card1,card2,amount) {
        if (card1.getBalance() >= amount) {
            card1.setBalance(card1.getBalace() - amount);
            card2.setBalance(card2.getBalace() + amount);
        } else {
            return false;
        }
    }

    deposit(card,amount) {
        card.setBalance(card.getBalace() + amount);
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

    // Create Customer Object
    createCustomer(name,email,password) {
        let customer = new Customer(name,email,password);
        this.customers.push(customer);
        return customer;
    }
}