import * as account from "./Account.js";
import Bank from "./Bank.js";
import * as customer from "./Customer.js";
import DebitCard from "./DebitCard.js";
import CreditCard from "./CreditCard.js";
import runTestCases from "./Test/Test.js";

let bank = new Bank();
runTestCases(bank);

if (window.location.href.includes("detailedview.html")) {
	if (sessionStorage.getItem("email") == null) {
        window.location.href = "login.html";
    }
    let act = JSON.parse(sessionStorage.getItem("cardToView"));
    document.getElementById("balance").innerHTML = "$" + act.balance;
    document.getElementById("act-num").innerHTML = act.identifier;
    if (act.transaction_limit != undefined) {
        document.getElementById("credit").style.display = "none";
        document.getElementById("trans-limit").innerHTML = "$" + act.transaction_limit;
    } else {
        document.getElementById("debit").style.display = "none";
        document.getElementById("credit-limit").innerHTML = "$" + act.credit_limit;
    }
    let trans_history = act.transaction_history;
    if (trans_history.length == 0) {
        document.getElementById("t-history").innerHTML = "No transaction history to display";
    } else {
        for (let i = 0; i < trans_history.length; i++) {
			let row = document.createElement("div");
			row.classList.add("row");
			let date = document.createElement("p");
			// convert date to March 23, 2020 @ 12:00:00 AM
			date.innerHTML = trans_history[i][1].split(',').join(' @');
			let amount = document.createElement("p");
			amount.classList.add("bold");
			amount.innerHTML = "$" + trans_history[i][0];
			row.appendChild(date);
			row.appendChild(amount);
			document.getElementById("t-history").appendChild(row);
        }
    }
}

if (window.location.href.includes("settings.html")) {
    if (sessionStorage.getItem("email") == null) {
        window.location.href = "login.html";
    }
    let cust = bank.getCustomerByEmail(sessionStorage.getItem("email"));
    let cur_password = document.getElementById("cur-password");
    let new_password = document.getElementById("new-password");
    let confirm_password = document.getElementById("cnew-password");
    document.getElementById("updatePassword").addEventListener("click", function () {
        if (cur_password.value == cust.getPrimaryAccount().getPassword()) {
            if (new_password.value == confirm_password.value) {
                cust.getPrimaryAccount().setPassword(new_password.value);
                localStorage.setItem("customers", JSON.stringify(bank.getCustomers()));
                window.location.href = "dashboard.html";
            } else {
                alert("Passwords do not match");
            }
        } else {
            alert("Incorrect Password");
        }
    });
    document.getElementById('cur-email').innerHTML = "Current Email: " + cust.getEmail();
    let new_email = document.getElementById("new-email");
    let confirm_email = document.getElementById("cnew-email");
    document.getElementById("updateEmail").addEventListener("click", function () {
        if (new_email.value == confirm_email.value) {
            if (new_email.value.indexOf("@") == -1 || new_email.value.indexOf(".") == -1) {
                alert("Invalid Email");
                return;
            }
            cust.setEmail(new_email.value);
            sessionStorage.setItem("email", new_email.value);
            localStorage.setItem("customers", JSON.stringify(bank.getCustomers()));
            window.location.href = "dashboard.html";
        } else {
            alert("Emails do not match");
        }
    });
}


if (window.location.href.includes("login.html")) {
	if (sessionStorage.getItem("email") != null) {
		window.location.href = "dashboard.html";
	}
	document.getElementById("create-btn").addEventListener("click", function () {
		window.location.href = "signup.html";
	});
	document.getElementById("login").addEventListener("click", function () {
		customer.login(bank);
	});
}

if (window.location.href.includes("signup.html")) {
	document.getElementById("login-btn").addEventListener("click", function () {
		window.location.href = "login.html";
	});
	document.getElementById("create-btn").addEventListener("click", function () {
		customer.signup();
	});
}

if (window.location.href.includes("dashboard.html")) {
	if (sessionStorage.getItem("email") == null) {
        window.location.href = "login.html";
    }

	let cust = bank.getCustomerByEmail(sessionStorage.getItem("email"));
	let acc = cust.getPrimaryAccount();
	let pCard = acc.getAccessCard();

	document.getElementById("logout").addEventListener("click", function () {
		sessionStorage.clear();
		window.location.href = "login.html";
	});

	// Add Debit Cards to List of Accounts
	updateDebit(pCard, acc);

	// Add Credit Cards to List of Accounts
	updateCredit(acc);

	// Fill the Quick Action form
	fillForm(acc, pCard);

	// Add Credit and Debit Card Buttons
	document.getElementById("addDebit").addEventListener("click", function (event) {
		bank.createDebitCard(cust,500);
		updateDebit(pCard, acc);
		updateCredit(acc);
		fillForm(acc, pCard);
	});

	document.getElementById("addCredit").addEventListener("click", function (event) {
		bank.createCreditCard(cust,1500,0.12);
		updateDebit(pCard, acc);
		updateCredit(acc);
		fillForm(acc, pCard);
	});

	document.getElementById("removeDebit").addEventListener("click", function (event) {
		bank.removeCardFromCustomer(cust,'DebitCard');
		updateDebit(pCard, acc);
		updateCredit(acc);
		fillForm(acc, pCard);
	});

	document.getElementById("removeCredit").addEventListener("click", function (event) {
		bank.removeCardFromCustomer(cust,'CreditCard');
		updateDebit(pCard, acc);
		updateCredit(acc);
		fillForm(acc, pCard);
	});

	// Quick Action Button Listeners
	var form1 = document.getElementById("makePayment");
	function handleForm(event) {
		event.preventDefault();
	}
	form1.addEventListener("submit", handleForm);

	const formPayment1 = document.getElementById("makePayment");

	formPayment1.addEventListener("submit", function (event) {
		const formData = new FormData(formPayment1);
		const paccount = formData.get("PaymentFromAccount");
		const email = formData.get("Email");
		const amount = formData.get("Amount1");

		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

		if (email == null) {
			document.getElementById("Email").style.borderColor = "red";
		} else {
			if (email.match(mailformat)){
				document.getElementById("Email").style.borderColor = "black";
			}
			else{
				document.getElementById("Email").style.borderColor = "red";
			}
		}

		if (paccount == null) {
			document.getElementById("PaymentFromAccount").style.borderColor = "red";
		} else {
			document.getElementById("PaymentFromAccount").style.borderColor = "black";
		}

		let accCard = acc.getCardByNumber(paccount);
		let cust = bank.getCustomerByEmail(email);
		let payee = cust.getPrimaryAccount();

		if (payee != null) {
			let pCard = payee.getAccessCard();
			bank.transfer(accCard, pCard, parseFloat(amount));
			
			var reg = /^[0-9]+([.][0-9]+)?([0-9]+)?$/;
			if (amount.match(reg)){
				document.getElementById("Amount1").style.borderColor = "black";
			}
			else{
				document.getElementById("Amount1").style.borderColor = "red";
			}
		}

		updateDebit(pCard, acc);
		updateCredit(acc);
	});

	var form2 = document.getElementById("makeTransfer");
	function handleForm1(event) {
		event.preventDefault();
	}
	form2.addEventListener("submit", handleForm1);

	const formPayment2 = document.getElementById("makeTransfer");

	formPayment2.addEventListener("submit", function (event) {
		const formData = new FormData(formPayment2);
		const fromAccount = formData.get("TransferFromAccount");
		const toAccount = formData.get("TransferToAccount");
		const amount = formData.get("Amount2");

		if (fromAccount == null){
			document.getElementById("TransferFromAccount").style.borderColor = "red";

		}else{
			document.getElementById("TransferFromAccount").style.borderColor = "black";
		}

		if (toAccount == null){
			document.getElementById("TransferToAccount").style.borderColor = "red";

		}else{
			document.getElementById("TransferToAccount").style.borderColor = "black";
		}

		let accCard = acc.getCardByNumber(fromAccount);
		let payee = acc.getCardByNumber(toAccount);

		var reg = /^[0-9]+([.][0-9]+)?([0-9]+)?$/;
		if (amount.match(reg)){
			bank.transfer(accCard, payee, parseFloat(amount));
			document.getElementById("Amount2").style.borderColor = "black";
		}
		else{
			document.getElementById("Amount2").style.borderColor = "red";
		}

		updateDebit(pCard, acc);
		updateCredit(acc);
	});

	var form3 = document.getElementById("makeWithdraw");
	function handleForm2(event) {
		event.preventDefault();
	}
	form3.addEventListener("submit", handleForm2);

	const formPayment3 = document.getElementById("makeWithdraw");

	formPayment3.addEventListener("submit", function (event) {
		const formData = new FormData(formPayment3);
		const fromAccount = formData.get("WithdrawFromAccount");
		const amount = formData.get("Amount3");

		let accCard = acc.getCardByNumber(fromAccount);

		if (fromAccount == null){
			document.getElementById("WithdrawFromAccount").style.borderColor = "red";

		}else{
			document.getElementById("WithdrawFromAccount").style.borderColor = "black";
		}

		var reg = /^[0-9]+([.][0-9]+)?([0-9]+)?$/;
		if (amount.match(reg)){
			bank.withdraw(accCard, parseFloat(amount));
			document.getElementById("Amount3").style.borderColor = "black";
		}
		else{
			document.getElementById("Amount3").style.borderColor = "red";
		}

		updateDebit(pCard, acc);
		updateCredit(acc);
	});

	var form4 = document.getElementById("makeDeposit");
	function handleForm3(event) {
		event.preventDefault();
	}
	form4.addEventListener("submit", handleForm3);

	const formPayment4 = document.getElementById("makeDeposit");

	formPayment4.addEventListener("submit", function (event) {
		const formData = new FormData(formPayment4);
		const fromAccount = formData.get("DepositToAccount");
		const amount = formData.get("Amount4");

		if (fromAccount == null){
			document.getElementById("DepositToAccount").style.borderColor = "red";

		}else{
			document.getElementById("DepositToAccount").style.borderColor = "black";
		}

		let accCard = acc.getCardByNumber(fromAccount);

		var reg = /^[0-9]+([.][0-9]+)?([0-9]+)?$/;
		if (amount.match(reg)){
			bank.deposit(accCard, parseFloat(amount));
			document.getElementById("Amount4").style.borderColor = "black";
		}
		else{
			document.getElementById("Amount4").style.borderColor = "red";
		}

		updateDebit(pCard, acc);
		updateCredit(acc);
	});
}

// Add Primary Card to the Quick Action Menu
function fillForm(acc, pCard) {

	document.getElementById("TransferFromAccount").innerHTML = "";
	document.getElementById("TransferFromAccount").innerHTML += '<option value="" disabled selected hidden>Select Account...</option></select><br/>';
	document.getElementById("WithdrawFromAccount").innerHTML = "";
	document.getElementById("WithdrawFromAccount").innerHTML += '<option value="" disabled selected hidden>Select Account...</option></select><br/>';
	document.getElementById("DepositToAccount").innerHTML = "";
	document.getElementById("DepositToAccount").innerHTML += '<option value="" disabled selected hidden>Select Account...</option></select><br/>';
	document.getElementById("TransferToAccount").innerHTML = "";
	document.getElementById("TransferToAccount").innerHTML += '<option value="" disabled selected hidden>Select Account...</option></select><br/>';
	document.getElementById("PaymentFromAccount").innerHTML = "";
	document.getElementById("PaymentFromAccount").innerHTML += '<option value="" disabled selected hidden>Select Account...</option></select><br/>';

	let el = document.createElement("option");
	el.innerHTML = pCard.getIdentifier();
	document.getElementById("TransferFromAccount").appendChild(el);

	el = document.createElement("option");
	el.innerHTML = pCard.getIdentifier();
	document.getElementById("WithdrawFromAccount").appendChild(el);

	el = document.createElement("option");
	el.innerHTML = pCard.getIdentifier();
	document.getElementById("DepositToAccount").appendChild(el);

	el = document.createElement("option");
	el.innerHTML = pCard.getIdentifier();
	document.getElementById("TransferToAccount").appendChild(el);

	el = document.createElement("option");
	el.innerHTML = pCard.getIdentifier();
	document.getElementById("PaymentFromAccount").appendChild(el);

	// Add all other Cards to the Quick Action Menu

	for (let i = 0; i < acc.getCards().length; i++) {
		let el = document.createElement("option");
		el.innerHTML = acc.getCards()[i].getIdentifier();
		document.getElementById("TransferFromAccount").appendChild(el);

		el = document.createElement("option");
		el.innerHTML = acc.getCards()[i].getIdentifier();
		document.getElementById("WithdrawFromAccount").appendChild(el);

		el = document.createElement("option");
		el.innerHTML = acc.getCards()[i].getIdentifier();
		document.getElementById("DepositToAccount").appendChild(el);

		el = document.createElement("option");
		el.innerHTML = acc.getCards()[i].getIdentifier();
		document.getElementById("TransferToAccount").appendChild(el);

		el = document.createElement("option");
		el.innerHTML = acc.getCards()[i].getIdentifier();
		document.getElementById("PaymentFromAccount").appendChild(el);
	}
}

function updateDebit(pCard, acc) {
	document.getElementById("debitAccounts").innerHTML = "";

	var debitCards = document.getElementById("debitAccounts");
	var el = document.createElement("DebitCard");
	el.innerHTML =
		'<div class="accountSum"><div class="accountDesc"><div style="flex-direction: column;"><p class="accountType">Access Card</p><p><a href="../detailedview.html" id="' + pCard.getIdentifier() + '" class="accountNum ">' +
		pCard.getIdentifier() +
		'</a></p></div><p class="accountBal">' +
		parseFloat(pCard.getBalance().toFixed(2)) +
		" CAD</p></div></div>";
	debitCards.appendChild(el);

	document.getElementById(pCard.getIdentifier()).addEventListener("click", function() {
        sessionStorage.setItem("cardToView", JSON.stringify(pCard));
    });
    
	for (let i = 0; i < acc.getCards().length; i++) {
		if (acc.getCards()[i].constructor.name == "DebitCard") {
			var debitCards = document.getElementById("debitAccounts");
			var el = document.createElement("DebitCard");
			el.innerHTML =
				'<div class="accountSum"><div class="accountDesc"><div style="flex-direction: column;"><p class="accountType">Debit</p><p><a href="../detailedview.html" id="' + acc.getCards()[i].getIdentifier() + '" class="accountNum  hover-underline-animation">' +
				acc.getCards()[i].getIdentifier() +
				'</a></p></div><p class="accountBal">' +
				parseFloat(acc.getCards()[i].getBalance().toFixed(2)) +
				" CAD</p></div></div>";
			debitCards.appendChild(el);
            document.getElementById(acc.getCards()[i].getIdentifier()).addEventListener("click", function(i) {
                return function() {
                    sessionStorage.setItem("cardToView", JSON.stringify(acc.getCards()[i]));
                }
            }(i));
		}
	}
}

function updateCredit(acc) {
	document.getElementById("creditAccounts").innerHTML = "";
	for (let i = 0; i < acc.getCards().length; i++) {
		if (acc.getCards()[i].constructor.name == "CreditCard") {
			var debitCards = document.getElementById("creditAccounts");
			var el = document.createElement("CreditCard");
			el.innerHTML =
				'<div class="accountSum"><div class="accountDesc"><div style="flex-direction: column;"><p class="accountType">Credit</p><p><a href="../detailedview.html" id="' + acc.getCards()[i].getIdentifier() + '" class="accountNum hover-underline-animation">' +
				acc.getCards()[i].getIdentifier() +
				'</a></p></div><p class="accountBal">' +
				parseFloat(acc.getCards()[i].getBalance().toFixed(2)) +
				" CAD</p></div></div>";
			debitCards.appendChild(el);
            document.getElementById(acc.getCards()[i].getIdentifier()).addEventListener("click", function(i) {
                return function() {
                    sessionStorage.setItem("cardToView", JSON.stringify(acc.getCards()[i]));
                }
            }(i));
		}
	}
}

window.onload = function () {
	var bank = new Bank();
};
