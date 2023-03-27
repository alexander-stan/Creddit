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
card1.setBalance("500");
account.addCard(card2);
account.addCard(card3);

console.log(customer);


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


fillForm();

// Add Primary Card to the Quick Action Menu
function fillForm(){
    el = document.createElement("option");
    el.innerHTML = pCard.getIdentifier();
    document.getElementById('TransferFromAccount').appendChild(el);

    el = document.createElement("option");
    el.innerHTML = pCard.getIdentifier();
    document.getElementById('WithdrawFromAccount').appendChild(el);

    el = document.createElement("option");
    el.innerHTML = pCard.getIdentifier();
    document.getElementById('DepositToAccount').appendChild(el);

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
        document.getElementById('DepositToAccount').appendChild(el);

        el = document.createElement("option");
        el.innerHTML = account.getCards()[i].getIdentifier();
        document.getElementById('TransferToAccount').appendChild(el);

        el = document.createElement("option");
        el.innerHTML = account.getCards()[i].getIdentifier();
        document.getElementById('PaymentFromAccount').appendChild(el);
    }
}

var form1 = document.getElementById("makePayment");
function handleForm(event) { event.preventDefault(); } 
form1.addEventListener('submit', handleForm);

const formPayment1 = document.getElementById('makePayment');

formPayment1.addEventListener('submit',function(event) {
    const formData = new FormData(formPayment1);
    const paccount = formData.get('PaymentFromAccount');
    const email = formData.get('Email');
    const amount = formData.get('Amount');

    let accCard = account.getCardByNumber(paccount);
    const payee = bank.getAccountByEmail(email);

    if (payee != null){
        const pCard = payee.getAccessCard();
        console.log(bank.transfer(accCard,pCard,parseFloat(amount)));
        console.log(accCard);
        console.log(pCard);
    }

    updateDebit();
    updateCredit();

});

var form2 = document.getElementById("makeTransfer");
function handleForm1(event) { event.preventDefault(); } 
form2.addEventListener('submit', handleForm1);

const formPayment2 = document.getElementById('makeTransfer');

formPayment2.addEventListener('submit',function(event) {
    const formData = new FormData(formPayment2);
    const fromAccount = formData.get('TransferFromAccount');
    const toAccount = formData.get('TransferToAccount');
    const amount = formData.get('Amount');

    let accCard = account.getCardByNumber(fromAccount);
    let payee = account.getCardByNumber(toAccount);

    console.log(bank.transfer(accCard,payee,parseFloat(amount)));

    updateDebit();
    updateCredit();

});

var form3 = document.getElementById("makeWithdraw");
function handleForm2(event) { event.preventDefault(); } 
form3.addEventListener('submit', handleForm2);

const formPayment3 = document.getElementById('makeWithdraw');

formPayment3.addEventListener('submit',function(event) {
    const formData = new FormData(formPayment3);
    const fromAccount = formData.get('WithdrawFromAccount');
    const amount = formData.get('Amount');

    let accCard = account.getCardByNumber(fromAccount);

    console.log(bank.withdraw(accCard,parseFloat(amount)));

    updateDebit();
    updateCredit();

});

var form4 = document.getElementById("makeDeposit");
function handleForm3(event) { event.preventDefault(); } 
form4.addEventListener('submit', handleForm3);

const formPayment4 = document.getElementById('makeDeposit');

formPayment4.addEventListener('submit',function(event) {
    const formData = new FormData(formPayment4);
    const fromAccount = formData.get('DepositToAccount');
    const amount = formData.get('Amount');

    let accCard = account.getCardByNumber(fromAccount);

    console.log(bank.deposit(accCard,parseFloat(amount)));

    updateDebit();
    updateCredit();
});




function updateDebit(){
    document.getElementById('debitAccounts').innerHTML = ""; 
    var debitCards = document.getElementById('debitAccounts');
    var el = document.createElement("DebitCard");
    // el.id = "tab-" + account.getCards()[i].getIdentifier();
    el.innerHTML = '<div class="accountSum"><div class="accountDesc"><div style="flex-direction: column;"><p class="accountType">Access Card</p><p class="accountNum  hover-underline-animation">'+pCard.getIdentifier()+'</p></div><p class="accountBal">'+pCard.getBalance()+' CAD</p></div></div>';
    debitCards.appendChild(el);
    for (let i = 0; i < account.getCards().length; i++) {
        if (account.getCards()[i].constructor.name == 'DebitCard') {
            var debitCards = document.getElementById('debitAccounts');
            var el = document.createElement("DebitCard");
            // el.id = "tab-" + account.getCards()[i].getIdentifier();
            el.innerHTML = '<div class="accountSum"><div class="accountDesc"><div style="flex-direction: column;"><p class="accountType">Debit</p><p class="accountNum  hover-underline-animation">'+account.getCards()[i].getIdentifier()+'</p></div><p class="accountBal">'+account.getCards()[i].getBalance()+' CAD</p></div></div>';
            debitCards.appendChild(el);
        }
    }
}

function updateCredit(){
    document.getElementById('creditAccounts').innerHTML = ""; 
    for (let i = 0; i < account.getCards().length; i++) {
        if (account.getCards()[i].constructor.name == 'CreditCard') {
            var debitCards = document.getElementById('creditAccounts');
            var el = document.createElement("CreditCard");
            el.innerHTML = '<div class="accountSum"><div class="accountDesc"><div style="flex-direction: column;"><p class="accountType">Credit</p><p class="accountNum  hover-underline-animation">'+account.getCards()[i].getIdentifier()+'</p></div><p class="accountBal">'+account.getCards()[i].getBalance()+' CAD</p></div></div>';
            debitCards.appendChild(el);
        }
    }
}




