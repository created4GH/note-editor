import React from 'react';

import './style.scss';

const MainLoader = () => {
    return (
        <div className="main-loader-wrapper">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div>
            </div><div></div></div>
        </div>
    );
};

export default MainLoader;