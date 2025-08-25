'use client'

import { createContext, ReactNode, useContext, useState } from "react"

type GlobalState = {
    theme: string,
    user: any | null
}

type GlobalContextType = {
    globalState: GlobalState,
    updateTheme: (newTheme: string) => void,
    setUser: (userData: any) => void,
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

type GlobalProviderProps = {
    children: ReactNode
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [globalState, setGlobalState] = useState({
        theme: 'light',
        user: null,
    })

    const updateTheme = (newTheme: string) => {
        setGlobalState((prevState) => ({ ...prevState, theme: newTheme }));
    };

    const setUser = (userData: any) => {
        setGlobalState((prevState) => ({ ...prevState, user: userData}))
    }

    return (
        <GlobalContext.Provider value={{ globalState, updateTheme, setUser }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalProvider = () => {
    const context = useContext(GlobalContext)
    if (context == undefined) {
        throw new Error('useGlobalContext must be used within a GlobalProvider')
    }

    return context
}