import Account from "./Account.js"
import Bank from "./Bank.js"
import Customer from "./Customer.js"
import DebitCard from "./DebitCard.js"
import CreditCard from "./CreditCard.js"

// Initiate Bank
let bank = new Bank();

// Test Cases
let C1 = new Customer("Hadi","hadi@example.com","Password123");
console.log(C1);
let A1 = C1.getPrimaryAccount();
console.log(A1);
let DB1 = A1.getAccessCard();
DB1.deposit(500);
console.log(DB1);

A1.addCard(new CreditCard(1000,0.04));
console.log(A1);