import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import * as BooksAPI from "./BooksAPI";
import Book from "./Book"
import BookChanger from "./BookChanger";

class SearchPage extends Component {

    state = {
        query: '',
        booksToShow: []
    };

    updateQuery = (query) => {
        //We cannot trim here, because we would not be able to type spaces in the search box
        this.setState({query: query}, () => {
            if (this.state.query.trim().length > 0)
                this.searchForBooks();
            else
                this.setState({booksToShow: []});

        });
    };

    searchForBooks = () => {
        //We càn trim here
        BooksAPI.search(this.state.query.trim(), 100).then((books) => {
            this.setState({booksToShow: Array.from(books)});
        })
    };

    moveBook(book, destination) {
        if (BookChanger.validDestinations.includes(destination)) {
            BooksAPI.update(book, destination);
        }
    }

    render() {

        return (
            <Route exact path='/search' render={() => (
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search" to="/">Close</Link>
                        <div className="search-books-input-wrapper">
                            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                            <input
                                type="text"
                                placeholder="Search by title or author"
                                value={this.state.query}
                                onChange={(event) => this.updateQuery(event.target.value)}
                            />

                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {this.state.booksToShow && this.state.booksToShow.length > 0 && this.state.booksToShow.map((book) => (
                                <Book key={book.id} book={book} moveBook={this.moveBook}/>
                                )
                            )}
                        </ol>
                    </div>
                </div>
            )}/>
        )
    }
}

export default SearchPage