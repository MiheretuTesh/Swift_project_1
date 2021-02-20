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

//project details
const projectName = document.querySelector("#projectName")
const projectManager  = document.querySelector("#projectManager")
const projectMembers = ['sura', 'segno', 'mere', 'kaleab']
const Deadline = document.querySelector("#projectDeadLine")
const description = document.querySelector("#projectDescription")





if(addTaskBtn){
    console.log('fadkfalskfj')
    addTaskBtn.addEventListener('click', e => ui.addTask());
}


if(cardModalSave){
    cardModalSave.addEventListener('click', e => {
        e.preventDefault();
        ui.addCard(cardModalTitle.textContent);
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



if(getProjectBtn){
    getProjectBtn.addEventListener('click', (e) => {
        console.log('event fired')
        e.preventDefault();
        let list = DB.getProjects();
        
    })
}

//login
if (login){
    login.addEventListener('submit', (e) => {
        e.preventDefault();
        DB.login(username.value, password.value)
            .then(result => ui.addLoginMessage(result))
    })
}
//create account
if (register){
register.addEventListener('submit', (e) => {
    e.preventDefault();
    DB.createAccount(fullName.value,uname_register.value,password_register.value,birthDay.value);
})}

//create project



//get Projects
