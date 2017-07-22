import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

export default class Search extends Component {
  state = {
    books: [],
  }

  static propTypes = {
    onBookShelfChanged: PropTypes.func.isRequired,
  }

  updateBooks(query) {
    if (query === '') {
      return this.clearBooks()
    }

    BooksAPI.search(query.trim(), 3).then(books => {
      if (books === undefined) {
        return this.clearBooks()
      }

      if (!Array.isArray(books) && books.hasOwnProperty('error')) {
        return this.clearBooks()
      }

      this.setState({ books })
    })
  }

  clearBooks() {
    this.setState({ books: [] })
  }

  changeBookShelf = (book, newShelf) => {
    this.props.onBookShelfChanged(book, newShelf)
  }

  componentDidMount() {
    this.searchInput.focus()
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              ref={input => {
                this.searchInput = input
              }}
              type="text"
              placeholder="Search by title or author"
              onChange={event => this.updateBooks(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book =>
              <li key={book.id}>
                <Book book={book} onShelfChanged={this.changeBookShelf} />
              </li>,
            )}
          </ol>
        </div>
      </div>
    )
  }
}
