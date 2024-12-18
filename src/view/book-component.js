import { AbstractComponent } from './abstract-component.js';

function createBookComponentTemplate({ bookId, title, author, genre, status }) {
  return (
    `<li id="${bookId}">
        <p>Название: ${title}</p>
        <p>Автор: ${author}</p>
        <p>Жанр: ${genre}</p>
        <p>Статус: ${status === 'AVAILABLE' ? 'Доступна' : status === 'RESERVED' ? 'Зарезервирована' : 'Выдана'}</p>  
        <button class="delete-button">Удалить</button>
    </li>`
  );
}

export default class BookComponent extends AbstractComponent {
  #handleClick;

  constructor(bookData, onClick) {
    super();
    this.bookData = bookData;
    this.#handleClick = onClick;
    this.element.querySelector('.delete-button').addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick(this.bookData.id);  // Передаем ID книги для удаления
  }

  get template() {
    return createBookComponentTemplate(this.bookData);
  }
}
