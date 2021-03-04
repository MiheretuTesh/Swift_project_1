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