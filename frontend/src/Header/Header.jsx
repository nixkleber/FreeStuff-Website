import React, {useContext, useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import "./Header.css"
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import {LoginContext} from "../Security/LoginProvider";


function Header() {
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext); // update the isLoggedIn state from the context

    const {username, setUsername} = useContext(LoginContext);

    const handleSignUpClick = () => {
        setShowRegisterModal(true);
    };

    const handleLoginClick = () => {
        setShowLoginModal(true);
    };

    const handleLogoutClick = () => {
        setIsLoggedIn(false);
        setUsername(null);
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
                        {isLoggedIn && <NavLink to="/map" activeclassname="active">Map</NavLink>}
                    </div>
                </div>
                <div className="buttons">
                    <button id="logButton" onClick={isLoggedIn ? handleLogoutClick : handleLoginClick}>
                        {isLoggedIn ? "Logout" : "Login"}
                    </button>
                    {!isLoggedIn && (
                        <button id="registerButton" onClick={handleSignUpClick}>Sign up</button>
                    )}
                    {isLoggedIn && (
                        <div>Logged in as: {username}</div>
                    )}
                </div>
            </div>
            <RegisterModal
                isOpen={showRegisterModal}
                onRequestClose={() => setShowRegisterModal(false)}
            />
            <LoginModal
                isOpen={showLoginModal}
                onRequestClose={() => setShowLoginModal(false)}
                setLoggedIn={setIsLoggedIn}
            />
        </header>
    );
};

export default Header;
