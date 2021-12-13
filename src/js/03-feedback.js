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
refs.form.addEventListener('input', throttle(onTextareaInput, 5));

populateTextarea();
/*
 * - Останавливаем поведение по умолчанию
 * - Убираем сообщение из хранилища
 * - Очищаем форму
 */
function onFormSubmit(evt) {
   evt.preventDefault();
   evt.currentTarget.reset();
   let story
   story = JSON.parse(localStorage.getItem(STORAGE_KEY))
   if (story === null) {
      story = ''
   }
   console.log(story);

   localStorage.removeItem(STORAGE_KEY);
   // console.log('f', formData);
   formData = {}
   // console.log('Отправляем форму');
   // console.log('f-', formData);

}
/*
 * - Получаем значение поля из инпута и textaria и присваиваем в formData
 * - преобразовываем в формат JSON.stringify
 * - Сохраняем его в хранилище
 * - Можно добавить throttle
 */
function onTextareaInput(e) {
   formData[e.target.name] = e.target.value
   // console.log('in-', formData);
   localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
   // console.log('of-', formData);
}
/*
 * - Получаем значение из хранилища
 * - Если там что-то было, обновляем DOM
 */
function populateTextarea() {
   // ===при перезагрузке получаем значения и присваиваем в formData
   if (localStorage.getItem(STORAGE_KEY)) {
      formData = JSON.parse(localStorage.getItem(STORAGE_KEY))
      // console.log(formData.email);
      // console.log(formData.message);
      if (formData.message === undefined) {
         // console.log(true)
         refs.textarea.value = ''
      } else {
         refs.textarea.value = formData.message
      }
      if (formData.email === undefined) {
         // console.log(true)
         refs.inputEmail.value = ''
      } else {
         refs.inputEmail.value = formData.email;
      }


   }

   // formData = JSON.parse(savedMessage)
   // // // ======добавляем в DOM
   // if (savedMessage) {
   //    let obMessage = JSON.parse(savedMessage);
   //    refs.textarea.value = obMessage.message;
   //    refs.inputEmail.value = obMessage.email;
   //    console.log(obMessage)
   // }

   // console.log('formData-', formData);
   // console.log('forDat-', forDat);
   // console.log(formData.email);
   // console.log(formData.message);


}
/*
 * получаем значения из инпута и textaria и присваиваем в formData
 */
// refs.form.addEventListener('input', e => {
//    // =====название поля куда кликаем
//    // console.log(e.target.name);
//    // ====вывод значения куда кликаем
//    // console.log(e.target.value);
//    // ====запись значения в объект
//    formData[e.target.name] = e.target.value;
//    // console.log(formData);
// });
