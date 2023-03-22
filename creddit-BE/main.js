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
    let currCase = 0;
    let failedCases = 0;

    function assert(condition) {
        if (!condition) {
            throw new Error();
        }
    }

    let d_card = new DebitCard(1000);
    let c_card = new CreditCard(1000,0.05);
    let account = new Account("password123",d_card);
    let customer = new Customer("Mike Test","mike@test.com",account);

    // Create Credit Card
    currCase++; try { assert(bank.createCreditCard(customer, 1500, 0.05) == null); } catch (error) { failedCases++,console.error(currCase,"1st PARAM not a Valid Account"); }
    currCase++; try { assert(bank.createCreditCard(account, "1500", 0.05) == null); } catch (error) { failedCases++,console.error(currCase,"2nd PARAM not a Number"); }
    currCase++; try { assert(bank.createCreditCard(account, 0, 0.05) == null); } catch (error) { failedCases++,console.error(currCase,"2nd PARAM not greater than 0"); }
    currCase++; try { assert(bank.createCreditCard(account, 1500, -0.05) == null); } catch (error) { failedCases++,console.error(currCase,"3rd PARAM not between 0 and 1 exclusive"); }
    currCase++; try { assert(typeof(bank.createCreditCard(account, 1500, 0.05)) == 'object'); } catch (error) { failedCases++,console.error(currCase,"VALID CreditCard not created properly"); }

    // Create Debit Card
    currCase++; try { assert(bank.createDebitCard(customer, 1500) == null); } catch (error) { failedCases++,console.error(currCase,"1st PARAM not a Valid Account"); }
    currCase++; try { assert(bank.createDebitCard(account, "1500") == null); } catch (error) { failedCases++,console.error(currCase,"2nd PARAM not a Number"); }
    currCase++; try { assert(bank.createDebitCard(account, 0) == null); } catch (error) { failedCases++,console.error(currCase,"2nd PARAM not greater than 0"); }
    currCase++; try { assert(typeof(bank.createDebitCard(account, 1500)) == 'object'); } catch (error) { failedCases++,console.error(currCase,"VALID DebitCard not created properly"); }

    // Deposit
    currCase++; try {
        bank.deposit(d_card,500);
        assert(d_card.getBalance() == 500);
    } catch (error) { failedCases++,console.error(currCase,"Deposit amount was not properly added"); }
    currCase++; try {
        assert(bank.deposit("d_card","500") == false);
    } catch (error) { failedCases++,console.error(currCase,"Card not passed properly"); }
    currCase++; try {
        assert(bank.deposit(d_card,-100) == false);
    } catch (error) { failedCases++,console.error(currCase,"Negative Deposit amount"); }
    currCase++; try {
        assert(bank.deposit(d_card,"500") == false);
    } catch (error) { failedCases++,console.error(currCase,"Number not passed properly"); }


    console.log("Test Cases Passed: ",(currCase-failedCases),"/",currCase);
}