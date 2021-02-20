export default class UI{
    constructor(){
        this.addTaskBtn = document.querySelector('.add-task');
        this.todos = document.querySelector('.todo-group');
        this.modal = document.querySelector('#task-adding-modal');
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




}