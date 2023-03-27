import Account from "./Classes/Account.js"
import Bank from "./Classes/Bank.js"
import Customer from "./Classes/Customer.js"
import DebitCard from "./Classes/DebitCard.js"
import CreditCard from "./Classes/CreditCard.js"
import runTestCases from "./Test/Test.js"

// Initiate Bank
let bank = new Bank();

runTestCases(bank);

let customer = bank.getCustomers()[0];
let account = customer.getPrimaryAccount();
let pCard = account.getAccessCard();

let card1 = new DebitCard();
let card2 = new DebitCard();
let card3 = new CreditCard();

account.addCard(card1);
account.addCard(card2);
account.addCard(card3);

var debitCards = document.getElementById('debitAccounts');
var el = document.createElement("DebitCard");
// el.id = "tab-" + account.getCards()[i].getIdentifier();
el.innerHTML = '<div class="accountSum"><div class="accountDesc"><div style="flex-direction: column;"><p class="accountType">Access Card</p><p class="accountNum  hover-underline-animation">'+pCard.getIdentifier()+'</p></div><p class="accountBal">'+pCard.getBalance()+' CAD</p></div></div>';
debitCards.appendChild(el);

// Add Debit Cards to List of ACcounts

for (let i = 0; i < account.getCards().length; i++) {
    if (account.getCards()[i].constructor.name == 'DebitCard') {
        var debitCards = document.getElementById('debitAccounts');
        var el = document.createElement("DebitCard");
        // el.id = "tab-" + account.getCards()[i].getIdentifier();
        el.innerHTML = '<div class="accountSum"><div class="accountDesc"><div style="flex-direction: column;"><p class="accountType">Debit</p><p class="accountNum  hover-underline-animation">'+account.getCards()[i].getIdentifier()+'</p></div><p class="accountBal">'+account.getCards()[i].getBalance()+' CAD</p></div></div>';
        debitCards.appendChild(el);
    }
}

// Add Credit Cards to List of Accounts

for (let i = 0; i < account.getCards().length; i++) {
    if (account.getCards()[i].constructor.name == 'CreditCard') {
        var debitCards = document.getElementById('creditAccounts');
        var el = document.createElement("CreditCard");
        el.innerHTML = '<div class="accountSum"><div class="accountDesc"><div style="flex-direction: column;"><p class="accountType">Credit</p><p class="accountNum  hover-underline-animation">'+account.getCards()[i].getIdentifier()+'</p></div><p class="accountBal">'+account.getCards()[i].getBalance()+' CAD</p></div></div>';
        debitCards.appendChild(el);
    }
}

// Add Primary Card to the Quick Action Menu

el = document.createElement("option");
el.innerHTML = pCard.getIdentifier();
document.getElementById('TransferFromAccount').appendChild(el);

el = document.createElement("option");
el.innerHTML = pCard.getIdentifier();
document.getElementById('WithdrawFromAccount').appendChild(el);

el = document.createElement("option");
el.innerHTML = pCard.getIdentifier();
document.getElementById('DepositFromAccount').appendChild(el);

el = document.createElement("option");
el.innerHTML = pCard.getIdentifier();
document.getElementById('TransferToAccount').appendChild(el);

el = document.createElement("option");
el.innerHTML = pCard.getIdentifier();
document.getElementById('PaymentFromAccount').appendChild(el);

// Add all other Cards to the Quick Action Menu

for (let i = 0; i < account.getCards().length; i++) {
    let el = document.createElement("option");
    el.innerHTML = account.getCards()[i].getIdentifier();
    document.getElementById('TransferFromAccount').appendChild(el);

    el = document.createElement("option");
    el.innerHTML = account.getCards()[i].getIdentifier();
    document.getElementById('WithdrawFromAccount').appendChild(el);

    el = document.createElement("option");
    el.innerHTML = account.getCards()[i].getIdentifier();
    document.getElementById('DepositFromAccount').appendChild(el);

    el = document.createElement("option");
    el.innerHTML = account.getCards()[i].getIdentifier();
    document.getElementById('TransferToAccount').appendChild(el);

    el = document.createElement("option");
    el.innerHTML = account.getCards()[i].getIdentifier();
    document.getElementById('PaymentFromAccount').appendChild(el);
}
