import { createContext, useReducer } from "react";
import { ActionsType, StateType } from "../useReducer/interfaces";

import { initialState, reducer } from "../useReducer/reducer";
import { DispatchContext, StateContext } from "./context";

interface Props {
    children: React.ReactNode
}

const ReducerProvider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                {children}
            </StateContext.Provider>
        </DispatchContext.Provider>
    )
}

export default ReducerProvider;