import Observable from '../framework/observable.js';
import { books } from '../mock/books.js';
import { generateId } from '../utils.js';


export default class BooksModel extends Observable {
  #booksBoard = books;


  get books() {
    return this.#booksBoard
  }
  
  addNewBook(title, author, genre, year, status) {
    const newBook = {
        id: generateId(),
        title,
        author,
        genre,
        year,
        status,
    };

    this.#booksBoard.push(newBook);
    this._notify(); 
    return newBook;
}

   deleteBookById(bookId) {
 
    this.#booksBoard = this.#booksBoard.filter(book=> book.id!==bookId);
    console.log(this.#booksBoard)
    this._notify(); 
   }

   bookFilterByGenre(bookGenreFilter) {
    let filteredBooks;
    if (bookGenreFilter && bookGenreFilter !== "all") {
        filteredBooks = this.#booksBoard.filter(book => book.genre === bookGenreFilter);
    } else {
        filteredBooks = [...this.#booksBoard]; 
    }
    this._notify(filteredBooks); 
    return filteredBooks;
}

searchBooks(query) {
    const lowerQuery = query.toLowerCase();
    const result = this.#booksBoard.filter(book => 
        book.title.toLowerCase().includes(lowerQuery) || 
        book.author.toLowerCase().includes(lowerQuery)
    );
    this._notify(result); 
    return result;
}


}




