import { useEffect, useState } from 'react';

import './style.scss';

interface OnlineStatusType {
    onlineStatusMessage: string;
    onlineStatusClassName: string;
}

const OnlineStatus = () => {
    const [{ onlineStatusMessage, onlineStatusClassName }, setOnlineStatus] =
        useState<OnlineStatusType>(
            {
                onlineStatusMessage: '',
                onlineStatusClassName: ''
            }
        );
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleOnlineStatus = (onlineStatus: OnlineStatusType) => {
        setOnlineStatus({ ...onlineStatus });
        timeoutId && clearTimeout(timeoutId);
        const id = setTimeout(() => {
            setOnlineStatus({
                onlineStatusMessage: '',
                onlineStatusClassName: ''
            });
            setTimeoutId(null);
        }, 5000);
        setTimeoutId(id);
    };

    const handleDisconnection = () => handleOnlineStatus({
        onlineStatusMessage: 'No Internet Connection',
        onlineStatusClassName: 'internet-connection--disconnected'
    });

    const handleReconnection = () => handleOnlineStatus({
        onlineStatusMessage: 'You are back online',
        onlineStatusClassName: 'internet-connection--connected'
    });

    useEffect(() => {
        window.addEventListener('online', handleReconnection)
        return () => window.removeEventListener('online', handleReconnection);
    }, [timeoutId]);

    useEffect(() => {
        window.addEventListener('offline', handleDisconnection)
        return () => window.removeEventListener('offline', handleDisconnection);
    }, [timeoutId]);

    return (onlineStatusMessage ?
        <div className={"internet-connection " + onlineStatusClassName}>
            {onlineStatusMessage}
        </div>
        : null
    );
};

export default OnlineStatus;