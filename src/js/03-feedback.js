import throttle from 'lodash.throttle';


const STORAGE_KEY = 'feedback-form-state';
const refs = {
   form: document.querySelector('.feedback-form'),
   textarea: document.querySelector('.feedback-form  textarea'),
   inputEmail: document.querySelector('.feedback-form  input'),
};
/*
Данные в хранилище как объект
*/
let formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();
/*
 * - Убираем сообщение из хранилища
 * - Очищаем форму
 */
function onFormSubmit(evt) {
   evt.preventDefault();
   evt.currentTarget.reset();
   let story;
   story = JSON.parse(localStorage.getItem(STORAGE_KEY))
   if (story === null) {
      // story = '';
      return
   };
   // ===вывод сабмита=========
   console.log(story);
   localStorage.removeItem(STORAGE_KEY);
   // console.log('f', formData);
   formData = {};
};
/*
 * - Получаем значение поля из инпута и textaria и присваиваем в formData
 * - Сохраняем его в хранилище
 */
function onTextareaInput(e) {
   formData[e.target.name] = e.target.value;
   // console.log('in-', formData);
   localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
   // console.log('of-', formData);
};
/*
 * - Получаем значение из хранилища
 * - Если там что-то было, обновляем DOM
 */
function populateTextarea() {
   // ===при перезагрузке получаем значения и присваиваем в formData
   if (localStorage.getItem(STORAGE_KEY)) {
      formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (formData.message === undefined) {
         refs.textarea.value = ''
      } else {
         refs.textarea.value = formData.message
      };
      if (formData.email === undefined) {
         refs.inputEmail.value = ''
      } else {
         refs.inputEmail.value = formData.email;
      };
   };
};

