import Database from './database.js';

//Create Account    
const registerBtn = document.querySelector("#registerBtn")
const fullName = document.querySelector("#fullNameID").value
const username = document.querySelector("#unameID").value
const password = document.querySelector("#passID").value
const birthDay = document.querySelector("#birthDay").value


registerBtn.addEventListener('click', () => Database.createAccount())

