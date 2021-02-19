export default class UI{
    constructor(){
        this.addTaskBtn = document.querySelector('.add-task');
        this.todos = document.querySelector('.todo-group');
        this.modal = document.querySelector('#task-adding-modal');
    }

   

    addTask(){
        this.modal.style.display = 'block';
    }

    





}