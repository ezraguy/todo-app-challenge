import React, { useContext } from 'react';
import '../scss/nav.scss';
import sun from '../icons/icon-sun.svg';
import moon from '../icons/icon-moon.svg';
import { ThemeContext } from '../context/theme-context';


const Nav = () => {
    const [LightTheme, setLightTheme] = useContext(ThemeContext)
    const handleThemeChange = () => {
        setLightTheme(!LightTheme);
    }
    return (
        <div className="nav">
            <div className="logo">
                <h3>TODO</h3>
            </div>
            <div className="theme-icon">
                <img src={LightTheme ? sun : moon} onClick={handleThemeChange} alt="theme icon" />
            </div>
        </div>
    );
}

export default Nav;