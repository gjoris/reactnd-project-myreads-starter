import React from 'react';
import PropTypes from "prop-types"
import BookChanger from "./BookChanger";

class Book extends React.Component {

    static determineStyleForBook(book) {
        if (book.imageLinks === undefined) {
            return {}
        } else {
            return {
                width: 128,
                height: 193,
                backgroundImage: 'url(' + book.imageLinks.thumbnail + ')'
            }
        }
    }

    static determineAuthorsForBook(book) {
        return book.authors ? book.authors.join(", ") : "";
    }

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={Book.determineStyleForBook(this.props.book)}/>
                    <div className="book-shelf-changer">
                        <BookChanger book={this.props.book} moveBook={this.props.moveBook}/>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{Book.determineAuthorsForBook(this.props.book)}</div>
            </div>

        )
    }
}

export default Book

Book.propTypes = {
    book: PropTypes.object.isRequired,
    moveBook: PropTypes.func.isRequired
};