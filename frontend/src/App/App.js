import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Map from '../Map/Map';

function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/" element={<div><h1   >Home Page</h1></div>} />
                    <Route path="/map" element={<Map />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
