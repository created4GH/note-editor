import React, { useContext, useEffect } from 'react';
import { DispatchContext, StateContext } from '../../context/reducerContext';

import './style.scss';

import { Actions } from '../../useReducer/actions';
const { SET_GLOBAL_ERROR } = Actions;

const GlobalError: React.FC = () => {
    const { globalError } = useContext(StateContext);
    const handleDispatch = useContext(DispatchContext)!;

    useEffect(() => {
        const timerId = setTimeout(() => {
            handleDispatch(SET_GLOBAL_ERROR, null);
        }, 3000);
        return () => clearTimeout(timerId);
    }, []);

    return (globalError ?
        <div className="global-error-wrapper">
            <div className="global-error">
                {globalError}
            </div>
        </div>
        : null
    );
};

export default GlobalError;