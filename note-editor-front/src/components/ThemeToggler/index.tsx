import { useContext, useEffect } from 'react';

import { Keys } from '../../constants/localStorage';
import { ThemeContext } from '../../context/themeContext';

import './style.scss';

const ThemeToggler = () => {
    const { isLightTheme, setIsLightTheme } = useContext(ThemeContext);

    const handleThemeToggling = () => {
        setIsLightTheme!(prev => {
            const theme = prev ? 'dark' : 'light';
            localStorage.setItem(Keys.THEME, JSON.stringify(theme));
            return !prev;
        });
    }

    useEffect(() => {
        let theme = localStorage.getItem(Keys.THEME);
        theme = theme && JSON.parse(theme);
        theme === 'dark' && setIsLightTheme!(false);
    }, [])

    return (
        <div className="theme-toggler-wrapper">
            <label className='theme-toggler' >
                <input 
                onChange={handleThemeToggling} 
                className='theme-toggler__input' 
                type="checkbox"
                checked={!isLightTheme} 
                />
                <span className='theme-toggler__span'></span>
            </label>
        </div>
    );
};

export default ThemeToggler;