//stuff to remember
// string doesnt have to be stored in lower case. ignore case searches are possible
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
            if (user.username == usernameInput.toLowerCase() && user.password == passwordInput){
                console.log('success')
                found =  true;
                sessionStorage.setItem("currentUser", usernameInput);
            }
        });
        return found;
        
    }
    //create project
    async createProject (projectName, projectManager, projectMembers, Deadline, description) {
       await this.db.project.put({name: projectName.toLowerCase(), managedBy:projectManager.toLowerCase(), hasMembers:projectMembers, deadline:Deadline, Description:description, status:0}).then (function(){
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
           projectList.push([project.name, project.managedBy, project.hasMembers, project.deadline, project.Description, project.status])
            })
        return projectList
        }

    //create tasks
     async createTask (name, doneBy, assignedBy, underProject, tag, Deadline, description) {
        this.db.task.put({name:taskName, doneBy: doneBy, assignedBy: assignedBy, underProject: underProject, tag: tag, deadline: Deadline, description: description, status:0}).then (function(){
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
            usersList.push([user.username, user.fullName, user.password, user.birthDay, user.managerOf, user.memberOf, user.hasTasks])
        })   
    return usersList
    }
    
    //get a user
    async getUser(usernameInput){
        foundUser = false;
        let userInfo;
        await this.db.users.each(user => {
            if (user.username == usernameInput){
                userInfo = {
                    "username": user.username, 
                    "fullName": user.fullName, 
                    "password": user.password,
                    "birthDay": user.birthDay,
                    "managerOf": user.managerOf,
                    "memberOf": user.memberOf, 
                    "hasTasks": user.hasTasks
                }
                foundUser = true
            }
        })
        if (foundUser) { return userInfo }
        return foundUser
    }

    async getProject(projectNameInput){
        foundProject = false;
        let projectInfo;
        await this.db.users.each(project => {
            if (project.name == projectNameInput){ 
                projectInfo = {  
                    "name":project.name ,
                    "managedBy":project.managedBy ,
                    "hasMembers":project.hasMembers ,
                    "deadline":project.deadline ,
                    "description":project.description ,
                    "status":project.status ,
                }
                foundProject = true
            }
        })
        if (foundProject) {return projectInfo}
        return foundProject
    }



    async addMember(usernameInput, projectNameInput){
        
    }

    
    //______________________________ get project(projectName)
    // add member to a project
    // remove member from a project
    // complete a task
    // complete a project
    // when a project is opened, sessionStorage.setItem("currentProject", projectName)
    // change username
    // change password
    // leave project
    // delete task
    // delete project
    // drop task
    // progress

}//end of curly brace


