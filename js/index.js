import { handleDBEvents, addData, deleteData } from './databaseFunctions.js';

const userForm = document.querySelector('.form-user');
const addNoteForm = document.querySelector('.add-note-form');
const userIdSetion = document.querySelector('#userid-section');
const noteContainer = document.querySelector('.notes__container');

let user = 'jyotisko';

const addItem = (id, user, note) => {
  const markup = `
    <figure data-id="${id}" data-user="${user}">
      <p>${note}</p>
      <button class="deleteNote">x</button>
    </figure>
  `;
  noteContainer.insertAdjacentHTML('beforeend', markup);
};

const deleteItem = id => {
  noteContainer.querySelectorAll('figure').forEach(fig => fig.dataset.id === id ? fig.remove() : '');
};

const setupDeleteEvent = () => {
  noteContainer.addEventListener('click', e => {
    if (!e.target.classList.contains('deleteNote')) return;
    const id = e.target.closest('figure').dataset.id;
    deleteData(id);
  });
};

const displayLoggedInUserName = user => {
  const userNameEl = document.querySelector('.username');
  userNameEl.textContent = user;
};

const loginUserAndSetupDBHandler = () => {
  userForm.addEventListener('submit', e => {
    e.preventDefault();
    user = userForm['userid'].value; // getting the current user
    if (!user) return;
    userIdSetion.remove();
    handleDBEvents(user, addItem, deleteItem);
    displayLoggedInUserName(user);
  });
};

const addNoteAndRender = () => {
  addNoteForm.addEventListener('submit', e => {
    e.preventDefault();
    const note = addNoteForm['noteContent'].value;
    if (!note) return;
    addData(user, note);
    addNoteForm.reset();
  });
};

const init = () => {
  loginUserAndSetupDBHandler();
  addNoteAndRender();
  setupDeleteEvent();
};

init();



