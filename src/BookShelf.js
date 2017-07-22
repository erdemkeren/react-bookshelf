import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

export default class BookShelf extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onBookShelfChanged: PropTypes.func.isRequired,
  }

  changeBookShelf = (book, newShelf) => {
    this.props.onBookShelfChanged(book, newShelf)
  }

  render() {
    const { name, books } = this.props

    let bookList = null
    if (books.length === 0) {
      bookList = (
        <li key="empty">
          <span>No books for this shelf at the moment.</span>
        </li>
      )
    } else {
      bookList = books.map(book =>
        <li key={book.id}>
          <Book book={book} onShelfChanged={this.changeBookShelf} />
        </li>,
      )
    }

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {name}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {bookList}
          </ol>
        </div>
      </div>
    )
  }
}
