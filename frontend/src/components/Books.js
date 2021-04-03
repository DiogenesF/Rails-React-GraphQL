// src/components/Books.js
import React, { Fragment } from 'react';
const Books = ({ books }) => (
  <Fragment>
    {books.map((book) =>
      <div key={book.id} className="flex border-b border-solid border-grey-light">
        <div className="w-3/4 p-4">
          <h3>{book.title}</h3>
        </div>
      </div>
    )}
  </Fragment>
);
export default Books;