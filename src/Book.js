import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChanged: PropTypes.func.isRequired,
  }

  moveToShelf(event) {
    this.props.onShelfChanged(this.props.book, event.target.value)
  }

  render() {
    const { book } = this.props

    // My First Life by Brenda Dean Paul doesn't have one.
    const smallThumbnail = book.hasOwnProperty('imageLinks')
      ? book.imageLinks.smallThumbnail
      : ''

    return (
      <div className="book">
        {/* The book top */}
        <div className="book-top">
          {/* The book cover */}
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${smallThumbnail})`,
            }}
          />

          {/* The book shelf changer */}
          <div className="book-shelf-changer">
            <select
              onChange={event => this.moveToShelf(event)}
              value={book.shelf}
            >
              {/* "Move to..." menu title */}
              <option value="select" disabled>
                Move to...
              </option>

              {/* Move the book to currently reading shelf. */}
              <option value="currentlyReading" disabled={book.isDisabled}>
                Currently Reading
              </option>

              {/* Move the book to want to read shelf. */}
              <option value="wantToRead" disabled={book.isDisabled}>
                Want to Read
              </option>

              {/* Move the book to read shelf. */}
              <option value="read" disabled={book.isDisabled}>
                Read
              </option>

              {/* Move the book out of the shelves. */}
              <option value="none" disabled={book.isDisabled}>
                None
              </option>
            </select>
          </div>
        </div>

        {/* The book title */}
        <div className="book-title">
          {book.title}
        </div>

        {/* The authors of the book if any */}
        {book.authors
          ? book.authors.map((author, key) =>
              <div key={`${book.id}-author-${key}`} className="book-authors">
                {author}
              </div>,
            )
          : ''}
      </div>
    )
  }
}
