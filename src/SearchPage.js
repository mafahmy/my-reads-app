import React from "react";
import Book from "./Book";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function SearchPage(props) {
  // moveBook,
  // searchBooks,
  // querry,
  // setQuerry,

  SearchPage.propTypes = {
    moveBook: PropTypes.func.isRequired,
    searchBooks: PropTypes.array.isRequired,
    querry: PropTypes.string.isRequired,
    setQuerry: PropTypes.func,
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
          {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
