import React, { Component } from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import AddButton from './components/AddButton';
import BookSection from './components/BookSection';


import { PropagateLoader } from 'react-spinners';
import { Route } from 'react-router-dom';
import * as BookAPI from './BooksAPI';

class MyReads extends Component {
  constructor(props) {
    super(props)

    this.state = {
      books: [],
      loading: true
    }
  }

  componentDidMount() {
    BookAPI.getAll()
      .then(books => {
        this.setState({ books: books, loading: false })
      })
  }

  moveBook = (book, moveTo) => {
    if (moveTo.length !== 0) {
      const newBooks = this.state.books.filter(bookToCheck => {
        if (bookToCheck.id === book.id) {
          BookAPI.update(book, moveTo);
          bookToCheck.shelf = moveTo;
          return bookToCheck;
        } else {
          return book;
        }
      })

      this.setState({ books: newBooks });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="container height-100 animated fadeIn">
          <div className="flex-center height-100">
            <PropagateLoader
              size={15}
              sizeUnit={"px"}
              color={'#0984e3'}
            />
          </div>
        </div>
      )
    } else {
      return (
        <div className="container-fluid">          
            <Header />
            <Route
              exact
              path='/'
              render={() => (
                <div className="row height-100">
                  <AddButton />
                  <BookSection
                    style="to-read"
                    type="wantToRead"
                    name="Want to read"
                    books={this.state.books}
                    moveBook={this.moveBook}
                  />
                  <BookSection
                    style="reading"
                    type="currentlyReading"
                    name="Currently reading"
                    books={this.state.books}
                    moveBook={this.moveBook}
                  />
                  <BookSection
                    type="read"
                    name="Read"
                    style="read"
                    books={this.state.books}
                    moveBook={this.moveBook}
                  />
                </div>               
              )}
            />
            <Route
              exact
              path='/search'
              render={() => (
                <div className="row height-100">
                  <div className="search-section">
                    <SearchBar />
                  </div>                  
                </div>               
              )}
            />
          <Footer />
        </div>
      );
    }
  }
}

export default MyReads;
