//stuff to remember
// string dont have to be stored in lower case. ignore case searches are possible
// I can add filter if you want. You guys design a filter checkbox and let me know. I'll write queries based on that



export default class Database {
    
     constructor(){
        this.db =  new Dexie("swiftDB");
         this.db.version(1).stores({
            users: '++id, username, fullName, password, birthDay, managerOf, memberOf, hasTasks',
            project: '++id, name, managedBy, hasMembers, deadline, description, status',
            task: '++id, name, doneBy, assignedBy, underProject, tag, deadline, description, status' //tag: b, t, i, d
        });
         this.db.open();
    }

    //create account in the database
     async createAccount (fullName, username, password, birthDay) {
        await this.db.users.put({fullName: fullName.toLowerCase(), username: username.toLowerCase(), password: password, birthDay: birthDay, managerOf: [], memberOf:[], hasTasks:[] })
        .then (function(){
            return this.db.users;
        }).then(function () {
            console.log("Account created successfully!")        
            location.reload();  
        }).catch(function(error) {   
           console.log("Check out this error: " + error);
        });
    }
    
    //verfiy eistence of account and return a boolean
    async login(usernameInput, passwordInput){
        let found = false;
        await this.db.users.each(user =>{
            if (user.username == usernameInput && user.password == passwordInput){
                console.log('success')
                found =  true;
                sessionStorage.setItem("currentUser", usernameInput);
            }
        });
        return found;
        
    }


    //create project
    async createProject (projectName, projectManager, projectMembers, Deadline, description) {
       await this.db.project.put({
                                    name: projectName, 
                                    managedBy:projectManager, 
                                    hasMembers:projectMembers, 
                                    deadline:Deadline, 
                                    Description:description, 
                                    status:0
            }).then (function(){
                return db.users;
            }).then(function () {
                console.log("Project created successfully!")
                location.reload();
                return true
            }).catch(function(error) {
                console.log("Check this error out: " + error);
                return false
            });
    } 

    //get Projects
     async getProjects() {
        console.log('got here')
        let projectList = []
        await this.db.project.each( project => {
           projectList.push({'name': project.name, 
                            'managedBy': project.managedBy, 
                            'members': project.hasMembers, 
                            'deadline': project.deadline, 
                            'description': project.Description, 
                            'status': project.status})
                            })
        return projectList;
        }

    //create tasks
     async createTask () {
        await this.db.task.put({name:taskName, 
            doneBy: doneBy, 
            assignedBy: assignedBy, 
            underProject: underProject, 
            tag: tag, 
            deadline: Deadline, 
            description: description, 
            status:0}).then (function(){
            return db.users;
        }).then(function (users) {
            console.log("Task created successfully!")
            location.reload();
        }).catch(function(error) {
           alert ("Check this error out: " + error);
        });
    }
    //get users
    async getUsers(){
        let usersList = [];
        await this.db.users.each( user => {
            usersList.push(
                {
                'userName' : user.username, 
                'fullName': user.fullName, 
                'password': user.password, 
                'birthDay': user.birthDay, 
                'managerOf': user.managerOf, 
                'memberOf': user.memberOf, 
                'hasTasks': user.hasTasks
            });
        })   
    return usersList
    }
    





}










function login(){
    //get username and password inputs
    const usernameInput = document.querySelector("#username").value
    const passwordInput = document.querySelector("#password").value
    //check if account exitsts
    db.users.where({username: usernameInput, password:passwordInput})   
    
    //if login is successful store in sessionStorage the current username for personalization of tasks, and projects
    sessionStorage.setItem("currentUser", usernameInput)
}


function createAccount () {
    // get username and password and attach an event listener
    const fullName = document.querySelector("#fullNameID").value
    const username = document.querySelector("#unameID").value
    const password = document.querySelector("#passID").value
    const birthDay = document.querySelector("#birthDay").value
    
    //
    //convert all inputs into lower case here. 
    //

    // add account to database
    db.users.put({fullName: fullName, username: username, password: password, birthDay: birthDay, managerOf: [], memberOf:[], hasTasks:[] }).then (function(){
        return db.users;
    }).then(function () {
        console.log("Account created successfully!")
        location.reload();
    }).catch(function(error) {   
       alert ("Check this error out: " + error);
    });
}
