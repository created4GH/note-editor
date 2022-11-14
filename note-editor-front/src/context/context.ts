import { createContext} from "react";

import { ActionsType, StateType } from "../useReducer/interfaces";
import { initialState } from "../useReducer/reducer";


export const StateContext = createContext<StateType>(initialState);
export const DispatchContext = createContext<React.Dispatch<ActionsType> | null>(null);