import Account from "./Classes/Account.js"
import Bank from "./Classes/Bank.js"
import Customer from "./Classes/Customer.js"
import DebitCard from "./Classes/DebitCard.js"
import CreditCard from "./Classes/CreditCard.js"
import runTestCases from "./Test/Test.js"

// Initiate Bank
let bank = new Bank();

runTestCases(bank);