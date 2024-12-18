import { AbstractComponent } from './abstract-component.js';

function createBookFilterComponentTemplate() {
    return (
        `<div class="filters">
            <h2>Фильтры</h2>
            <select id="genre-filter">
                <option value="">Все жанры</option>
                <option value="FICTION">FICTION</option>
                <option value="SCIENCE">SCIENCE</option>
                <option value="HISTORY">HISTORY</option>
                <option value="PROGRAMMING">PROGRAMMING</option>
            </select>
            <input type="text" id="search-input" placeholder="Поиск по названию или автору">
            <button id="search-btn">Поиск</button>
        </div>`
    );
}

export default class BookFilterComponent extends AbstractComponent {

  get template() {
    return createBookFilterComponentTemplate();
  }

  /**
   * Устанавливает обработчик для фильтрации по жанру.
   * @param {Function} callback
   */
  setFilterHandler(callback) {
    const genreFilter = this.element.querySelector('#genre-filter');
    genreFilter.addEventListener('change', callback);
  }

  /**
   * Устанавливает обработчик для поиска.
   * @param {Function} callback 
   */
  setSearchHandler(callback) {
    const searchButton = this.element.querySelector('#search-btn');
    searchButton.addEventListener('click', callback);
  }
}
