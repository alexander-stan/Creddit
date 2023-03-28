import Account from "../Account.js"
import Customer from "../Customer.js"
import DebitCard from "../DebitCard.js"
import CreditCard from "../CreditCard.js"

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
        assert(bank.createCreditCard(account, 1500, 0.05) == null); 
    } catch (error) { failedCases++,console.error(currCase,"1st PARAM not a Valid Customer"); }
    currCase++; try { 
        assert(bank.createCreditCard(customer, "1500", 0.05) == null); 
    } catch (error) { failedCases++,console.error(currCase,"2nd PARAM not a Number"); }
    currCase++; try { 
        assert(bank.createCreditCard(customer, 0, 0.05) == null); 
    } catch (error) { failedCases++,console.error(currCase,"2nd PARAM not greater than 0"); }
    currCase++; try { 
        assert(bank.createCreditCard(customer, 1500, -0.05) == null); 
    } catch (error) { failedCases++,console.error(currCase,"3rd PARAM not between 0 and 1 exclusive"); }
    currCase++; try { 
        assert(typeof(bank.createCreditCard(customer, 1500, 0.05)) == 'object'); 
    } catch (error) { failedCases++,console.error(currCase,"VALID CreditCard not created properly"); }

    // Create Debit Card

    currCase++; try { 
        assert(bank.createDebitCard(account, 1500) == null); 
    } catch (error) { failedCases++,console.error(currCase,"1st PARAM not a Valid Customer"); }
    currCase++; try { 
        assert(bank.createDebitCard(customer, "1500") == null); 
    } catch (error) { failedCases++,console.error(currCase,"2nd PARAM not a Number"); }
    currCase++; try { 
        assert(bank.createDebitCard(customer, 0) == null); 
    } catch (error) { failedCases++,console.error(currCase,"2nd PARAM not greater than 0"); }
    currCase++; try { 
        assert(typeof(bank.createDebitCard(customer, 1500)) == 'object'); 
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

    // Card Test Cases

    currCase++; try {
        assert(d_card.generateCardNumber().length == 16);
    } catch (error) { failedCases++,console.error(currCase,"Generate Random Card Number"); }
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

    // Debit Card Test Cases

    let test_debit_card = new DebitCard();

    currCase++; try {
        assert(test_debit_card.getTransactionLimit() == 500);
    } catch (error) { failedCases++,console.error(currCase,"Default Transaction Limit for Debit"); }
    currCase++; try {
        test_debit_card.setTransactionLimit(750);
        assert(test_debit_card.getTransactionLimit() == 750);
    } catch (error) { failedCases++,console.error(currCase,"Setting Transaction Limit for Debit"); }

    // Credit Card Test Cases

    let test_credit_card = new CreditCard();

    currCase++; try {
        assert(test_credit_card.getCreditLimit() == 1500);
    } catch (error) { failedCases++,console.error(currCase,"Default Credit Limit for Credit"); }
    currCase++; try {
        assert(test_credit_card.getInterestRate() == 0.12);
    } catch (error) { failedCases++,console.error(currCase,"Default Interest Rate for Credit"); }
    currCase++; try {
        test_credit_card.setCreditLimit(1000);
        assert(test_credit_card.getCreditLimit() == 1000);
    } catch (error) { failedCases++,console.error(currCase,"Setting Credit Limit for Credit"); }
    currCase++; try {
        test_credit_card.setInterestRate(0.22);
        assert(test_credit_card.getInterestRate() == 0.22);
    } catch (error) { failedCases++,console.error(currCase,"Setting Credit Limit for Credit"); }

    // Customer Test Cases

    currCase++; try {
        customer.setEmail("new@example.com");
        assert(customer.getEmail() == "new@example.com");
    } catch (error) { failedCases++,console.error(currCase,"Changing Customer Email"); }
    currCase++; try {
        customer.setUsername("John Dev");
        assert(customer.getUsername() == "John Dev");
    } catch (error) { failedCases++,console.error(currCase,"Changing Customer Name"); }

    // Account Test Cases

    currCase++; try {
        account.setPassword("Test123");
        assert(account.getPassword() == "Test123");
    } catch (error) { failedCases++,console.error(currCase,"Changing Account Password"); }

    currCase++; try {
        account.addCard(test_debit_card);
        assert(account.getCards().includes(test_debit_card) == true);
    } catch (error) { failedCases++,console.error(currCase,"Adding Card from Account"); }
    currCase++; try {
        account.removeCard('DebitCard');
        assert(account.getCards().includes(test_debit_card) == false);
    } catch (error) { failedCases++,console.error(currCase,"Removing Card from Account"); }

    // Get Account by Email

    currCase++; try {
        bank.getCustomers().push(customer);
        assert(bank.getAccountByEmail("new@example.com") == account);
    } catch (error) { failedCases++,console.error(currCase,"Getting an Account by Email to make a Payment"); }
    
    console.log("Test Cases Passed: ",(currCase-failedCases),"/",currCase);
}