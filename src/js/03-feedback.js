import throttle from 'lodash.throttle';

const refs = {
   form: document.querySelector('.feedback-form'),
   textarea: document.querySelector('.feedback-form  textarea'),
};

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

function onFormSubmit(evt) {
   evt.preventDefault();
   console.log('Отправляем форму');
   evt.currentTarget.reset();
   localStorage.removeItem(STORAGE_KEY);
}


function onTextareaInput(evt) {
   const message = evt.target.value;
   localStorage.setItem(STORAGE_KEY, message);
}


function populateTextarea() {
   const savedMessage = localStorage.getItem(STORAGE_KEY);
   if (savedMessage) {
      console.log(savedMessage)
      refs.textarea.value = savedMessage;
   }
}


refs.form.addEventListener('input', e => {
   // console.log(e.target.name);
   // console.log(e.target.value);
   // formData[e.target.email] = e.target.value;
   formData[e.target.name] = e.target.value;
   console.log(formData);
});