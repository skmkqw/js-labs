const loadNotes = () => JSON.parse(localStorage.getItem("notes")) || [];
const saveNotes = (notes) => localStorage.setItem("notes", JSON.stringify(notes));

const createNote = (title, content, color, pinned) => ({
    title,
    content,
    color,
    pinned,
    date: new Date().toISOString(),
});

const renderNotes = (notes) => {
    const container = document.getElementById("notes-container");
    container.innerHTML = "";

    notes
        .filter(note => note !== null && note !== undefined) 
        .sort((a, b) => (b.pinned - a.pinned) || (new Date(b.date) - new Date(a.date)))
        .forEach((note, index) => {
            const div = document.createElement("div");
            div.className = "note" + (note.pinned ? " pinned" : "");
            div.style.backgroundColor = note.color;

            div.innerHTML = `
        <div class="actions">
          <button onclick="deleteNote(${index})">🗑️</button>
          <button onclick="editNote(${index})">✏️</button>
        </div>
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <div class="date">${new Date(note.date).toLocaleString()}</div>
      `;

            container.appendChild(div);
        });
};

const resetForm = () => {
    document.getElementById("note-form").reset();
    document.getElementById("color").value = "#fff176";
};

const fillForm = (note) => {
    document.getElementById("title").value = note.title;
    document.getElementById("content").value = note.content;
    document.getElementById("color").value = note.color;
    document.getElementById("pinned").checked = note.pinned;
};

let notes = loadNotes();

const handleSubmit = (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const color = document.getElementById("color").value;
    const pinned = document.getElementById("pinned").checked;

    const note = createNote(title, content, color, pinned);

    notes.push(note);
    saveNotes(notes);
    renderNotes(notes);
    resetForm();
};

const deleteNote = (index) => {
    if (confirm("Delete this note?")) {
        notes.splice(index, 1);
        saveNotes(notes);
        renderNotes(notes);
    }
};

const editNote = (index) => {
    const note = notes[index];
    fillForm(note);
    notes.splice(index, 1);
    saveNotes(notes);
    renderNotes(notes);
};

const init = () => {
    document
        .getElementById("note-form")
        .addEventListener("submit", handleSubmit);

    renderNotes(notes);
};

init();