import Database from './database.js';
const DB = new Database()
//Create Account    
const createAccountBtn = document.querySelector("#register")
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
const createProjectBtn = document.querySelector("#createProjectBtn")
const listProject = document.querySelector("#listProject")
    //project details
    const projectName = document.querySelector("#projectName")
    const projectManager  = document.querySelector("#projectManager")
    const projectMembers = document.querySelector("#projectMembers")
    const Deadline = document.querySelector("#projectDeadLine")
    const description = document.querySelector("#projectDescription")



//create account
if (createAccountBtn){
    createAccountBtn.addEventListener('submit', (e) => {
        e.preventDefault();
        DB.createAccount(fullName.value,uname_register.value,password_register.value,birthDay.value);
    })}
//login
if (login){
login.addEventListener('submit', (e) => {
    e.preventDefault();
    let result = DB.login(username.value, password.value)
    console.log(result)
})}
//create project
if (createProjectBtn){
    createProjectBtn.addEventListener('click', (e) => {
        console.log('event fired')
        e.preventDefault();
        let accountCreationBool = DB.createProject(projectName.value, projectManager.value, projectMembers.value, Deadline.value, description.value);
        // use accountCreationBool here, or pass it to another function 
})}

//get Projects
getProjectBtn.addEventListener('click', (e) => {
    console.log('event fired')
    e.preventDefault();
    DB.getProjects().then(data => {
    data[0].forEach((datum) =>  {
        var li = document.createElement('li')
        li.innerHTML = `${datum[0]} & ${datum[1]} & ${datum[2]} & ${datum[3]} & ${datum[4]} & ${datum[5]}`
        listProject.appendChild(li)
    })



    });

})       