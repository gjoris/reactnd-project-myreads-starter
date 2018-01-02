import React from 'react';
import PropTypes from "prop-types"

function Book(props) {

    const determineStyleForBook = (book) => {
        return book.imageLinks === undefined ? {} : {
            width: 128,
            height: 193,
            backgroundImage: 'url(' + book.imageLinks.thumbnail + ')'
        };
    };

    const determineAuthorsForBook = (book) => {
        return book.authors ? book.authors.join(", ") : "";
    };

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={determineStyleForBook(props.book)}/>
                <div className="book-shelf-changer">
                    <select
                        onChange={event => props.moveBook(props.book, event.target.value)}
                        value={props.book.shelf}
                    >
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{props.book.title}</div>
            <div className="book-authors">{determineAuthorsForBook(props.book)}</div>
        </div>

    )
}

export default Book

Book.propTypes = {
    book: PropTypes.object.isRequired,
    moveBook: PropTypes.func.isRequired
};