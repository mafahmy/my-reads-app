import React from "react";
import Shelf from "./Shelf";

function Shelves({books, moveBook}) {

    const currentlyReading = books.filter((book) => book.shelf === "currentlyReading");
    const wantToRead = books.filter((book) => book.shelf === 'wantToRead');
    const read = books.filter((book) => book.shelf === 'read');

    console.log('books',books)

    return( 
        <div>
            <Shelf title="Currently Reading" books={currentlyReading} moveBook={moveBook}/>
            <Shelf title="Want to Read" books={wantToRead} moveBook={moveBook}/>
            <Shelf title="Read" books={read} moveBook={moveBook}/>
        </div>
    )
}
export default Shelves;