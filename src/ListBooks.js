import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

export default class ListBooks extends Component
{
  render() {
    const { books } = this.props

    const read = books.filter((book) => {
      return book.shelf === "read"
    })

    const wantToRead = books.filter((book) => {
      return book.shelf === "wantToRead"
    })

    const currReading = books.filter((book) => {
      return book.shelf === "currentlyReading"
    })

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf name="Currently Reading" books={currReading} />
            <BookShelf name="Want To Read" books={wantToRead}/>
            <BookShelf name="Read" books={read}/>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}
