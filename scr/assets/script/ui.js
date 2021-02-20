export default class UI{
    constructor(){
        this.addTaskBtn = document.querySelector('.add-task');
        this.todos = document.querySelector('.todo-group');
        this.modal = document.querySelector('#task-adding-modal');
        this.login = document.querySelector('#login');
    }

   

    addTask(){
        this.modal.style.display = 'block';
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

}