import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Shelves from "./Shelves";

import SearchPage from "./SearchPage";

function BooksApp() {
  // state = {
  /**
   * TODO: Instead of using this state variable to keep track of which page
   * we're on, use the URL in the browser's address bar. This will ensure that
   * users can use the browser's back and forward buttons to navigate between
   * pages, as well as provide a good URL they can bookmark and share.
   */
  //const [showSearchPage, useShowSearchPage] = useState(false);
  // }

  // using hooks to be able to set the states

  const [books, useBooks] = useState([]);

  const [querry, setQuerry] = useState("");

  const [searchBooks, setSearchBooks] = useState([]);

  // using useEffect to be able to get data from API
  useEffect(() => {
    BooksAPI.getAll().then((books) => useBooks(books));
  }, []);

  // A function to update and move books around
  const moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf);
    let movedBook = [];
    movedBook = books.filter((b) => b.id !== book.id);
    if (shelf !== "none") {
      book.shelf = shelf;
      movedBook = movedBook.concat(book);
    } else book.shelf = "none";

    useBooks(movedBook);
  };
  // A use effect hook to search for books in the API and manage the search functionality

  useEffect(
    () => {
      if (querry) {
        BooksAPI.search(querry).then((data) => {
          if (data.error) {
            setSearchBooks([]);
          } else {
            setSearchBooks(data);
          }
        });
      } else setSearchBooks([]);
    },
    [querry]
  );

  //

  return (
    <div>
      <div className="app">
        <Route // setting the routes for the app and passing the props to the Shelves
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <Shelves books={books} moveBook={moveBook} />
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
            />
          )}
        />
      </div>
    </div>
  );
}

export default BooksApp;
