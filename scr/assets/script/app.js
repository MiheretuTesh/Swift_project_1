import Database from './database.js';
const DB = new Database()
//Create Account    
const register = document.querySelector("#register")
const fullName = document.querySelector("#fullNameID")
const uname_register = document.querySelector("#unameID")
const password_register = document.querySelector("#passID")
const birthDay = document.querySelector("#birthDay")
//Log in
const login = document.querySelector("#login")
const username = document.querySelector("#username").value
const password = document.querySelector("#password").value


//login
login.addEventListener('submit', (e) => {
    e.preventDefault();
    DB.login(username, password)
})
//create account
register.addEventListener('submit', (e) => {
    e.preventDefault();
    DB.createAccount(fullName.value,uname_register.value,password_register.value,birthDay.value);
})


