import throttle from 'lodash.throttle';


const STORAGE_KEY = 'feedback-form-state';
const refs = {
   form: document.querySelector('.feedback-form'),
   textarea: document.querySelector('.feedback-form  textarea'),
   inputEmail: document.querySelector('.feedback-form  input'),
};

const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

function onFormSubmit(evt) {
   evt.preventDefault();
   console.log('Отправляем форму');
   console.log(formData);
   evt.currentTarget.reset();
   localStorage.removeItem(STORAGE_KEY);

}


// function onTextareaInput(evt) {
//    const message = evt.target.value;
//    localStorage.setItem(STORAGE_KEY, message);
// }

function onTextareaInput() {
   // const message = evt.target.value;
   // localStorage.setItem(STORAGE_KEY, message);
   localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}


function populateTextarea() {
   const savedMessage = localStorage.getItem(STORAGE_KEY);
   if (savedMessage) {
      let obMessage = JSON.parse(savedMessage);
      refs.textarea.value = obMessage.message;
      refs.inputEmail.value = obMessage.email;
      // console.log(obMessage)
   }

}


refs.form.addEventListener('input', e => {
   // console.log(e.target.name);
   // console.log(e.target.value);
   // formData[e.target.email] = e.target.value;
   formData[e.target.name] = e.target.value;
   // console.log(formData);
});