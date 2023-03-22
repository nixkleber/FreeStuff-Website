import React, {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import "./Header.css"
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

const Header = () => {
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSignUpClick = () => {
        setShowRegisterModal(true);
    };

    const handleLoginClick = () => {
        setShowLoginModal(true);
    };

    const handleLogoutClick = () => {
        setIsLoggedIn(false);
    };

    const handleRegistrationSuccess = () => {
        setIsLoggedIn(true);
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    return (
        <header>
            <div className="left">
                <NavLink to="/"><h1>Free Stuff</h1></NavLink>
            </div>
            <div className="right">
                <div className="links">
                    <div className="links">
                        <NavLink to="/" activeclassname="active">Home</NavLink>
                        <NavLink to="/map" activeclassname="active">Map</NavLink>
                    </div>
                </div>
                <div className="buttons">
                    <button id="logButton" onClick={isLoggedIn ? handleLogoutClick : handleLoginClick}>
                        {isLoggedIn ? "Logout" : "Login"}
                    </button>
                    {!isLoggedIn && (
                        <button id="registerButton" onClick={handleSignUpClick}>Sign up</button>
                    )}
                </div>
            </div>
            <RegisterModal
                isOpen={showRegisterModal}
                onRequestClose={() => setShowRegisterModal(false)}
                onRegistrationSuccess={handleRegistrationSuccess}
            />
            <LoginModal
                isOpen={showLoginModal}
                onRequestClose={() => setShowLoginModal(false)}
                onLoginSuccess={handleLoginSuccess}
                setLoggedIn={setIsLoggedIn}
            />
        </header>
    );
};

export default Header;
