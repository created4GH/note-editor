import { useReducer, useState } from 'react';

import Top from './components/Top';
import Main from './components/Main';
import { ReactComponent as MainFrame } from "./assets/svg/frames/main.svg";

import { StateContext, DispatchContext } from './contexts';
import { initialState, reducer } from './useReducer/reducer';

import './assets/styles/reset.scss';
import './assets/styles/App.scss';
import SignUpForm from './components/UserForm/SignUpForm/SignUpForm';
import LoginForm from './components/UserForm/LoginForm/LoginForm';



function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isDisplayLoginForm, updateIsDisplayLoginForm] = useState<boolean>(true);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <div className="App">
          <div className="outter-container">
            {state.isDisplayUserForm && (
              isDisplayLoginForm ? <LoginForm updateIsDisplayLoginForm={updateIsDisplayLoginForm} />
                : <SignUpForm updateIsDisplayLoginForm={updateIsDisplayLoginForm} />
            )}
            <Top />
            <Main />
          </div>
          <MainFrame className='main-frame' />
        </div>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
