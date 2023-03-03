const addBox = document.querySelector('.add-box'),
popupBox = document.querySelector('.popup-box'),
popupTitle = popupBox.querySelector('header p'),
closeIcon = popupBox.querySelector('header i'),
titleTag = popupBox.querySelector('input'),
descTag = popupBox.querySelector('textarea'),
addBtn = popupBox.querySelector('button');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// getting notes from local storage and parsing them into an array of
//  objects if they exist or an empty array if they don't exist yet
const notes = JSON.parse(localStorage.getItem('notes')) || [];

let isUpdate = false, updateId;
addBox.addEventListener('click', () => {
    titleTag.focus();
    popupBox.classList.add('show');
});

closeIcon.addEventListener('click', () => {
    isUpdate = false;
    titleTag.value = '';
    descTag.value = '';
    addBtn.innerText = 'Add Note';
    popupTitle.innerText = 'Add new Note';
    popupBox.classList.remove('show');
});

function showNotes(){
    document.querySelectorAll('.note').forEach((note) => note.remove());
    notes.forEach((note, index) =>{
        let liTag = `<li class="note">
            <div class="details">
                <p>${note.title}</p>
                <span>${note.description}</span>
            </div>
            <div class="bottom-content">
                <span>${note.date}</span>
                <div class="settings">
                    <i onclick = "showMenu(this)" class="uil uil-ellipsis-h"></i>
                    <ul class="menu">
                        <li onclick = "updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                        <li onclick = "deleteNote(${index})" ><iclass="uil uil-trash"></i>Delete</li>
                    </ul>
                </div>
            </div>
        </li>`;
        addBox.insertAdjacentHTML('afterend', liTag);
    });
}
showNotes();

function showMenu(elem){
    elem.parentElement.classList.add('show');

    document.addEventListener('click', e => {
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove('show');
        }
    });
}

function deleteNote(noteId){
    let confirmDelete = confirm('Are you sure you want to delete this note?');
    if(!confirmDelete) return;
    notes.splice(noteId, 1); // delete the note from the array
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}
function updateNote(noteId, title, desc) {
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    popupTitle.innerText = 'Update Note';
    addBtn.innerText = 'Update a Note';
    console.log(noteId, title, desc);
}
addBtn.addEventListener('click', e => {
    e.preventDefault();
    let noteTitle = titleTag.value;
    noteDesc = descTag.value;
    console.log(noteTitle, noteDesc);

    if(noteTitle || noteDesc) {
        let dateObj = new Date();
        month = months[dateObj.getMonth()];
        day = dateObj.getDate();
        year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day}, ${year}`
        }
        if(!isUpdate){
            notes.push(noteInfo);
        } else{
            isUpdate = false;
            notes[updateId] = noteInfo; // update the note in the array
        }
        
        localStorage.setItem('notes', JSON.stringify(notes));

        closeIcon.click();
        showNotes();
    }
});
