import { AbstractComponent } from './abstract-component.js';

function createBookListComponentTemplate() {
    return (
        `
        <div class="books-list">
            <h2>Книги в библиотеке</h2>
            <div id="books-container"></div>
        </div>
        `
      );
}


export default class BookListComponent extends AbstractComponent {

  get template() {
    return createBookListComponentTemplate();
  }

}




