import { createContext} from "react";

interface ThemeType {
    isLightTheme: boolean;
    setIsLightTheme: React.Dispatch<React.SetStateAction<boolean>> | null;
};

const themeContext = {
    isLightTheme: true,
    setIsLightTheme: null
};

export const ThemeContext = createContext<ThemeType>(themeContext);