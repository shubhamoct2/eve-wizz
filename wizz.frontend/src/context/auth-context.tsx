"use client"

import React, { useState } from 'react';
interface IAuthContextProps {
    user: any;
    loading: boolean;
    setUser: (user: any) => void;
    setLoading: (loading: boolean) => void;
    isLoggedIn:boolean
}

export const AuthContext = React.createContext<IAuthContextProps>({
    user: {},
    loading: true,
    setUser: () => {},
    setLoading: () => {},
    isLoggedIn: false,
});

export const AuthContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    return (
        <AuthContext.Provider
            value={{
                    user: currentUser,
                    loading: isLoading,
                    setUser: setCurrentUser,
                    setLoading: setIsLoading,
                    setLoggedIn:setIsLoggedIn
            }}
            >
            {props.children}
        </AuthContext.Provider>
        );
};