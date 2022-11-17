import { useContext, useEffect } from 'react';

import Top from './components/Top';
import Main from './components/Main';
import OnlineStatus from './components/OnlineStatus';
import GlobalError from './components/GlobalError';
import { ReactComponent as MainFrame } from "./assets/svg/frames/main.svg";


import { refreshToken } from './api/user';
import { setStorageIsLoggedIn } from './helpers/localStorage';
import { DispatchContext, StateContext } from './context/reducerContext';
import { ThemeContext } from './context/themeContext';

import './assets/styles/reset.scss';
import './assets/styles/common.scss';
import './App.scss';

import { Actions } from './useReducer/actions';
const { SET_GLOBAL_ERROR } = Actions;

const App = () => {
  const { isLoggedIn } = useContext(StateContext);
  const handleDispatch = useContext(DispatchContext)!;
  const { isLightTheme } = useContext(ThemeContext);

  const appWrapperClassName = 'app-wrapper' + (isLightTheme ? ' app--light' : ' app--dark');

  const handleRefreshToken = async () => {
    if (isLoggedIn) {
      try {
        await refreshToken();
        setStorageIsLoggedIn();
      } catch (error) {
        handleDispatch(SET_GLOBAL_ERROR, (error as string));
      }
    }
  };

  useEffect(() => {
    window.addEventListener('load', handleRefreshToken)
    return () => window.removeEventListener('load', handleRefreshToken);
  }, [])

  return (
    <div className={appWrapperClassName}>
      <OnlineStatus />
      <GlobalError />
      <div className='App'>
        <div className="outter-container">
          <Top />
          <Main />
        </div>
        <MainFrame className='main-frame' />
      </div>
    </div>
  );
}

export default App;
