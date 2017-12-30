import React from "react";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import {Link, Route} from "react-router-dom";
import BookChanger from "./BookChanger";

class BookShelf extends React.Component {

    state = {
        bookShelf: []
    };

    componentWillReceiveProps = (prevProps) => {
        this.retrieveAllBooks();
    };

    componentWillMount = () => {
        this.retrieveAllBooks();
    };

    moveBook = (book, destination) => {
        if (BookChanger.validDestinations.includes(destination)) {
            BooksAPI.update(book, destination)
                .then(() => {
                    this.retrieveAllBooks();
                })
        }
    }

    retrieveAllBooks = () => {
        BooksAPI.getAll().then((books) => {
            this.setState({bookShelf: books});
        });
    }

    render() {

        const {bookShelf} = this.state;

        return (
            <Route exact path='/' render={() => (
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Currently Reading</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {bookShelf
                                            .filter(book => book.shelf === "currentlyReading")
                                            .map(book => (
                                                <li key={book.id}>
                                                    <Book
                                                        book={book}
                                                        moveBook={this.moveBook}
                                                    />
                                                </li>
                                            ))}
                                    </ol>
                                </div>
                            </div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Want to Read</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {bookShelf
                                            .filter(book => book.shelf === "wantToRead")
                                            .map(book => (
                                                <li key={book.id}>
                                                    <Book
                                                        book={book}
                                                        moveBook={this.moveBook}
                                                    />
                                                </li>
                                            ))}
                                    </ol>
                                </div>
                            </div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Read</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {bookShelf
                                            .filter(book => book.shelf === "read")
                                            .map(book => (
                                                <li key={book.id}>
                                                    <Book
                                                        book={book}
                                                        moveBook={this.moveBook}
                                                    />
                                                </li>
                                            ))}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to="/search">Add a book</Link>
                    </div>
                </div>
            )}/>
        )

    }
}

export default BookShelf