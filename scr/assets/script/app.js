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
//get users
const getUsersBtn = document.querySelector("#getUsersBtn")
const listUser = document.querySelector("#listUser")
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
    DB.login(username.value, password.value).then(loginCheckBool => {
        //use loginCheckBool here
        console.log(loginCheckBool)
    })
    
})}
//get users
if (getUsersBtn){
    let usersList = []
    getUsersBtn.addEventListener('click', (e) => {
        console.log('event fired')
        e.preventDefault();
        DB.getUsers().then(users => {
            users.forEach(user => {
                var li = document.createElement('li')
                li.innerHTML = `${user[0]} ${user[1]} ${user[2]} ${user[3]} ${user[4]} ${user[5]} ${user[6]}`
                listUser.appendChild(li)
            })

        })            
    })
}



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
    DB.getProjects().then(projects => {
    projects.forEach((project) =>  {
        var li = document.createElement('li')
        li.innerHTML = `${project[0]} & ${project[1]} & ${project[2]} & ${project[3]} & ${project[4]} & ${project[5]}`
        listProject.appendChild(li)
    })
    });

})       