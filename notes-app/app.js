const addBtnEl = document.getElementById('add-btn');
const sectionEl = document.querySelector('.section');

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
    notes.forEach(note => {
        addNewNote(note);
    });

};

addBtnEl.addEventListener('click', addNewNote);

function addNewNote(text ='') {
    const note = document.createElement('div');
    note.classList.add('wrapper');
    note.innerHTML = `
                    <div class="tool-bar">
                    <button class="btn " id="edit-btn">
                        <svg class="edit-icon" width="16" height="16">
                            <use href="sprite.svg#icon-edit"></use>
                        </svg>
                    </button>
                    <button class="btn " id="delete-btn">
                        <svg class="delete-icon" width="16" height="16">
                            <use href="sprite.svg#icon-delete"></use>
                        </svg>
            
                    </button>
                </div>
                <div class="main ${text ? "" : "hidden"}"></div>
                <textarea id="text" class="${text ? "hidden" : ""} textarea-section"></textarea>
    `;

    const deleteBtnEl = note.querySelector('#delete-btn');
    const editBtnEl = note.querySelector('#edit-btn');
    const mainEl = note.querySelector('.main');
    const textareaEl = note.querySelector('.textarea-section');



    editBtnEl.addEventListener('click', onEditBtnClick);
    deleteBtnEl.addEventListener('click', onDeleteBtnClick);
    textareaEl.addEventListener('input', onTextareaInput);

    textareaEl.value = text;
    
    mainEl.innerHTML = marked.parse(JSON.stringify(text));

    function onEditBtnClick() {
        mainEl.classList.toggle('hidden');
        textareaEl.classList.toggle('hidden');
    };

    function onDeleteBtnClick() {
        note.remove();

        updateLocalStorage();
    };

    function onTextareaInput(evt) {
        const { value } = evt.target;

        mainEl.innerHTML = marked.parse(value);
        
        updateLocalStorage();
    };
    
    sectionEl.appendChild(note);
};

function updateLocalStorage() {
    const notesText = document.querySelectorAll('.textarea-section');

    const notes = [];

    notesText.forEach(note => {
        notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
};









