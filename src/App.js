import React, { useState, useEffect, useRef } from "react";
import { Link, Route } from "react-router-dom";
import * as BooksAPI from "./api/BooksAPI";
import "./App.css";
import Shelves from "./components/Shelves";
import { debounce } from "throttle-debounce";
import SearchPage from "./components/SearchPage";

/**
 * The main app component for the MyReads app.
 *
 * This component fetches data from the BooksAPI, manages the app state,
 * and defines the routes for the app.
 */
function BooksApp() {
  // State variables for the books, search query, and search results
  const [books, setBooks] = useState([]);
  const [querry, setQuerry] = useState("");
  const [searchBooks, setSearchBooks] = useState([]);
  const [error, setError] = useState(null);

  // Fetch books data from the API when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      const books = await BooksAPI.getAll();
      setBooks(books);
    }
    fetchBooks();
  }, []);
  // Update search results when the search query changes
  useEffect(
    () => {
      if (querry) {
        debouncedSearch.current(querry);
      } else setSearchBooks([]);
    },
    [querry]
  );

  /**
   * Move a book to a different shelf.
   *
   * @param {Object} book - The book to move.
   * @param {string} shelf - The new shelf for the book.
   */
  const moveBook = (book, shelf) => {
    //Update the local state
    const updatedBooks = books.map((eachBook) => {
      if (eachBook.id === book.id) {
        console.log({ ...eachBook, shelf })
        return { ...eachBook, shelf };
      } else {
        return eachBook
      }
    });
    setBooks(updatedBooks);
    BooksAPI.update(book, shelf).catch((error) => {
      setError({ message: 'Error while moving book to shelf', details: error });
    });
  }
  // Create a debounced version of the search function
  const debouncedSearch = useRef(
    debounce(700, false, (querry) =>
      BooksAPI.search(querry).then((data) => {
        if (data.error) {
          setSearchBooks([]);
        } else {
          setSearchBooks(data);
        }
      })
    )
  );
  return (
    <div className="app">
      {/* Setting the routes for the app */}
      <Route
        exact
        path="/"
        render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Shelves books={books} moveBook={moveBook} error={error} />
            </div>
            <div className="open-search">
              <Link to="/search">
                <button>Add a book</button>
              </Link>
            </div>
          </div>
        )}
      />
      <Route
        path="/search"
        render={() => (
          <SearchPage
            searchBooks={searchBooks}
            moveBook={moveBook}
            querry={querry}
            setQuerry={setQuerry}
            books={books}
            error={error}
          />
        )}
      />
    </div>

  );
}

export default BooksApp;
