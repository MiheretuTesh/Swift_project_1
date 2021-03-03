import UI from "./ui.js";
import Database from "./db.js";

const DB = new Database(),
    ui = new UI();

let cardModalTitle = document.querySelector('.modal-heading');
let cardModalDescription = document.querySelector('.modal-txt');
let cardModalSave = document.querySelector('.modal-save');

let cardModalTitle = document.querySelector(".modal-heading");
let cardModalDescription = document.querySelector(".modal-txt");
let cardModalSave = document.querySelector(".task-modal-save");
const taskAddingModal = document.querySelector('#task-adding-modal');

//Create Account
const registerForm = document.querySelector("#register");
const fullName = document.querySelector("#fullNameID");
const uname_register = document.querySelector("#unameID");
const password_register = document.querySelector("#registerPassword");
const birthDay = document.querySelector("#birthDay");
//Log in
const login = document.querySelector("#login");
const username = document.querySelector("#username");
const password = document.querySelector("#loginPassword");
//get users
const getUsersBtn = document.querySelector("#getUsersBtn");
//createProject and getProject
const projectCards = document.querySelector('.list-boards');
const projectCard = document.querySelector('.boards');
const createProjectBtn = document.querySelector(".new-board");
const projectForm = document.querySelector('.addProjectForm');
//create task
const getTaskBtn = document.querySelector("#getTaskBtn")
const createTaskBtn = document.querySelector("#createTaskBtn")
const listTask = document.querySelector("#listTask")
//task details




const currentProject = sessionStorage.getItem('currentProject');
const currentUser = sessionStorage.getItem('currentUser');




if(projectCards){
    document.addEventListener('click', e => {
        let target = e.target;
        if(target.classList.contains('boards') || target.parentElement.classList.contains('boards')){
            console.log(e.target)
            let projectName;
            if(target.tagName === 'DIV'){
                projectName = target.firstElementChild.textContent;
            }else if(target.classList.contains('bttom-block-description')){
                projectName = target.previousElementSibling.textContent;
            }else{
                projectName = target.textContent;
            }
            sessionStorage.setItem('currentProject', projectName);
            window.open('index.html', "_self");
        }
    });
}


if (projectForm) {
    projectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let inputs = [...e.explicitOriginalTarget];

        const [projectName, deadline] = [...inputs];
        const description = inputs[inputs.length - 2];
        let userNames = inputs.slice(2, inputs.length - 2);
        userNames = userNames
            .filter((user) => user.checked)
            .map((user) => user.value);


        

        DB.createProject(
            projectName.value,
            currentUser,
            userNames,
            deadline.value,
            description.value
        ).then(() => {
            DB.getProjects().then((projects) => {
                ui.hideAddProject(projects);
                DB.userManages(currentUser, projectName.value);
                userNames.forEach(user => DB.addProjectToUser(user, projectName.value));
                location.reload();

            });
        });
    });
    

    document.addEventListener("DOMContentLoaded", e => {
        e.preventDefault();
        const currentUser = sessionStorage.getItem('currentUser');
        
        let projects = [];
        DB.getUser(currentUser).
            then(data =>{ 
                projects = [... data.managerOf, ... data.memberOf];
                projects = projects.map(async project =>  {
                    if(project) return await DB.getProject(project);     
                });
                return projects;
            })
            .then(projects => {
                return Promise.all(projects)
            })
            .then( (projects) => {
                let projs = projects.filter(project => project!==undefined);
                console.log(projs)
                ui.displayProjects(projs)});
        

    });

    //TODO: change getting the projects from the whole projects table to the users' 2 fields   
    //TODO: add the created project to the list of the the manager and the memebers
}

if (createProjectBtn) {
    createProjectBtn.addEventListener("click", (e) => {
        e.preventDefault();
        DB.getUsers().then((users) => {
            users = users.filter(user => user.userName!==currentUser);
            ui.addProject(users);
        });
        
    
    });
}

if (addTaskBtn) {
    DB.getProject(currentProject).then( project => {
        return [project.managedBy, ... project.hasMembers];
    })
    .then(projects => addTaskBtn.addEventListener("click", (e) => ui.addTask(projects)));
    
}

if (taskAddingModal) {
    cardModalSave.addEventListener("click", (e) => {
        e.preventDefault();
        const userListSelector = taskAddingModal.querySelector('.modal-content').querySelector('.users-list');
        const taskName = cardModalTitle.textContent;
        const inputs = taskAddingModal.querySelector('.modal-content').children
        const deadline = inputs.item(3).value;
        const description = inputs.item(6).value;
        const tag = "To-do";
 

        let userName = [... userListSelector.children]
            .filter(tag => tag.tagName == "INPUT")
            .filter(tag => tag.checked)
            .map(tag => tag.value)[0]

    
        DB.createTask(taskName, userName, currentProject, tag, deadline, description)
            .then(() => {
                ui.addCard(taskName);
                ui.hideAddTask();
                cardModalTitle.textContent = "New Task"
                cardModalDescription.textContent = "Enter your description here ... "
            }).catch(err => console.log("Creating task failed(App.js)🥺: ", err));
    });

    document.addEventListener('DOMContentLoaded', e => {
        e.preventDefault();
        DB.getTasks(currentProject)
            .then(tasks => {
                ui.displayTasks(tasks);
        })
    });
    
}

if (wrapper) {
    let draggedItem, draggedTo;
    wrapper.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (e.target.classList.contains("container")) {
            draggedTo = e.target
            const afterElement = getDragAfterElement(e.target, e.clientY);
            const draggable = document.querySelector(".dragging");
            if (afterElement) {
                e.target.insertBefore(draggable, afterElement);
            } else {
                e.target.appendChild(draggable);
            }
        }
    });

    wrapper.addEventListener("dragstart", (e) => {
        if (e.target.classList.contains("draggable")) {
            e.target.classList.add("dragging");
        }
        draggedItem = e.target;
    });

    wrapper.addEventListener("dragend", (e) => {
        if (e.target.classList.contains("draggable")) {
            e.target.classList.remove("dragging");
        }
        const taskName = draggedItem.querySelector('p').textContent.trim();
        const tagName = draggedTo.children.item(0).querySelector('p').textContent.trim();
        DB.updateTag(taskName, tagName);
    });

    

}

if(ui.boardsContainer){
    let board = ui.boardsContainer.querySelector('.boards');
    if(board){
        board.addEventListener('click', e => {
            console.log('board clicked')
        });
    }
}


let getDragAfterElement = (container, y) => {
    const draggableElements = [
        ...container.querySelectorAll(".draggable:not(.dragging)")
    ];

    return draggableElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offSet = y - box.top - box.height / 2;
            if (offSet < 0 && offSet > closest.offSet) {
                return {
                    offSet: offSet,
                    element: child
                };
            } else {
                return closest;
            }
        }, {
            offSet: Number.NEGATIVE_INFINITY
        }
    ).element;
};


//create account
if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        DB.getUser(uname_register.value)
            .then(exists => {
                if(exists){
                    ui.addLoginMessage(false, 'signup');
                }else{
                    DB.createAccount(
                        fullName.value,
                        uname_register.value,
                        password_register.value,
                        birthDay.value
                    ).then(result => {
                        ui.addLoginMessage(result, 'signup');
                        sessionStorage.setItem("currentUser", uname_register.value);
                    });
                }
            })
    });
}

//login
if(login) {
    login.addEventListener("submit", (e) => {
        e.preventDefault();
        DB.login(username.value, password.value)
            .then(result => {
                ui.addLoginMessage(result, 'login');
                sessionStorage.setItem("currentUser", username.value);

            }
        );
    });
}

//get users
if (getUsersBtn) {
    getUsersBtn.addEventListener("click", (e) => {
        console.log("event fired");
        e.preventDefault();
        DB.getUsers().then((users) => {
            ui.generateUsersCheckbox(users);
        });
    });
}




//create project
if (addTaskBtn) {
    wrapper.addEventListener('click', e => {
        if(e.target.classList.contains('inner') || e.target.classList.contains('inner-list') || e.target.parentElement.classList.contains('inner-list')){
            
            let target;
            if(e.target.classList.contains('inner')){
                target = e.target;
            }else if(e.target.classList.contains('inner-list')){
                target = e.target.parentElement
            }else if(e.target.parentElement.classList.contains('inner-list')){
                target = e.target.parentElement.parentElement;
            }
            let taskName = target.querySelector('.inner-text').textContent.trim();
            
            DB.getTask(taskName)
                .then(task => ui.taskInfo(task))
            
        }
    });
}

