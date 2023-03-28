import Account from "./Account.js"
import DebitCard from "./DebitCard.js";
import Bank from "./Bank.js";

export default class Customer {
    constructor(username,email,account) {
        this.username = username;
        this.email = email;
        this.primaryAccount = account;
    }

    // Getter Method(s)
    getPrimaryAccount() { return this.primaryAccount; }
    getUsername() { return this.username; }
    getEmail() { return this.email; }

    // Setter Method(s)
    setUsername(username) { this.username = username; }
    setEmail(email) { this.email = email; }
}

export function signup() {
    var name = document.getElementById('Name');
    var pw1 = document.getElementById('password1');
    var pw2 = document.getElementById('password2');
    var email = document.getElementById('Email');
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var letters = /^[A-Za-z]+$/;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (name.value.length == 0) {
        alert('Please fill in Name');

    } else if (!name.value.match(letters)) {
        alert('Name cannot contain numbers');

    } else if (!email.value.match(mailformat)) {
        alert('Invalid Email address');
    }
    else if (pw1.value.length == 0) {
        alert('Please fill in password');
    } else if (pw1.value.length > 16) {
        alert('Max of 16');

    } else if (!pw1.value.match(numbers)) {
        alert('please add 1 number');

    } else if (!pw1.value.match(upperCaseLetters)) {
        alert('please add 1 uppercase letter');

    } else if (!pw1.value.match(lowerCaseLetters)) {
        alert('please add 1 lowercase letter');

    } else if (pw2.value.length == 0){
        alert ('please confirm password');
    }
    else if (!(pw1.value === pw2.value)) {
        alert ('passwords do not match');
    } 
    else {
        var result = new Bank()
        console.log(result.createCustomer(name.value, email.value, pw1.value));
    }
}