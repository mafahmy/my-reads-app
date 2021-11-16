import React from "react";
import Book from "./Book";

// setting the props for using in Shelf

function Shelf({ books, title, moveBook }) {
  // passing the props to Book, and creating the ol of books
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book book={book} moveBook={moveBook} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
export default Shelf;
