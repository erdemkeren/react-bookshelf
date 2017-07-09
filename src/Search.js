import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Search extends Component
{
  render() {
    return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author"/>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
    )
  }
}
