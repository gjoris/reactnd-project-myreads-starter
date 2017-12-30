import React from 'react';

class BookChanger extends React.Component {

    static validDestinations = [
        "currentlyReading",
        "wantToRead",
        "read",
        "none"
    ];

    static extractCurrentReadingStatus(book) {
        if (book.shelf !== undefined && BookChanger.validDestinations.includes(book.shelf)) {
            return book.shelf;
        } else {
            return "none";
        }
    }

    render() {
        return (
            <select
                onChange={event => this.props.moveBook(this.props.book, event.target.value)}
                value={BookChanger.extractCurrentReadingStatus(this.props.book)}
            >
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading
                </option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        )
    }


}

export default BookChanger