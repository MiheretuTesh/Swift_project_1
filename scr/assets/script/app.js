import UI from './ui.js';

let draggables = document.querySelectorAll('.draggable');
let wrapper = document.querySelector('#wrapper');


let ui = new UI();


if(wrapper){
    wrapper.addEventListener('click', e => {
        if(ui.isAChild(e,'add-new-list')){
            ui.addList(e);
            
        }else if(ui.isAChild(e, 'add-task')){
            ui.addCard(e);
        }else if(e.target.className === 'confirm-add-task'){
            ui.addCardConfirm(e);
        }else if(ui.isAChild(e, 'cancel-add-task')){
            ui.addCardCancel(e);
        }
        
    })

    wrapper.addEventListener('dragover', e => {
        e.preventDefault();
        if(e.target.classList.contains('container')){
            const afterElement = getDragAfterElement(e.target, e.clientY);
            const draggable = document.querySelector('.dragging');
            if(afterElement){
                e.target.insertBefore(draggable, afterElement);
            }else{
                e.target.appendChild(draggable);
            }
        }
    });
    
    wrapper.addEventListener('dragstart', e =>{
        if(e.target.classList.contains('draggable')){
            e.target.classList.add('dragging');
        }
    })
    
    wrapper.addEventListener('dragend', e => {
        if(e.target.classList.contains('draggable')){
            e.target.classList.remove('dragging');
        }
    })
}





let getDragAfterElement = (container, y) => {
    const draggableElements = [... container.querySelectorAll('.draggable:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        console.log(box)
        const offSet = y - box.top - (box.height/2);
        if(offSet < 0 && offSet > closest.offSet){
            return {offSet: offSet, element: child};
        }else{
            return closest;
        }
    }, { offSet: Number.NEGATIVE_INFINITY }).element;
}