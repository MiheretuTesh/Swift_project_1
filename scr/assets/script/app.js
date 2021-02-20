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
const username = document.querySelector("#username")
const password = document.querySelector("#password")
//createProject and getProject
const getProjectBtn = document.querySelector("#getProjectBtn")
const listProject = document.querySelector("#listProject")  

getProjectBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    let list = DB.getProjects();
    console.log(list)
})

//login
login.addEventListener('submit', (e) => {
    e.preventDefault();
    let result = DB.login(username.value, password.value)
    console.log(result)
})
//create account
register.addEventListener('submit', (e) => {
    e.preventDefault();
    DB.createAccount(fullName.value,uname_register.value,password_register.value,birthDay.value);
})

//create project



//get Projects
