import React, {useState} from 'react';
import {Link} from 'react-router-dom';
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
                <a href='src#'><h1>FreeStuff</h1></a>
            </div>
            <div className="right">
                <div className="links">
                    <Link to="/">Home</Link>
                    <Link to="/map">Map</Link>
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
