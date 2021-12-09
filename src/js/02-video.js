
window.onload = () => {
   // находим элемент <video>
   let video = document.querySelector('#vimeo-player')

   // если localStorage содержит значение currentTime (текущее время), присваиваем это значение video.currentTime
   if (localStorage.currentTime) {
      video.currentTime = localStorage.currentTime
   }

   // при каждом изменении video.currentTime, записываем его значение в localStorage.currentTime
   video.addEventListener('timeupdate', () => localStorage.currentTime = video.currentTime)
}