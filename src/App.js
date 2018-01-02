import React from 'react'
import SearchPage from './SearchPage'
import BookShelf from './BookShelf'
import './App.css'
import * as BooksAPI from "./BooksAPI";
import {Route} from "react-router-dom";

class BooksApp extends React.Component {

    state = {
        bookShelf: [],
        searchResult: []
    };

    componentDidMount = () => {
        this.retrieveAllBooks();
    };

    moveBook = (book, destination) => {
        BooksAPI.update(book, destination).then(() => this.retrieveAllBooks());
    };

    retrieveAllBooks = () => {
        BooksAPI.getAll().then((books) => {
            this.setState({bookShelf: books});
        });
    };

    render() {

        const {bookShelf} = this.state;

        return (
            <div className="app">
                <Route exact path='/search' render={() => (
                    <SearchPage books={bookShelf} moveBook={this.moveBook} searchBook={this.searchBook}/>
                )}/>

                <Route exact path='/' render={() => (
                    <BookShelf books={bookShelf} moveBook={this.moveBook}/>
                )}/>
            </div>
        )
    }
}

export default BooksApp
