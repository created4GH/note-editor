import { createContext, Dispatch, SetStateAction} from "react";

import { StateType, ActionsType, initialState } from "./reducer";


export const StateContext = createContext<StateType>(initialState);
export const DispatchContext = createContext<React.Dispatch<ActionsType> | null>(null);