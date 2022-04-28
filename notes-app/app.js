const notesContainer = document.querySelector(".section");
const addNoteButton = document.getElementById("add-btn");

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.appendChild(noteElement);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
};

function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
};

function createNoteElement(id, content) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    wrapper.innerHTML=  `
                    <div class="tool-bar">
                    <button class="btn " id="edit-btn">
                        <svg class="edit-icon" width="16" height="16">
                            <use href="sprite.svg#icon-edit"></use>
                        </svg>
                        save/edit
                    </button>
                    <button class="btn " id="delete-btn">
                        <svg class="delete-icon" width="16" height="16">
                            <use href="sprite.svg#icon-delete"></use>
                        </svg>
            
                    </button>
                </div>               
    `;

    const element = document.createElement('textarea');
    element.classList.add('textarea-section');
    element.value = content;
     
    wrapper.appendChild(element);

    const editBtn = wrapper.querySelector('#edit-btn');
    editBtn.addEventListener('click', () => {
        updateNote(id, element.value);
    });


    
    const deleteBtn = wrapper.querySelector('#delete-btn');
    deleteBtn.addEventListener('click', () => {
        const doDelete = confirm(
            "Are you sure you wish to delete this  note?"
        );
        if (doDelete) {
            deleteNote(id, wrapper);
        };
    });

    return wrapper;
};

function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.appendChild(noteElement);

  notes.push(noteObject);
  saveNotes(notes);
};

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
};

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(element);
};



