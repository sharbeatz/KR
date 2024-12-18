import { AbstractComponent } from './abstract-component.js';

function createFormAddBookComponentTemplate() {
    return (
`

            <form id="book-form">
                <input type="text" id="title" placeholder="Название книги" >
                <input type="text" id="author" placeholder="Автор" >
                <input type="number" id="year" placeholder="Год издания" min="1000" max="2024" >
                
                <select id="genre" >
                    <option value="">Выберите жанр</option>
                    <option value="FICTION">FICTION</option>
                    <option value="SCIENCE">SCIENCE</option>
                    <option value="HISTORY">HISTORY</option>
                    <option value="PROGRAMMING">PROGRAMMING</option>
                </select>

                <select id="status" >
                    <option value="">Статус книги</option>
                    <option value="AVAILABLE">Доступна</option>
                    <option value="BORROWED">Выдана</option>
                    <option value="RESERVED">Зарезервирована</option>
                </select>

                <button type="submit">Добавить книгу</button>
            </form>
`
      );
}


export default class AddBookComponent extends AbstractComponent {
    #handleClick = null;
    constructor({onClick}) {
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('submit', this.#clickHandler);
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    }
    
  get template() {
    return createFormAddBookComponentTemplate();
  }

}




