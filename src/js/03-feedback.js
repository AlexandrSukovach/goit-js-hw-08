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
// refs.textarea.addEventListener('input', throttle(onTextareaInput, 5));
refs.form.addEventListener('input', throttle(onTextareaInput, 5));
// refs.inputEmail.addEventListener('input', throttle(onTextareaInput, 5));


populateTextarea();
/*
 * - Останавливаем поведение по умолчанию
 * - Убираем сообщение из хранилища
 * - Очищаем форму
 */
function onFormSubmit(evt) {
   evt.preventDefault();

   evt.currentTarget.reset();
   localStorage.removeItem(STORAGE_KEY);
   // console.log('Отправляем форму');
   console.log(formData);
   formData = ''
}
// function onTextareaInput(evt) {
//    const message = evt.target.value;
//    localStorage.setItem(STORAGE_KEY, message);
// }
// =====записываем данные из форм в хранилище
/*
 * - Получаем значение поля
 * - преобразовываем в формат JSON.stringify
 * - Сохраняем его в хранилище
 * - Можно добавить throttle
 */



function onTextareaInput() {

   // const message = evt.target.value;
   // localStorage.setItem(STORAGE_KEY, message);
   localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
/*
 * - Получаем значение из хранилища
 * - Если там что-то было, обновляем DOM
 */

function populateTextarea() {
   const savedMessage = localStorage.getItem(STORAGE_KEY);
   if (savedMessage) {
      let obMessage = JSON.parse(savedMessage);
      refs.textarea.value = obMessage.message;
      refs.inputEmail.value = obMessage.email;
      // console.log(obMessage)
   }

}
/*
 * получаем значения из инпута и textaria и присваиваем в formData
 */
refs.form.addEventListener('input', e => {
   // =====название поля куда кликаем
   // console.log(e.target.name);
   // ====вывод значения куда кликаем
   // console.log(e.target.value);
   // ====запись значения в объект
   formData[e.target.name] = e.target.value;
   // console.log(formData);
});