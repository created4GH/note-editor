import { createContext} from "react";
import { Actions } from "../useReducer/actions";

import { Payload, StateType } from "../useReducer/interfaces";
import { initialState } from "../useReducer/reducer";

type handleDispatch = (type: Actions, payload: Payload) => void;

export const StateContext = createContext<StateType>(initialState);
export const DispatchContext = createContext<handleDispatch | null>(null);
