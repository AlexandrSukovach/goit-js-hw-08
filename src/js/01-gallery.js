//Add imports above this line
import { galleryItems } from './gallery-items.js';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';



console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const cardsMarkup = createColorCardsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);

function createColorCardsMarkup(galleryItems) {

   return galleryItems
      .map(({ preview, description, original }) => {
         return `
         <a class="gallery__item" href="${original}">
         <img class="gallery__image" src="${preview}" title="${description}" />
         </a>
         `;
      })
      .join('');
}
// ============плагин инициализации и добав стилей===========

let gallery = new SimpleLightbox('.gallery a', { doubleTapZoom: 1.5, captionDelay: 250 });