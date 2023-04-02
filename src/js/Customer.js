import Bank from "./Bank.js";

export default class Customer {
	constructor(username, email, account) {
		this.username = username;
		this.email = email;
		this.primaryAccount = account;
	}

	// Getter Method(s)
	getPrimaryAccount() {
		return this.primaryAccount;
	}
	getUsername() {
		return this.username;
	}
	getEmail() {
		return this.email;
	}

	// Setter Method(s)
	setUsername(username) {
		this.username = username;
	}
	setEmail(email) {
		this.email = email;
	}
}

export function login(bank) {
	var email = document.getElementById("Email").value;
	var pw = document.getElementById("Pass").value;
	if (bank.getAccountByEmail(email) == null) {
		alert("Email not found");
	} else if (bank.getAccountByEmail(email).password == pw) {
		sessionStorage.setItem("email", email);
		window.location.href = "redirect.html";
	} else {
		alert("Incorrect Password");
	}
}

export function signup() {
	var name = document.getElementById("Name");
	var pw1 = document.getElementById("password1");
	var pw2 = document.getElementById("password2");
	var email = document.getElementById("Email");
	var lowerCaseLetters = /[a-z]/g;
	var upperCaseLetters = /[A-Z]/g;
	var numbers = /[0-9]/g;
	var letters = /^[A-Za-z]+$/;
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	if (name.value.length == 0) {
		name.style.backgroundColor = "#FFD6D6";
	} else if (!name.value.match(letters)) {
		name.style.backgroundColor = "#FFD6D6";
	} else if (!email.value.match(mailformat)) {
		name.style.backgroundColor = "white";
		email.style.backgroundColor = "#FFD6D6";
	} else if (pw1.value.length == 0) {
		name.style.backgroundColor = "white";
		email.style.backgroundColor = "white";
		pw1.style.backgroundColor = "#FFD6D6";
	} else if (pw1.value.length > 16) {
		alert("Max of 16");
		name.style.backgroundColor = "white";
		email.style.backgroundColor = "white";
		pw1.style.backgroundColor = "#FFD6D6";
	} else if (!pw1.value.match(numbers)) {
		alert("Please add 1 number");
		name.style.backgroundColor = "white";
		email.style.backgroundColor = "white";
		pw1.style.backgroundColor = "#FFD6D6";
	} else if (!pw1.value.match(upperCaseLetters)) {
		alert("Please add 1 uppercase letter");
		name.style.backgroundColor = "white";
		email.style.backgroundColor = "white";
		pw1.style.backgroundColor = "#FFD6D6";
	} else if (!pw1.value.match(lowerCaseLetters)) {
		alert("Please add 1 lowercase letter");
		name.style.backgroundColor = "white";
		email.style.backgroundColor = "white";
		pw1.style.backgroundColor = "#FFD6D6";
	} else if (pw2.value.length == 0) {
		name.style.backgroundColor = "white";
		email.style.backgroundColor = "white";
		pw1.style.backgroundColor = "white";
		pw2.style.backgroundColor = "#FFD6D6";
	} else if (!(pw1.value === pw2.value)) {
		name.style.backgroundColor = "white";
		email.style.backgroundColor = "white";
		pw1.style.backgroundColor = "white";
		pw2.style.backgroundColor = "#FFD6D6";
	} else {
		var result = new Bank();
		result.createCustomer(name.value, email.value, pw1.value);
		window.location.href = "login.html";
	}
}
