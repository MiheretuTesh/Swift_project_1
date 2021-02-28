export default class UI {
	constructor() {
		this.addTaskBtn = document.querySelector(".add-task");

		this.todos = document.querySelector(".todo-group");
		this.backlog = document.querySelector('.backlog-group');
		this.inProgress = document.querySelector('.in-progress-group');
		this.done = document.querySelector('.done-group');

		this.taskModal = document.querySelector("#task-adding-modal");
		this.projectModal = document.querySelector("#project-adding-modal");
		this.login = document.querySelector("#login");
		this.signup = document.querySelector('#register');
		this.submitButtonProject = document.querySelector(".submitProjectBtn");
		this.boardsContainer = document.querySelector(".list-boards");
		this.taskInfoModal = document.querySelector('#task-info-modal');
	
	}

	addTask(listOfUsers) {
		this.taskModal.style.display = "block";
		this.generateRadioButtons(listOfUsers);

	}

	hideAddTask() {
		this.taskModal.style.display = "none";
	}

	hideAddProject(projects) {
		this.submitButtonProject.disabled = "true";
		this.projectModal.querySelector(".spinner").style.display = "block";
		// location.reload()

		setTimeout(() => {
			this.submitButtonProject.removeAttribute("disabled");
			this.projectModal.style.display = "none";
			this.projectModal.querySelector(".spinner").style.display = "none";
			this.displayProjects(projects);
		}, 1000);
	}

	addProject(listOfUsers) {
		this.projectModal.querySelector(
			".projectManager"
		).textContent = `(managed by ${sessionStorage.getItem("currentUser")})`;
		this.projectModal.style.display = "block";
		this.generateCheckbox(listOfUsers);
	}

	displayProjects(projects) {
		let html = ``;
		projects.forEach((project) => {
			html += `<div class="boards">
            <p>${project.name}</p>
            <p class="bttom-block-description">${project.description}</p>
        </div>`
		});


		this.boardsContainer.querySelector('.new-board').insertAdjacentHTML('beforebegin', html);
	}


	displayTasks(tasks) {
		let html = ``,
			card;

		tasks.forEach(task => {
			card = document.createElement("div");
			card.classList.add("inner", "draggable");
			let doneBy = task.doneBy;
			if (task.doneBy == sessionStorage.getItem('currentUser')) {
				card.setAttribute("draggable", "true");
				card.style.border = "0.1em solid  #7CB9E8";
				doneBy = "";
			}

			html = `
				<div class="inner-list">
					<div class="inner-top"></div>
					<p class="inner-text">
						${task.name}
					</p>
					<span style="font-size: 0.9em; color: #848F87">${doneBy} </span>
					<div class="inner-bottom"></div>
				</div>`;

			card.innerHTML = html;

			switch (task.tag.trim()) {
				case "To-do":
					this.todos.appendChild(card);
					break;
				case "Backlog":
					this.backlog.appendChild(card);
					break;
				case "In-progress":
					this.inProgress.appendChild(card);
					break;
				case "Done":
					this.done.appendChild(card);

			}


		})
	}



	addCard(title) {
		let html = `
				<div class="inner-list">
					<div class="inner-top">
					</div>
					<p class="inner-text">
						${title}
					</p>
					<div class="inner-bottom">
		
					</div>
				</div>`;

		let card = document.createElement("div");
		card.classList.add("inner", "draggable");
		card.setAttribute("draggable", "true");
		card.innerHTML = html;
		this.todos.appendChild(card);
		location.reload();
	}




	addLoginMessage(isSuccess, loginRegister) {
		let context = loginRegister === 'login' ? this.login : this.signup;
		let fail = loginRegister === 'login' ? this.login.querySelector('.login_message') : this.signup.querySelector('.login_message');
		fail.style.display = 'block';
		let errorMsg = 'Wrong Username or Password!';
		let errorMsg2 = 'Signing up failed!';
		let successMsg = 'Login Successful!';
		let successMsg2 = 'Signing up Successful!';



		if (isSuccess) {
			fail.style.background = 'rgb(158,255,161)';
			fail.style.color = 'green';
			fail.textContent = loginRegister === 'login' ? successMsg : successMsg2;
			context.querySelector('.spinner').style.display = 'block';
			setTimeout(() => {
				this.login.reset();
				this.signup.reset();
				window.open('dash_board.html', "_self");
			}, 2000)

		} else {
			fail.style.background = '#ffe0e0';
			fail.style.color = '#ba3939';
			fail.textContent = loginRegister === 'login' ? errorMsg : errorMsg2;
			context.querySelector('.spinner').style.display = 'none';
			setTimeout(() => fail.style.display = 'none', 2000)
		}

	}


	generateCheckbox(listOfUsers) {
		let checkboxes = `<p>Select users from the following list</p><br>`;
		listOfUsers.forEach(user => {
			let userName = user.userName;
			checkboxes += `
			<label for="${userName}">${userName}</label>
			<input type="checkbox" id="${userName}" name="${userName}" value="${userName}"><br>
			`;
		});

		// let addCard = this.taskModal !== null ? this.taskModal.querySelector(".users-list"): null;
		let addProj = this.projectModal !== null ? this.projectModal.querySelector(".users-list") : null;
		if (addProj) addProj.innerHTML = checkboxes;
		// if(addCard) addCard.innerHTML = checkboxes;
	}

	generateRadioButtons(listOfUsers) {
		let radioButtons = `<p>Select a user for the selected task</p><br>`;
		listOfUsers.forEach(userName => {
			radioButtons += `
		<input type="radio" id="${userName}" name="username" value="${userName}">
		<label for="${userName}">${userName}</label><br>
		`;
		})

		let addCard = this.taskModal !== null ? this.taskModal.querySelector(".users-list") : null;
		if (addCard) addCard.innerHTML = radioButtons;
	}


	taskInfo(task){
		console.log(task)
		this.taskInfoModal.querySelector('.task-title-info').innerHTML = task.name;
		this.taskInfoModal.querySelector('.task-tag-info').innerHTML = task.tag;
		this.taskInfoModal.querySelector('.task-desc-info').innerHTML = task.description
		this.taskInfoModal.querySelector('.deadline-info').innerHTML = task.deadline;
		this.taskInfoModal.querySelector('.info-done-by').innerHTML = `<i class="fa fa-user"></i> ${task.doneBy}`;
		this.taskInfoModal.querySelector('.project-name').innerHTML = `<i class="fa fa-project-diagram"></i> ${task.underProject}`;
		this.taskInfoModal.style.display = 'block';

	}
}