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
    let totalCases = 9;
    let failedCases = 0;

    function assert(condition) {
        if (!condition) {
            throw new Error();
        }
    }

    let card = new DebitCard(1000);
    let account = new Account("password123",card);
    let customer = new Customer("Mike Test","mike@test.com",account);

    // Create Credit Card
    try { assert(bank.createCreditCard(customer, 1500, 0.05) == null); } catch (error) { failedCases++,console.error("1st PARAM not a Valid Account"); }
    try { assert(bank.createCreditCard(account, "1500", 0.05) == null); } catch (error) { failedCases++,console.error("2nd PARAM not a Number"); }
    try { assert(bank.createCreditCard(account, 0, 0.05) == null); } catch (error) { failedCases++,console.error("2nd PARAM not greater than 0"); }
    try { assert(bank.createCreditCard(account, 1500, -0.05) == null); } catch (error) { failedCases++,console.error("3rd PARAM not between 0 and 1 exclusive"); }
    try { assert(typeof(bank.createCreditCard(account, 1500, 0.05)) == 'object'); } catch (error) { failedCases++,console.error("VALID CreditCard not created properly"); }

    // Create Debit Card
    try { assert(bank.createDebitCard(customer, 1500) == null); } catch (error) { failedCases++,console.error("1st PARAM not a Valid Account"); }
    try { assert(bank.createDebitCard(account, "1500") == null); } catch (error) { failedCases++,console.error("2nd PARAM not a Number"); }
    try { assert(bank.createDebitCard(account, 0) == null); } catch (error) { failedCases++,console.error("2nd PARAM not greater than 0"); }
    try { assert(typeof(bank.createDebitCard(account, 1500)) == 'object'); } catch (error) { failedCases++,console.error("VALID DebitCard not created properly"); }

    console.log("Passed: ",(totalCases-failedCases),"/",totalCases);
}