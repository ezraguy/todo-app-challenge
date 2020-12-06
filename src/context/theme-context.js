import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();
export const ThemeProvider = props => {
    const [LightTheme, setLightTheme] = useState(true)
    return (
        <ThemeContext.Provider value={[LightTheme, setLightTheme]} >
            { props.children}
        </ThemeContext.Provider >
    );
}