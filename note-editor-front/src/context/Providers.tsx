import { useReducer, useState } from "react";

import { Actions } from "../useReducer/actions";
import { Payload } from "../useReducer/interfaces";
import { initialState, reducer } from "../useReducer/reducer";
import { StateContext, DispatchContext } from './reducerContext';
import { ThemeContext } from "./themeContext";

interface Props {
    children: React.ReactNode
}

const Providers: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isLightTheme, setIsLightTheme] = useState<boolean>(true);
    const handleDispatch = (type: Actions, payload: Payload) => dispatch({ type, payload });

    return (
        <DispatchContext.Provider value={handleDispatch}>
            <StateContext.Provider value={state}>
                <ThemeContext.Provider value={{ isLightTheme, setIsLightTheme }}>
                    {children}
                </ThemeContext.Provider>
            </StateContext.Provider>
        </DispatchContext.Provider>
    )
}

export default Providers;