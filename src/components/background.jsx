import React, { useContext } from 'react';
import { ThemeContext } from '../context/theme-context';
import '../scss/background.scss';

const Background = () => {
    const [LightTheme] = useContext(ThemeContext)

    return (<div className={LightTheme ? "background " : "background dark"}>

    </div>);
}

export default Background;