export default class UI{
    constructor(){
        this.addListLink = document.querySelector('.add-new-list');
    }


    addCardConfirm(){

    }

    addCardCancel(){

    }

    addCard(){
        let html = `
            <div class="add-card-dialog">
            </div>
        `
    }


    addList(e){
        let html = ` 
            <div class='container'>
                <div class="inner-container">
                <div class="top-container">
                    <p>
                        Project Resource
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