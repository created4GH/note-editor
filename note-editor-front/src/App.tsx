import { useContext, useEffect } from 'react';

import Top from './components/Top';
import Main from './components/Main';
import { ReactComponent as MainFrame } from "./assets/svg/frames/main.svg";


import { refreshToken } from './api/user';
import { setStorageIsLoggedIn } from './helpers';
import { StateContext } from './context/context';

import './assets/styles/reset.scss';
import './assets/styles/App.scss';

const App = () => {
  const { isLoggedIn } = useContext(StateContext);

  const handleRefreshToken = async () => {
    if (isLoggedIn) {
      try {
        await refreshToken();
        setStorageIsLoggedIn();
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('beforeunload', handleRefreshToken)
    return () => window.removeEventListener('beforeunload', handleRefreshToken);
  }, [])

  return (
    <div className="App">
      <div className="outter-container">
        <Top />
        <Main />
      </div>
      <MainFrame className='main-frame' />
    </div>
  );
}

export default App;
