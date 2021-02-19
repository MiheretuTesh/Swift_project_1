export default class UI{
    constructor(){
        this.addListLink = document.querySelector('.add-new-list');
        this.todos = document.querySelector('.todo-group');
    }

   
    addCardConfirm(e){
        
        let html = `
        <div class="inner draggable" draggable="true">
        <div class="inner-list">
            <div class="inner-top">
            </div>
                <p class="inner-text">
                    ${data}
                </p>

                <div class="inner-bottom">

                </div>
            </div>
        </div>
        `;

        let card = document.createElement('div');
        card.classList.add('inner')
        card.classList.add('draggable')
        card.setAttribute('draggable', 'true')
    
        
        
        
    }


    

    addCardCancel(e){
        let target = e.target;
        if(target.tagName === 'svg'){
            target = target.parentElement;
        }else if(target.tagName === 'path'){
            target = target.parentElement.parentElement;
        }

        target = target.parentElement;

        target.nextElementSibling.style.display = 'block';
        target.style.display = "none";
    }

    addCard(e){
        let html = `
            <div class="add-task-dialog">
                <textarea name="" id="" cols="30" rows="10"></textarea>
                <a class="confirm-add-task">Add Task</a>
                <a class='cancel-add-task'><i class="fa fa-times"></i></a>
            </div>
        `

        let target;

    
        if(e.target.className === 'add-task'){
            target = e.target;
        }else if(e.target.parentElement.className === 'add-task'){
            target = e.target.parentElement
        }else if(e.target.parentElement.parentElement.className === 'add-task'){
            target = e.target.parentElement.parentElement
        }

        target.style.display = 'none';
        target.insertAdjacentHTML('beforebegin', html);
        
    }


    addList(e){
        let html = ` 
            <div class='container'>
                <div class="inner-container">
                <div class="top-container">
                    <p contenteditable="true">
                        New List Group
                    </p>
                </div>
                
            <div class="add-task">
                <div class="add-task-1">
                    <svg class="svg-inline--fa fa-plus fa-w-14" style="padding: .5rem;" aria-hidden="true" data-prefix="fa" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M448 294.2v-76.4c0-13.3-10.7-24-24-24H286.2V56c0-13.3-10.7-24-24-24h-76.4c-13.3 0-24 10.7-24 24v137.8H24c-13.3 0-24 10.7-24 24v76.4c0 13.3 10.7 24 24 24h137.8V456c0 13.3 10.7 24 24 24h76.4c13.3 0 24-10.7 24-24V318.2H424c13.3 0 24-10.7 24-24z"></path></svg><!-- <i class="fa fa-plus" style="padding: .5rem;"></i> -->
                    <p>Add a card</p>
                </div>
            </div>
            </div>
        `;

        this.addListLink.insertAdjacentHTML('beforebegin', html);
    }



}