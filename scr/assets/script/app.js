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
//create task
const getTaskBtn = document.querySelector("#getTaskBtn")
const createTaskBtn = document.querySelector("#createTaskBtn")
const listTask = document.querySelector("#listTask")
    //task details
    const taskName = document.querySelector("#taskName")
    const doneBy  = document.querySelector("#doneBy")
    const assignedBy = document.querySelector("#assignedBy")
    const underPorject = document.querySelector("#underPorject")
    const tag = document.querySelector("#tag")
    const taskDeadline = document.querySelector("#taskDeadline")
    const taskDescription = document.querySelector("#taskDescription")

//create account
if (createAccountBtn){
    createAccountBtn.addEventListener('submit', async (e) => {
        e.preventDefault();
        let  accountCreationBool = await DB.createAccount(fullName.value,uname_register.value,password_register.value,birthDay.value);
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
    createProjectBtn.addEventListener('click', async (e) => {
        console.log('event fired')
        e.preventDefault();
        let projectCreationBool = await DB.createProject(projectName.value, projectManager.value, projectMembers.value, Deadline.value, description.value);
        // use accountCreationBool here, or pass it to another function 
})}
//get Projects
getProjectBtn.addEventListener('click', (e) => {
    console.log('event fired')
    e.preventDefault();
    DB.getProjects().then(data => {
    data[0].forEach((datum) =>  {
        //modify the code below to paint the UI
        var li = document.createElement('li')
        li.innerHTML = `${project[0]} & ${project[1]} & ${project[2]} & ${project[3]} & ${project[4]} & ${project[5]}`
        listProject.appendChild(li)
    })
    });

})       
//create project
if (createTaskBtn){
    createTaskBtn.addEventListener('click', (e) => {
        console.log('event fired')
        e.preventDefault();
        let taskCreationBool = 
    })
}
