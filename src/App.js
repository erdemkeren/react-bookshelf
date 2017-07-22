import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import dcopy from 'deep-copy'
import './App.css'
import Search from './Search'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'

export default class BooksApp extends Component {
  state = {
    books: [],
  }

  componentDidMount() {
    this.loadBooks()
  }

  onBookShelfChanged = (book, newShelf) => {
    const stateBackup = dcopy(this.state)

    book.shelf = newShelf

    let bookExists = false
    const books = this.state.books
      .map(cBook => {
        if (cBook.id === book.id) {
          bookExists = true

          return book
        }

        return cBook
      })
      .filter(cBook => cBook.shelf !== 'none')

    if (!bookExists) {
      books.push(book)
    }

    this.setState({ books })

    BooksAPI.update(book, newShelf)
      .then(() => {
        const books = this.state.books.map(prevBook => {
          if (prevBook.id === book.id) {
            prevBook.isDisabled = false
          }

          return prevBook
        })

        this.setState({ books })
      })
      .catch(error => {
        this.setState(stateBackup)
      })
  }

  loadBooks() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  render() {
    const books = this.state.books
    const read = books.filter(book => book.shelf === 'read')
    const wantToRead = books.filter(book => book.shelf === 'wantToRead')
    const currentlyReading = books.filter(
      book => book.shelf === 'currentlyReading',
    )

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() =>
            <ListBooks
              currentlyReading={currentlyReading}
              wantToRead={wantToRead}
              read={read}
              onBookShelfChanged={this.onBookShelfChanged}
            />}
        />

        <Route
          path="/search"
          render={() => <Search onBookShelfChanged={this.onBookShelfChanged} />}
        />
      </div>
    )
  }
}
