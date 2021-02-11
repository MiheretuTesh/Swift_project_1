import UI from './ui.js';

let ui = new UI();

let wrapper = document.querySelector('#wrapper');




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
}