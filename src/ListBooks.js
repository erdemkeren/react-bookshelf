import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

export default class ListBooks extends Component {
  constructor(props) {
    super(props)

    this.onBookShelfChanged = this.onBookShelfChanged.bind(this)
  }

  onBookShelfChanged(book, newShelf) {
    this.props.onBookShelfChanged(book, newShelf)
  }

  render() {
    const { currentlyReading, wantToRead, read } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              name="Currently Reading"
              books={currentlyReading}
              onBookShelfChanged={this.onBookShelfChanged}
            />
            <BookShelf
              name="Want To Read"
              books={wantToRead}
              onBookShelfChanged={this.onBookShelfChanged}
            />
            <BookShelf
              name="Read"
              books={read}
              onBookShelfChanged={this.onBookShelfChanged}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

ListBooks.propTypes = {
  currentlyReading: PropTypes.array.isRequired,
  wantToRead: PropTypes.array.isRequired,
  read: PropTypes.array.isRequired,
  onBookShelfChanged: PropTypes.func.isRequired,
}
