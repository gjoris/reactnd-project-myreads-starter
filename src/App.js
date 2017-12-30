import React from 'react'
import SearchPage from './SearchPage'
import BookShelf from './BookShelf'
import './App.css'

class BooksApp extends React.Component {

    render() {

        return (
            <div className="app">
                <SearchPage/>
                <BookShelf />
            </div>
        )
    }
}

export default BooksApp
