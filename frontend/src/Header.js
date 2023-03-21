import React, { useState } from 'react';
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
                <h1>FreeStuff</h1>
            </div>
            <div className="right">
                <div className="links">
                    <a href="#">Home</a>
                    <a href="#">Map</a>
                </div>
                <div className="buttons">
                    {isLoggedIn ? (
                        <button onClick={handleLogoutClick}>Logout</button>
                    ) : (
                        <button onClick={handleLoginClick}>Login</button>
                    )}
                    {!isLoggedIn && (
                        <button onClick={handleSignUpClick}>Sign up</button>
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
