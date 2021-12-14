import throttle from 'lodash.throttle';

// const iframe = document.querySelector('iframe');
// ===убираем при подключение через библиотеку npm====
// const player = new Vimeo.Player(iframe);
// ==================player npm====================
import Player from '@vimeo/player';
const options = {
   id: 59777392,
   width: 640,
   loop: true
};

const player = new Player('vimeo-player', options);

player.setVolume(0);

player.on('play', function () {
   console.log('played the video!');
});
// ======================================

player.on('timeupdate', throttle(function (second) {
   let timer = 0;
   localSet()
   function localSet() {
      let timeAfterSeek = second.seconds;
      // console.log(second.seconds)
      timer += timeAfterSeek;
      // console.log('t-', timer)
      localStorage.setItem('videoplayer-current-time', timer);
   }
}, 1000));

populateTextarea();
function populateTextarea() {
   const savedMessage = localStorage.getItem('videoplayer-current-time');
   if (savedMessage) {
      var obMessage = JSON.parse(savedMessage);
      // console.log('timestor-', obMessage)
      player.setCurrentTime(obMessage).then(function (secon) {
         // seconds = the actual time that the player seeked to
         // console.log(secon)
      }).catch(function (error) {
         switch (error.name) {
            case 'RangeError':
               // the time was less than 0 or greater than the video’s duration
               break;
            default:
               // some other error occurred
               break;
         };
      });
   };
};


