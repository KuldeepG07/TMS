import React from 'react';
import { FaSearch } from 'react-icons/fa';
import '../CSS/Searchbox.css'

const SearchBox = () => {
    return (
        <div className="search-container">
            <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search Jobs, Training Programs..."
                    style={{marginBottom: '0'}}
                />
                <button className="search-button" style={{marginRight: '0', marginTop: '0', marginLeft: '5px'}}>Search</button>
            </div>
        </div>
    );
};

export default SearchBox;
