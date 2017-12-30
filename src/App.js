import React from 'react'
import SearchPage from './SearchPage'
import BookShelf from './BookShelf'
import './App.css'
import BookChanger from "./BookChanger";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {

    moveBook = (book, destination) => {
        return new Promise((resolve, reject) => {
            if (BookChanger.validDestinations.includes(destination)) {
                BooksAPI.update(book, destination)
                    .then((result) => resolve(result))
                    .catch((error) => reject(error));
            }
        });
    };

    render() {

        return (
            <div className="app">
                <SearchPage moveBook={this.moveBook}/>
                <BookShelf moveBook={this.moveBook}/>
            </div>
        )
    }
}

export default BooksApp
