import React, {createContext, useEffect, useState} from 'react';

export const LoginContext = createContext(null);

function LoginProvider({ children }){
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [username, setUsername] = useState(localStorage.getItem('username'));

    console.log("username1");
    console.log(username);

    useEffect(() =>  {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
        localStorage.setItem('username', username);


    }, [isLoggedIn, username]);
    
    return (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername }}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginProvider;