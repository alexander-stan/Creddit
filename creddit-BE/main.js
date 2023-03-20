import Account from "./Account.js"
import Bank from "./Bank.js"
import Customer from "./Customer.js"
import DebitCard from "./DebitCard.js"
import CreditCard from "./CreditCard.js"

// Test Cases
let C1 = new Customer("Hadi","hadi@example.com","Password123");
console.log(C1);
console.log(C1.getUsername());
console.log(C1.getEmail());
let A1 = C1.getPrimaryAccount();
console.log(A1);
console.log(A1.getIdentifier());
console.log(A1.getPassword());
console.log(A1.getCards());
let DB1 = A1.getAccessCard();
console.log(DB1.getTransactionLimit());
console.log(DB1.getIdentifier());
console.log(DB1.getExpiryDate());
console.log(DB1.getBalance());
