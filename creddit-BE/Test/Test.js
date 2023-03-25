import Account from "./../Classes/Account.js"
import Customer from "./../Classes/Customer.js"
import DebitCard from "./../Classes/DebitCard.js"
import CreditCard from "./../Classes/CreditCard.js"

// Test Case Function
export default function runTestCases(bank) {
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
    let customer = new Customer("Mike Test","mike@example.com",account);

    // Create Credit Card
    currCase++; try { 
        assert(bank.createCreditCard(customer, 1500, 0.05) == null); 
    } catch (error) { failedCases++,console.error(currCase,"1st PARAM not a Valid Account"); }
    currCase++; try { 
        assert(bank.createCreditCard(account, "1500", 0.05) == null); 
    } catch (error) { failedCases++,console.error(currCase,"2nd PARAM not a Number"); }
    currCase++; try { 
        assert(bank.createCreditCard(account, 0, 0.05) == null); 
    } catch (error) { failedCases++,console.error(currCase,"2nd PARAM not greater than 0"); }
    currCase++; try { 
        assert(bank.createCreditCard(account, 1500, -0.05) == null); 
    } catch (error) { failedCases++,console.error(currCase,"3rd PARAM not between 0 and 1 exclusive"); }
    currCase++; try { 
        assert(typeof(bank.createCreditCard(account, 1500, 0.05)) == 'object'); 
    } catch (error) { failedCases++,console.error(currCase,"VALID CreditCard not created properly"); }

    // Create Debit Card
    currCase++; try { 
        assert(bank.createDebitCard(customer, 1500) == null); 
    } catch (error) { failedCases++,console.error(currCase,"1st PARAM not a Valid Account"); }
    currCase++; try { 
        assert(bank.createDebitCard(account, "1500") == null); 
    } catch (error) { failedCases++,console.error(currCase,"2nd PARAM not a Number"); }
    currCase++; try { 
        assert(bank.createDebitCard(account, 0) == null); 
    } catch (error) { failedCases++,console.error(currCase,"2nd PARAM not greater than 0"); }
    currCase++; try { 
        assert(typeof(bank.createDebitCard(account, 1500)) == 'object'); 
    } catch (error) { failedCases++,console.error(currCase,"VALID DebitCard not created properly"); }

    // Deposit (Debit)
    d_card.setBalance(0);
    currCase++; try {
        bank.deposit(d_card,500);
        assert(d_card.getBalance() == 500);
    } catch (error) { failedCases++,console.error(currCase,"Debit Deposit amount was not properly added"); }
    currCase++; try {
        assert(bank.deposit("d_card","500") == false);
    } catch (error) { failedCases++,console.error(currCase,"Card not passed properly"); }
    currCase++; try {
        assert(bank.deposit(d_card,-100) == false);
    } catch (error) { failedCases++,console.error(currCase,"Negative Deposit amount"); }
    currCase++; try {
        assert(bank.deposit(d_card,"500") == false);
    } catch (error) { failedCases++,console.error(currCase,"Number not passed properly"); }

    // Deposit (Credit)
    c_card.setBalance(100);
    currCase++; try {
        bank.deposit(c_card,500);
        assert(c_card.getBalance() == -400);
    } catch (error) { failedCases++,console.error(currCase,"Credit Deposit amount was not properly added"); }

    // Withdraw (Debit)
    d_card.setBalance(1100); // Set Balance
    currCase++; try {
        assert(bank.withdraw(d_card,1001) == false);
    } catch (error) { failedCases++,console.error(currCase,"Withdraw past transaction limit"); }
    currCase++; try {
        bank.withdraw(d_card,1000);
        assert(d_card.getBalance() == 100);
    } catch (error) { failedCases++,console.error(currCase,"Debit Withdraw amount was not properly removed"); }
    currCase++; try {
        assert(bank.withdraw("d_card","500") == false);
    } catch (error) { failedCases++,console.error(currCase,"Card not passed properly"); }
    currCase++; try {
        assert(bank.withdraw(d_card,-100) == false);
    } catch (error) { failedCases++,console.error(currCase,"Negative Withdraw amount"); }
    currCase++; try {
        assert(bank.withdraw(d_card,101) == false);
    } catch (error) { failedCases++,console.error(currCase,"Withdraw from non-existent balance"); }
    currCase++; try {
        assert(bank.withdraw(d_card,"500") == false);
    } catch (error) { failedCases++,console.error(currCase,"Number not passed properly"); }

    // Withdraw (Credit)
    c_card.setBalance(100); // Set Balance
    currCase++; try {
        assert(bank.withdraw(c_card,901) == false);
    } catch (error) { failedCases++,console.error(currCase,"Withdraw past credit limit"); }
    currCase++; try {
        bank.withdraw(c_card,400);
        assert(c_card.getBalance() == 500);
    } catch (error) { failedCases++,console.error(currCase,"Credit Withdraw amount was not properly removed"); }

    // Transaction History
    currCase++; try {
        assert(d_card.getTransactionHistory().length == 2);
    } catch (error) { failedCases++,console.error(currCase,"Debit transaction history not properly updated"); }
    currCase++; try {
        assert(c_card.getTransactionHistory().length == 2);
    } catch (error) { failedCases++,console.error(currCase,"Credit transaction history not properly updated"); }

    // Transfer
    d_card.setBalance(500); // Set Balance
    c_card.setBalance(500); // Set Balance

    currCase++; try {
        assert(bank.transfer(d_card,c_card,200) == true);
    } catch (error) { failedCases++,console.error(currCase,"Valid transfer between Debit and Credit failed"); }
    currCase++; try {
        assert(d_card.getBalance() == 300);
    } catch (error) { failedCases++,console.error(currCase,"Debit balance not properly updated"); }
    currCase++; try {
        assert(c_card.getBalance() == 300);
    } catch (error) { failedCases++,console.error(currCase,"Credit balance not properly updated"); }
    currCase++; try {
        assert(bank.transfer(c_card,d_card,200) == true);
    } catch (error) { failedCases++,console.error(currCase,"Valid transfer between Credit and Debit failed"); }
    currCase++; try {
        assert(c_card.getBalance() == 500);
    } catch (error) { failedCases++,console.error(currCase,"Credit balance not properly updated"); }
    currCase++; try {
        assert(d_card.getBalance() == 500);
    } catch (error) { failedCases++,console.error(currCase,"Debit balance not properly updated"); }
    currCase++; try {
        assert(bank.transfer(d_card,c_card,501) == false);
    } catch (error) { failedCases++,console.error(currCase,"Transfer past available balance"); }

    d_card.setBalance(0); // Set Balance
    c_card.setBalance(400); // Set Balance

    currCase++; try {
        assert(bank.transfer(c_card,d_card,601) == false);
    } catch (error) { failedCases++,console.error(currCase,"Transfer past credit limit"); }

    d_card.setBalance(1100); // Set Balance
    c_card.setBalance(0); // Set Balance

    currCase++; try {
        assert(bank.transfer(d_card,c_card,1001) == false);
    } catch (error) { failedCases++,console.error(currCase,"Transfer past transaction limit"); }

    currCase++; try {
        assert(bank.transfer(customer,c_card,100) == false);
    } catch (error) { failedCases++,console.error(currCase,"Invalid 1st Argument"); }
    currCase++; try {
        assert(bank.transfer(d_card,account,100) == false);
    } catch (error) { failedCases++,console.error(currCase,"Invalid 2nd Argument"); }
    currCase++; try {
        assert(bank.transfer(d_card,c_card,"100") == false);
    } catch (error) { failedCases++,console.error(currCase,"Invalid 3rd Argument"); }

    console.log("Test Cases Passed: ",(currCase-failedCases),"/",currCase);
}