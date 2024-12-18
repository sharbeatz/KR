
import Observable from '../framework/observable.js';
import BookListComponent from '../view/book-list-component.js';
import BookComponent from '../view/book-component.js';
import { render } from '../framework/render.js';
import AddBookComponent from '../view/add-book-component.js';
import BookFilterComponent from '../view/book-filter-component.js';

export default class BooksPresenter {
    #booksModel;
    #boardContainer;
    #bookListComponent = new BookListComponent();
    #bookFilter = new BookFilterComponent();
    #curentGenre = "all" // текущий выбранный жанр для фильтрации

    constructor({boardContainer, booksModel}) {
        this.#boardContainer = boardContainer;
        this.#booksModel = booksModel;
        this.#booksModel.addObserver(this.#handleModelChange.bind(this));
      }

      #handleModelChange() {
        this.#clearBoard();
        this.#renderBoard();
        this.#renderBookCount(); 
      }
      #clearBoard() {
        this.#bookListComponent.element.innerHTML = '';
      }

      init() {
        this.#renderBoard();
        this.#renderBookCount();
        this.#renderStatistics();
    }

      #renderBookFilter() {
        render(this.#bookFilter, this.#boardContainer);
        this.#bookFilter.setFilterHandler(() => this.filterByGenre());
        this.#bookFilter.setSearchHandler(() => this.searchBooks());
      }

    #renderBoard() {
        this.#renderBookFilter();
        render(this.#bookListComponent, this.#boardContainer);
        console.log(this.#booksModel.books);
        const books = this.#booksModel.books;
        if (this.#curentGenre == "all") {
            books.forEach(book => {
                render(new BookComponent({
                    bookId: book.id,        
                    title: book.title,      
                    author: book.author,
                    genre: book.genre,
                },
                () => this.deleteBook(book.id), // Обернули в стрелочную функцию,
            ),
                this.#bookListComponent.element);
            });
        }
        else {
            console.log(this.#curentGenre)
        }
    }



    deleteBook(bookId) {
        this.#booksModel.deleteBookById(bookId);
    }

    #renderAddBookForm() {
      const addBookComponent = new AddBookComponent({
          onClick: () => this.addBookFromForm(),
      });
      render(addBookComponent, this.#boardContainer);
  }
  
  #renderStatistics() {
    render(this.#bookListComponent, this.#boardContainer);
}

  addBookFromForm() {
    const bookForm = document.querySelector('#book-form');
    const bookData = {
        title: bookForm.querySelector('#title').value.trim(),
        author: bookForm.querySelector('#author').value.trim(),
        year: parseInt(bookForm.querySelector('#year').value, 10),
        genre: bookForm.querySelector('#genre').value,
        status: bookForm.querySelector('#status').value,
    };

    if (!bookData.title || !bookData.author || !bookData.genre || !bookData.status || !bookData.year) {
        alert('Пожалуйста, заполните все поля формы.');
        return;
    }

    this.#booksModel.addNewBook(bookData.title, bookData.author, bookData.genre, bookData.year, bookData.status);
    bookForm.reset();
    this.#renderBookCount(); // Обновляем количество книг
}


#renderBookCount() {
    const totalBooksElement = this.#bookListComponent.element.querySelector("#total-books");
    if (!totalBooksElement) {
        console.error('Элемент #total-books не найден в BookListComponent.');
        return;
    }
    totalBooksElement.textContent = this.#booksModel.books.length;
}



filterByGenre() {
  const selectedGenre = document.querySelector('#genre-filter').value;
  const filteredBooks = this.#booksModel.bookFilterByGenre(selectedGenre);
  this.#renderBookList(filteredBooks);
  this.#renderBookCount(); // Обновляем количество книг
}

searchBooks() {
  const query = document.querySelector('#search-input').value.trim();
  const searchResults = this.#booksModel.searchBooks(query);
  this.#renderBookList(searchResults);
  this.#renderBookCount(); // Обновляем количество книг
}


#renderBookList(books) {
  this.#clearBoard();
  books.forEach(book => {
      render(new BookComponent({
          bookId: book.id,
          title: book.title,
          author: book.author,
          genre: book.genre,
          onDelete: () => this.deleteBook(book.id),
      }), this.#bookListComponent.element);
  });
  this.#renderBookCount();
}




}