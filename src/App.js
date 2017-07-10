import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Search from './Search'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'

export default class BooksApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      books: [],
    }
  }

  componentDidMount() {
    this.loadBooks()
  }

  loadBooks() {
    BooksAPI.getAll().then(books => this.setState({ books }))
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => <ListBooks books={this.state.books} />}
        />

        <Route path="/search" component={Search} />
      </div>
    )
  }
}
