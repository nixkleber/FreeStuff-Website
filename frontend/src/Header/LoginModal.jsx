import React, {useContext, useState} from 'react';
import Modal from 'react-modal';

import {LoginContext} from "../Security/LoginProvider";

import './LoginModal.css';

function LoginModal(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const {setIsLoggedIn, setUsername} = useContext(LoginContext);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
        },
    };

    function handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
        })
            .then((response) => {
                if (response.ok) {
                    // Login was successful
                    setErrorMessage('');
                    setSuccessMessage('Login successful!');
                    setEmail('');
                    setPassword('');
                    setSuccessMessage('Login successful!');
                    setTimeout(() => {
                        setSuccessMessage('');
                        props.onRequestClose();
                        setIsLoggedIn(true);

                        fetch(`http://localhost:8080/api/users?email=${email}`)
                            .then((response) => response.text())
                            .then((data) => {
                                const parsedData = JSON.parse(data);
                                setUsername(parsedData.username);
                            });
                    }, 2000);
                } else {
                    setErrorMessage('Email or Password incorrect!');
                }
            });
    }

    function handleRequestClose() {
        setEmail('');
        setPassword('');
        setErrorMessage('');
        setSuccessMessage('');
        props.onRequestClose();
    }

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={handleRequestClose}
            style={customStyles}
            contentLabel="Login Modal"
        >
            <div className="login-modal">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
        </Modal>
    );
}

export default LoginModal;
