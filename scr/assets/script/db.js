//stuff to remember
// string doesnt have to be stored in lower case. ignore case searches are possible
// I can add filter if you want. You guys design a filter checkbox and let me know. I'll write queries based on that

export default class Database {
	constructor() {
		this.db = new Dexie("swiftDB");
		//FIXME: add a new objectStore "deletedItems: m"
		this.db.version(1).stores({
			users: "++id, username, fullName, password, birthDay, managerOf, memberOf, hasTasks",
			project: "++id, name, managedBy, hasMembers, deadline, description, status",
			task: "++id, name, doneBy, assignedBy, underProject, tag, deadline, description, status", //tag: b, t, i, d
		});
		this.db.open();
	}
	//_______________________________________OPERATOINS_ON_USERS_TABLE____________________________________________________

	//create account in the database
	async createAccount(fullName, username, password, birthDay) {
		let result = await this.db.users
			.put({
				fullName: fullName.toLowerCase(),
				username: username,
				password: password,
				birthDay: birthDay,
				managerOf: [],
				memberOf: [],
				hasTasks: [],
			})
			.then(() => {
				console.log("Account created successfully!😊");
				return true;
			})
			.catch((error) => {
				console.log("Account creation failed:🥺 " + error);
				return false;
			});

		return result;
	}

	//verfiy eistence of account and return a boolean
	//FIXME:
	async login(usernameInput, passwordInput) {
		let found = false;
		await this.db.users.each((user) => {
			if (user.username == usernameInput && user.password == passwordInput) {
				console.log("Logging in successful!😊");
				found = true;
			}
		});

		if (!found) console.log("Logging in failed!🥺 ");
		return found;
	}

	//get users
	async getUsers() {
		let usersList = [];
		await this.db.users.each((user) => {
			usersList.push({
				userName: user.username,
				fullName: user.fullName,
				password: user.password,
				birthDay: user.birthDay,
				managerOf: user.managerOf,
				memberOf: user.memberOf,
				hasTasks: user.hasTasks,
			});
		});
		return usersList;
	}

	//get user
	async getUser(usernameInput) {
		let userInfo = await this.db.users
			.get({
				username: usernameInput
			})
			.then((user) => {
				if (user)
					return {
						username: user.username,
						fullName: user.fullName,
						password: user.password,
						birthDay: user.birthDay,
						managerOf: user.managerOf,
						memberOf: user.memberOf,
						hasTasks: user.hasTasks,
					};
			})
			.catch((error) => {
				console.log("Error performing get User operation:🥺 ", error);
				return false;
			});

		return userInfo;
	}

	// get project
	async getProject(projectNameInput) {
		let projectInfo;
		await this.db.project.get({
				name: projectNameInput
			})
			.then((project) => {
				if(project){
					projectInfo = {
						name: project.name,
						managedBy: project.managedBy,
						hasMembers: project.hasMembers,
						deadline: project.deadline,
						description: project.Description,
						status: project.status,
					};
				}
				return;
			})
			.catch(error => console.log('Error performing get Project operation:🥺 ', error));

		return projectInfo;
	}


	async getTask(taskNameInput) {
		let taskInfo;
		await this.db.task.get({
				name: taskNameInput
			})
			.then(task => {
				taskInfo = {
					name: task.name,
					doneBy: task.doneBy,
					underProject: task.underProject,
					tag: task.tag,
					deadline: task.deadline,
					description: task.description,
					status: task.status,
				};
			})
			.catch(error => console.log('Error getting a single task.🥺: ', error))
		return taskInfo;
	}


	//_______________________________________OPERATIONS_ON_PROJECT_TABLE____________________________________________________

	//create project
	async createProject(
		projectName,
		projectManager,
		projectMembers,
		Deadline,
		description
	) {
		let result = await this.db.project
			.put({
				name: projectName,
				managedBy: projectManager,
				hasMembers: projectMembers,
				deadline: Deadline,
				Description: description,
				status: 0,
			})
			.then(() => {
				console.log("Project created successfully!😊");
				return true;
			})
			.catch((error) => {
				console.log("Creating project failed:🥺 " + error);
				return false;
			});

		return result;
	}

	//add created project to user's managerOf field.
	async userManages(usernameInput, projectNameInput) {
		let isManagerOf;
		let result = await this.db.users
			.get({
				username: usernameInput
			})
			.then((user) => {
				isManagerOf = user.managerOf;
				return isManagerOf;
			})
			.then((isManagerOf) => {
				isManagerOf.push(projectNameInput);
				return isManagerOf;
			})
			.then(async (isManagerOf) => {
				let res = await this.db.users
					.where("username")
					.equals(usernameInput)
					.modify({
						managerOf: isManagerOf
					});
				return res
			})
			.catch(err => console.log('Adding a project to a list of project managed by a user failed:🥺 ', err))

	}


	//get Projects
	async getProjects() {
		let projectList = [];
		await this.db.project.each((project) => {
			projectList.push({
				name: project.name,
				managedBy: project.managedBy,
				members: project.hasMembers,
				deadline: project.deadline,
				description: project.Description,
				status: project.status,
			});
		});
		return projectList;
	}

	async getTasks(projectName) {
		let taskList = [];
		await this.db.task.each(task => {
			taskList.push({
				name: task.name,
				doneBy: task.doneBy,
				underProject: task.underProject,
				tag: task.tag,
				deadline: task.deadline,
				description: task.description,
				status: task.status,
			})
		});
		return taskList.filter(task => task.underProject == projectName);
	}

	async completeProject(projectNameInput) {
		this.db.project
			.where("name")
			.equals(projectNameInput)
			.modify({
				status: 1
			});
	}
	//_______________________________________OPERATOINS_ON_TASK_TABLE____________________________________________________

	//create tasks
	async createTask(taskName, doneBy, underProject, tag, deadline, description) {
		let result = await this.db.task
			.put({
				name: taskName,
				doneBy: doneBy,
				underProject: underProject,
				tag: tag,
				deadline: deadline,
				description: description,
				status: 0,
			})
			.then(() => {
				console.log("Task created successfully!😊");
			})
			.catch((error) => {
				console.log("Task creation failed!:🥺 " + error);
			});
		return result;
	}

	//complete a task
	async completeTask(taskNameInput) {
		await this.db.task.where("name").equals(taskNameInput).modify({
			status: 1
		});
	}

	async updateTag(taskName, newTag) {
		await this.db.task.where('name').equals(taskName).modify({
			tag: newTag
		});
	}
	//__________________________________________MISCELLANEOUS__OPERATOINS_____________________________________________________

	// AddUserToProject consists of two operations: 1. Adding the project to the list of projects that user is a member of
	//                                              2. Adding the user the list of users that that project has as it's members

	//Operation 1
	async addMemberToProject(projectNameInput, usernameInput) {
		//fetch list containing members of that project
		let projectMembers = [];
		await this.db.project
			.get({
				name: projectNameInput
			})
			.then((project) => {
				projectMembers = project.hasMembers;
				return projectMembers;
			})
			.then((projectMembers) => {
				projectMembers.push(usernameInput);
				return projectMembers;
			})
			.then((projectMembers) => {
				this.db.project
					.where("name")
					.equals(projectNameInput)
					.modify({
						hasMembers: projectMembers
					});
			})
			.catch(function (error) {
				console.log(`Lo and Behold! Yet another error: ${error}`);
			});
	}

	//operaiton 2
	async addProjectToUser(usernameInput, projectNameInput) {
		let ismemberOf = [];
		await this.db.users
			.get({
				username: usernameInput
			})
			.then((user) => {
				ismemberOf = user.memberOf;
				return ismemberOf;
			})
			.then((ismemberOf) => {
				ismemberOf.push(projectNameInput);
				return ismemberOf;
			})
			.then((ismemberOf) => {
				this.db.users
					.where("username")
					.equals(usernameInput)
					.modify({
						memberOf: ismemberOf
					});
			});
	}
} //end of curly brace

//TODO: when a project is opened, sessionStorage.setItem("currentProject", projectName)
//TODO: change username ... has to confirm password.
//TODO: change password ... has to confirm password as well
//TODO: leave project   ... deleting projectName from user.memberOf, userName from project.hasMembers and redirecting to projects
//TODO: delete task     ... deleting taskName from user.hasTasks,
//TODO: delete project
//TODO: drop task
//TODO: progress
//TODO: deadline should not be set in the past only into the future
//TODO: a new objectStore to store deleted items. Data's helpful for processing and growing