function createNoteElement(id, content) {
  const element = document.createElement("div");

  element.classList.add("wrapper");
  element.innerHTML=`
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
               
                <textarea id="text" class="textarea-section">${content}</textarea>
    `;

    const editBtn = element.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => {
        updateNote(id, element.innerHTML);
    })

  element.addEventListener("change", () => {
    updateNote(id, element.innerHTML);
  });
    
    const deleteBtn = element.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        const doDelete = confirm(
            "Are you sure you wish to delete this sticky note?"
        );
        if (doDelete) {
            deleteNote(id, element);
        };
    });
    
    return element;

}