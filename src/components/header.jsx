import React, { useEffect, useContext, useState } from 'react'
import '../scss/header.scss';
import headerImgLight from '../images/bg-desktop-light.jpg';
import headerImgDark from '../images/bg-desktop-dark.jpg';
import headerImgLightMobile from '../images/bg-mobile-light.jpg';
import headerImgDarkMobile from '../images/bg-mobile-dark.jpg';
import { ThemeContext } from '../context/Theme-context';


const Header = () => {
    const [screenSize, setScreenSize] = useState(0);
    const [LightTheme, setLightTheme] = useContext(ThemeContext)

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        chooseBackground();
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const handleResize = () => {
        let screenWidth = window.innerWidth;
        setScreenSize(screenWidth)
    }

    const chooseBackground = () => {
        if ((screenSize > 1000 && LightTheme) || (screenSize >= 600 && LightTheme)) return <img src={headerImgLight} className="header-img" alt="" />;
        if ((screenSize > 1000 && !LightTheme) || (screenSize >= 600 && !LightTheme)) return <img src={headerImgDark} className="header-img" alt="" />;
        if (screenSize < 600 && LightTheme) return <img src={headerImgLightMobile} className="header-img" alt="" />;
        if (screenSize < 600 && !LightTheme) return <img src={headerImgDarkMobile} className="header-img" alt="" />;

    }

    return (
        <div className="header">
            {chooseBackground()}
        </div>

    );
}

export default Header;