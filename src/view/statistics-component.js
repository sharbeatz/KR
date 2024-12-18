import { AbstractComponent } from './abstract-component.js';

function createBookListComponentTemplate() {
    return (
        `
        <div class="statistics">
            <h2>Статистика</h2>
            <div class="stats-block">
                <p>Всего книг: <span id="total-books">0</span></p>
            </div>
        </div>
        `
      );
}


export default class BookListComponent extends AbstractComponent {

  get template() {
    return createBookListComponentTemplate();
  }

}




