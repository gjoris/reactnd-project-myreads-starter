import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from "./BooksAPI";
import Book from "./Book"
import {Debounce} from "react-throttle";
import PropTypes from "prop-types";

class SearchPage extends Component {

    state = {
        query: '',
        booksToShow: [],
        books: []
    };

    constructor(props) {
        super(props);
        this.state = {
            books: props.books
        };
    }

    componentWillReceiveProps(props) {
        if (this.state.booksToShow !== undefined) {
            let updatedBooksToShow = this.state.booksToShow.map((book) => {
                let bookInProps = props.books.find((bookOnShelf) => {
                    return book.id === bookOnShelf.id;
                });
                if (bookInProps !== undefined && bookInProps !== null) {
                    book.shelf = bookInProps.shelf;
                } else {
                    book.shelf = "none";
                }
                return book;
            });
            this.setState({books: props.books, booksToShow: updatedBooksToShow});
        }
    }

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
        BooksAPI.search(this.state.query.trim(), 100).then((result) => {
            let processedArray = result
                .map((book) => {
                    let bookInCollection = this.findBookInState(book);
                    if (bookInCollection !== undefined && bookInCollection !== null) {
                        book.shelf = bookInCollection.shelf;
                    } else {
                        book.shelf = "none";
                    }
                    return book;
                });
            this.setState({booksToShow: processedArray});
        })
    };

    findBookInState(book) {
        return this.state.books.find((bookOnShelf) => {
            return book.id === bookOnShelf.id;
        });
    }

    moveBook = (book, destination) => {
        BooksAPI.update(book, destination);
    };

    render() {

        return (
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
                        <Debounce time="400" handler="onChange">
                            <input
                                type="text"
                                placeholder="Search by title or author"
                                onChange={(event) => this.updateQuery(event.target.value)}
                            />
                        </Debounce>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.booksToShow && this.state.booksToShow.length > 0 && this.state.booksToShow.map((book) => (
                                <Book key={book.id} book={book} moveBook={this.props.moveBook}/>
                            )
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage

SearchPage.propTypes = {
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired
};