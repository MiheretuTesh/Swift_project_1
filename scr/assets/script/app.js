import UI from './ui.js';
import Database from './database.js';
const DB = new Database(),
      ui = new UI();

let wrapper = document.querySelector('#wrapper');
let addTaskBtn = document.querySelector('.add-task');

let cardModalTitle = document.querySelector('.modal-heading');
let cardModalDescription = document.querySelector('.modal-txt');
let cardModalSave = document.querySelector('.modal-save');


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
const createProjectBtn = document.querySelector(".new-board")
const listProject = document.querySelector("#listProject")
const projectForm = document.querySelector('.addProjectForm');
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


if(projectForm){
    projectForm.addEventListener('submit', e => {
        e.preventDefault();
        ui.hideAddProject();
        let inputs = [... e.explicitOriginalTarget];
        
        const [projectName, deadline]= [...inputs];
        const description = inputs[inputs.length-2];
        let userNames = inputs.slice(2, inputs.length-2)
        userNames = userNames.filter(user => user.checked).map(user => user.value);
        
        console.log('Project Name', projectName.value)
        console.log('Deadline ', deadline.value);
        console.log('Description ', description.value)
        console.log('Users Added ', userNames);

        DB.createProject(projectName.value, sessionStorage.getItem('currentUser'), 
                        userNames, deadline.value, description.value);

    });
}

if(createProjectBtn){
    createProjectBtn.addEventListener('click', e => {
        e.preventDefault();
        DB.getUsers().then(users => {
            ui.addProject(users)
        });
    });
}

if(addTaskBtn){
    console.log('Creating task ... ');
    addTaskBtn.addEventListener('click', e => ui.addTask());
}


if(cardModalSave){
    cardModalSave.addEventListener('click', e => {
        e.preventDefault();
        ui.addCard(cardModalTitle.textContent);
        ui.hideAddTask()
    })
    

}


if(wrapper){
    wrapper.addEventListener('click', e => {
        if(e.target.classList.contains('add-new-list')){
            ui.addList(e);
            
        }else if(e.target.classList.contains('')){
            ui.addCard(e);
        }else if(e.target.classList.contains('')){
            ui.addCardConfirm(e);
        }else if(e.target.classList.contains('')){
            ui.addCardCancel(e);
        }
        
    })

    wrapper.addEventListener('dragover', e => {
        e.preventDefault();
        if(e.target.classList.contains('container')){
            const afterElement = getDragAfterElement(e.target, e.clientY);
            const draggable = document.querySelector('.dragging');
            if(afterElement){
                e.target.insertBefore(draggable, afterElement);
            }else{
                e.target.appendChild(draggable);
            }
        }
    });
    
    wrapper.addEventListener('dragstart', e =>{
        if(e.target.classList.contains('draggable')){
            e.target.classList.add('dragging');
        }
    })
    
    wrapper.addEventListener('dragend', e => {
        if(e.target.classList.contains('draggable')){
            e.target.classList.remove('dragging');
        }
    })
}


let getDragAfterElement = (container, y) => {
    const draggableElements = [... container.querySelectorAll('.draggable:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        console.log(box)
        const offSet = y - box.top - (box.height/2);
        if(offSet < 0 && offSet > closest.offSet){
            return {offSet: offSet, element: child};
        }else{
            return closest;
        }
    }, { offSet: Number.NEGATIVE_INFINITY }).element;
}



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
        DB.login(username.value, password.value)
            .then(result => ui.addLoginMessage(result))
    })
}

//get users
if (getUsersBtn){
    getUsersBtn.addEventListener('click', (e) => {
        console.log('event fired')
        e.preventDefault();
        DB.getUsers().then(users => {
            ui.generateUsersCheckbox(users);
        })            
    })
}



//create project
if (createProjectBtn){
    createProjectBtn.addEventListener('click', (e) => {
        console.log('event fired')
        e.preventDefault();
        // let accountCreationBool = DB.createProject(projectName.value, sessionStorage.getItem('currentUser'), projectMembers.value, Deadline.value, description.value);
        // use accountCreationBool here, or pass it to another function 
})}

//get Projects
if(getProjectBtn){
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
}   
//create project
if (createTaskBtn){
    createTaskBtn.addEventListener('click', (e) => {
        console.log('event fired')
        e.preventDefault();
    
    })
}
