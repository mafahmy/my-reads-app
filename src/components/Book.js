import React from "react";
import PropTypes from "prop-types";

function Book({ books, book, moveBook, }) {

  Book.propTypes = {
    book: PropTypes.object.isRequired,
    moveBook: PropTypes.func.isRequired,
  }
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: book.imageLinks
              ? `url(${book.imageLinks.thumbnail})`
              : "",
          }}
        />
        <div className="book-shelf-changer">
          <select
            defaultValue={book.shelf ? book.shelf : "none"}

            onChange={(event) => moveBook(book, event.target.value)}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="none">None</option>
          </select>

        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{(book.authors && book.authors.length) > 1 ? book.authors.join(", ") : book.authors}</div>
    </div>
  );
}
export default Book;
