import Database from './database.js';
const DB = new Database()
//Create Account    
const register = document.querySelector("#register")
const fullName = document.querySelector("#fullNameID").value
const username = document.querySelector("#unameID").value
const password = document.querySelector("#passID").value
const birthDay = document.querySelector("#birthDay").value





register.addEventListener('submit', (e) => {
    e.preventDefault();
    DB.createAccount(fullName,username,password,birthDay);
})



//