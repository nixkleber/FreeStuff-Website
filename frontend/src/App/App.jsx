import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Map from '../Map/Map';
import Home from "../Home/Home";

import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/map" element={<Map />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
