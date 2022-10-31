import React, { useReducer, useEffect } from 'react';

import Top from './components/Top';
import Main from './components/Main';
import { ReactComponent as MainFrame } from "./assets/svg/frames/main.svg";

import { StateContext, DispatchContext } from './contexts';
import { Actions, ActionsType, initialState, reducer } from './reducer';

import './assets/styles/reset.scss';
import './assets/styles/App.scss';
import { Formik } from 'formik';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes")!) || [];
    if (notes.length) {
      dispatch(
        {
          type: Actions.UPDATE_NOTES, payload: notes
        });
      dispatch({ type: Actions.UPDATE_CHOSEN_NOTE, payload: notes[0] });
    }
  }, [state.isLoggedIn])

  return (
    <DispatchContext.Provider value={dispatch as React.Dispatch<ActionsType>}>
      <StateContext.Provider value={state}>
        <div className="App">
          <div className="outter-container">
            <Top />
            <Main />
          </div>
          <MainFrame className='main-frame' />
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
