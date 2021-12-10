
// import Player from '@vimeo/player';

// const player = new Player('handstick', {
//    id: 19231868,
//    width: 640
// });

// player.on('play', function () {
//    console.log('played the video!');
// });
// ========================================================

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);


player.on('timeupdate', function (second) {
   // data is an object containing properties specific to that event
   // console.log(second)
   let timer = 0;
   var timeAfterSeek = second.seconds;
   timer += timeAfterSeek;
   localStorage.setItem('videoplayer-current-time', timer);
});
// =====================================
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


