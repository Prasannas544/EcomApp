import { createContext, useContext, useState } from "react";
import lightTheme from "./themeFiles/lightTheme";
import blackTheme from './themeFiles/blackTheme'
import redTheme from "./themeFiles/redTheme";
import greenTheme from "./themeFiles/greenTheme";

export const ThemeContext = createContext();

export const ThemeProvider=({children})=> {
    const [currentTheme, setCurrentTheme] = useState(blackTheme)

    const handleThemeChange=(value)=> {
        setCurrentTheme(value)
    }

    return (
        <ThemeContext.Provider value={{currentTheme, setCurrentTheme, handleThemeChange, lightTheme, blackTheme, redTheme, greenTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default function useTheme(){
    return useContext(ThemeContext)
}