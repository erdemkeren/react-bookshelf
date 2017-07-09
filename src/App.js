import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import ListBooks from './ListBooks'

export default class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount = () => {
    this.loadBooks()
  }

  loadBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route
          exact path="/"
          render={() => (
            <ListBooks
              books={this.state.books}
            />
        )}/>

        <Route
          path="/search"
          component={Search}
        />
      </div>
    )
  }
}
