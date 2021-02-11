import UI from './ui.js';

let ui = new UI();

let wrapper = document.querySelector('#wrapper');

if(wrapper){
    wrapper.addEventListener('click', e => {
        if(e.target.className === 'add-new-list' || e.target.parentElement.className === 'add-new-list' || e.target.parentElement.parentElement.className === 'add-new-list'){
            ui.addList(e);
        }
    })
}