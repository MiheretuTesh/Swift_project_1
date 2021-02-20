export default class UI{
    constructor(){
        this.addTaskBtn = document.querySelector('.add-task');
        this.todos = document.querySelector('.todo-group');
        this.taskModal = document.querySelector('#task-adding-modal');
        this.projectModal = document.querySelector('#project-adding-modal');
        this.login = document.querySelector('#login');
        this.submitButtonProject = document.querySelector('.submitProjectBtn');
        this.boardsContainer = document.querySelector('.list-boards');
    }

   

    addTask(){
        this.taskModal.style.display = 'block';
    }

    hideAddTask(){
        this.taskModal.style.display = 'none';
    }

    hideAddProject(projects){
        this.submitButtonProject.disabled = 'true'; 
        this.projectModal.querySelector('.spinner').style.display = 'block'; 
        // location.reload()

        setTimeout(() => {
            this.submitButtonProject.removeAttribute('disabled');
            this.projectModal.style.display = 'none'; 
            this.projectModal.querySelector('.spinner').style.display = 'none'
            this.displayProjects(projects); 
        }, 1000)

    }

    addProject(listOfUsers){
        this.projectModal.querySelector('.projectManager').textContent = `(managed by ${sessionStorage.getItem('currentUser')})`;
        this.projectModal.style.display = 'block';
        this.generateCheckbox(listOfUsers);
    }

    
    displayProjects(projects){
        let html = ``;
        projects.forEach(project => {
            html += `<div class="boards">
            <p>${project.name}</p>
        </div>`
        });
        this.boardsContainer.querySelector('.new-board').insertAdjacentHTML('beforebegin',html);

    }


    addCard(title){
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
            

        let card = document.createElement('div');
        card.classList.add('inner', 'draggable');
        card.setAttribute('draggable', 'true');
        card.innerHTML = html;
        this.todos.appendChild(card);
    }


    addLoginMessage(isSuccess){
        let fail = this.login.querySelector('.login_message');
        fail.style.display = 'block';
        let errorMsg = 'Wrong Username or Password';
        let successMsg = 'Login Successful!';
        console.log(isSuccess)
        if(isSuccess){
            fail.style.background = 'rgb(158,255,161)';
            fail.style.color = 'green';
            fail.textContent = successMsg;
            this.login.querySelector('.spinner').style.display = 'block'; 
            setTimeout(() => window.open('dash_board.html', "_blank"), 2000)

        }else{
            fail.style.background = '#ffe0e0';
            fail.style.color = '#ba3939';
            fail.textContent = errorMsg;
            this.login.querySelector('.spinner').style.display = 'none';
            setTimeout(() => fail.style.display = 'none' , 2000)
        } 
        
    }


    generateCheckbox(listOfUsers){
        let checkboxes = `<p>Select users from the following list</p><br>`;
        listOfUsers.forEach(user => {
            let userName = user.userName;
            checkboxes += `
            <label for="${userName}">${userName}</label>
            <input type="checkbox" id="${userName}" name="${userName}" value="${userName}"><br>
            `;
        });

        let list = this.projectModal.querySelector('.users-list');
        list.innerHTML = checkboxes;
        
    }


}