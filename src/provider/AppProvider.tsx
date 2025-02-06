'use client'
import { checkUser } from "@/utils/check-user";
import React, { createContext, useEffect, useState } from "react";

const AppContext = createContext(0);

interface AppProviderProps{
    children: React.ReactNode;
}

const APPProvider:React.FC<AppProviderProps> = ({ children }) => {
    const [hasCheckedUser, setHasCheckedUser] = useState(false);

    useEffect(() => {
        if(!hasCheckedUser){
            checkUser()
            setHasCheckedUser(true)

        }
      
   
    }, [])
    
    return (
        <AppContext.Provider value={0}>
            {children}
        </AppContext.Provider>
    );
};

export default APPProvider;
