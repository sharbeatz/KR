import AddBookComponent from "./view/add-book-component.js";

import BooksPresenter from "./presenter/books-presenter.js";


import BooksModel from "./model/books-model.js";
import { render, RenderPosition} from "./framework/render.js";

const booksModel = new BooksModel();

const addBookComponent = new AddBookComponent({ onClick: handleNewBookButtonClick });

const container = document.querySelector('.container');

const booksPresenter = new BooksPresenter({
    boardContainer: container,
    booksModel
});

render(addBookComponent, container)

function handleNewBookButtonClick() {
    booksPresenter.addBookFromForm();
}

booksPresenter.init();

