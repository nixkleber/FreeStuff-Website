import React, { useState } from 'react';
import Modal from 'react-modal';

import './RegisterModal.css';

function RegisterModal(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '400px', // set the width of the modal
        },
    };

    function handleSubmit(event) {
        event.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("Passwords don't match");
            return;
        }
        fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => {
                if (response.ok) {
                    // Registration was successful
                    flushInputFields();

                    setSuccessMessage('Registration successful!');
                    setTimeout(() => {
                        setSuccessMessage('');
                        props.onRegistrationSuccess(); // call onRegistrationSuccess prop
                        props.onRequestClose();
                    }, 2000); // hide success message after 2 seconds and close modal
                } else {
                    setErrorMessage('Email already exists!');
                }
            });
    }

    function handleRequestClose() {
        flushInputFields();
        props.onRequestClose();
    }

    function flushInputFields() {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrorMessage('');
        setSuccessMessage('');
    }

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={handleRequestClose}
            style={customStyles}
            contentLabel="Register Modal"
        >
            <div className="register-modal">
                <h2>Register</h2>
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
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                </form>
            </div>
        </Modal>
    );
}

export default RegisterModal;
