import React, { useContext } from 'react'
import { ThemeContext } from '../context/theme-context';
import '../scss/main.scss';
import List from './list';
import Nav from './nav';

const Main = () => {
    const [LightTheme, setLightTheme] = useContext(ThemeContext)

    return (
        <div className={LightTheme ? "main" : "main dark-theme"}>

            <Nav />
            <List />
        </div>
    );
}

export default Main;