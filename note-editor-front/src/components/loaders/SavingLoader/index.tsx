import './style.scss';

const SavingLoader = () => {
    return (
        <div className="saving-loader-wrapper">
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default SavingLoader;