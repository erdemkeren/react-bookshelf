import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Search from './Search'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'

export default class BooksApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    }

    this.onBookShelfChanged = this.onBookShelfChanged.bind(this)
  }

  componentDidMount() {
    this.loadBooks()
  }

  onBookShelfChanged(book, newShelf) {
    BooksAPI.update(book, newShelf).then(shelves => {
      const currentlyReading = this.state.currentlyReading.filter(cBook =>
        shelves.currentlyReading.includes(cBook.id),
      )

      const wantToRead = this.state.wantToRead.filter(cBook =>
        shelves.wantToRead.includes(cBook.id),
      )

      const read = this.state.read.filter(cBook =>
        shelves.read.includes(cBook.id),
      )

      const newState = { currentlyReading, wantToRead, read }

      const updatedBook = book
      updatedBook.shelf = newShelf
      newState[newShelf].push(updatedBook)

      this.setState(newState)
    })
  }

  loadBooks() {
    BooksAPI.getAll().then(books => {
      const read = books.filter(book => book.shelf === 'read')
      const wantToRead = books.filter(book => book.shelf === 'wantToRead')
      const currentlyReading = books.filter(
        book => book.shelf === 'currentlyReading',
      )

      this.setState({
        read,
        wantToRead,
        currentlyReading,
      })
    })
  }

  render() {
    const { read, wantToRead, currentlyReading } = this.state

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

        <Route path="/search" component={Search} />
      </div>
    )
  }
}
