import React from "react";
import Shelf from "./Shelf"; // Importing shelf
import PropTypes from "prop-types";
// setting books, moveBook function as props

function Shelves({ books, moveBook, error }) {
  Shelves.propTypes = {
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired,
    error: PropTypes.object
  };
  // Define an array of shelf data
  const shelves = [
    { title: 'Want to read', id: 'wantToRead' },
    { title: 'Read', id: 'read' },
    { title: 'Currently Reading', id: 'currentlyReading' },
  ]

  return (
    <div>
      {error && (
        <div className="error">
          <h3>{error.message}</h3>
        </div>
      )}
      {
        shelves.map((shelf) => (
          <Shelf key={shelf.id} title={shelf.title} books={books.filter((book) => book.shelf === shelf.id)} moveBook={moveBook} />
        ))
      }
    </div>
  );
}
export default Shelves;
