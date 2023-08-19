import React from "react";
import Book from "./Book";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function SearchPage(props) {

  SearchPage.propTypes = {
    moveBook: PropTypes.func.isRequired,
    searchBooks: PropTypes.array.isRequired,
    querry: PropTypes.string.isRequired,
    setQuerry: PropTypes.func,
    error: PropTypes.object,
  };
  const searchedHomedBooks = props.searchBooks.map((book) => {
    props.books.map((b) => {
      if (b.id === book.id) {
        book.shelf = b.shelf;
      }
      return b;
    });
    return book;
  });

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link
          to="/"
          className="close-search"
        // onClick={() => useShowSearchPage(false)}
        >
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={props.querry}
            onChange={(e) => props.setQuerry(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div className="search-books-results">
          {props.error && (
            <div className="error">
              <h3>{props.error.message}</h3>
            </div>
          )}

          <ol className="books-grid">
            {searchedHomedBooks.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  shelf={book.shelf}
                  moveBook={props.moveBook}
                  searchedHomedBooks={searchedHomedBooks}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
