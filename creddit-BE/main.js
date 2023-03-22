import Account from "./Account.js"
import Bank from "./Bank.js"
import Customer from "./Customer.js"
import DebitCard from "./DebitCard.js"
import CreditCard from "./CreditCard.js"

// Initiate Bank
let bank = new Bank();

let C1 = bank.createCustomer("Hadi","hadi@example.com","Password123");
console.log(C1);
let A1 = C1.getPrimaryAccount();
console.log(A1);
let DB1 = A1.getAccessCard();
console.log(DB1);
console.log(DB1.constructor.name);
console.log(typeof(DB1));

A1.addCard(new CreditCard(1000,0.04));
console.log(A1);

runTestCases();

// Test Case Function
export default function runTestCases() {
    let totalCases = 10;
    let passedCases = 0;

    let card = new DebitCard(1000);
    let account = new Account("password123",card);
    let customer = new Customer("Mike Test","mike@test.com",account);

    // CreateCreditCard
    console.log("Test Case 1: " + (bank.createCreditCard(customer, 1500, 0.05) == null))
    console.log("Test Case 1: " + (bank.createCreditCard(account, "1500", 0.05) == null))
    console.log("Test Case 1: " + (bank.createCreditCard(account, 0, 0.05) == null))
    console.log("Test Case 1: " + (bank.createCreditCard(account, 1500, -0.05) == null))
    console.log("Test Case 1: " + (bank.createCreditCard(account, 1500, 0.05) == null))

    
}