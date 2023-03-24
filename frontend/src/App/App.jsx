import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MapSite from '../Map/MapSite';
import Home from "../Home/Home";

import LoginProvider from "../Security/LoginProvider";

import './App.css';

function App() {
    return (
        <LoginProvider>
            <Router>
                <div className="App">
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/map" element={<MapSite/>}/>
                    </Routes>
                    <Footer/>
                </div>
            </Router>
        </LoginProvider>
    );
}

export default App;
