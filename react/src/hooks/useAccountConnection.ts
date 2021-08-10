import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../redux/useTypedSelector";
import { connectWallet, disconnectWallet } from "../redux/action-creator/wallet";

export const KeyAccountAutoConnect = "account_auto_connect";

export function useAccountConnection() {
    const dispatch = useDispatch();
    const { isConnected } = useTypedSelector((state) => state.wallet);

    const shouldAutoConnectAccount = localStorage?.getItem(KeyAccountAutoConnect) != null;

    const disconnectAccount = useCallback(() => {
        localStorage?.removeItem(KeyAccountAutoConnect);
        dispatch(disconnectWallet());
    }, [dispatch]);

    const connectAccount = useCallback(() => {
        localStorage?.setItem(KeyAccountAutoConnect, "true");
        dispatch(connectWallet());
    }, [dispatch]);

    useEffect(() => {
        // Log in automatically if you have not logged out after logging in earlier.
        if (shouldAutoConnectAccount && !isConnected) {
            dispatch(connectWallet());
        }
    }, [dispatch, isConnected]);

    return useMemo(() => {
        return {
            isConnected,
            disconnectAccount,
            connectAccount
        };
    }, [connectAccount, disconnectAccount, isConnected]);
}
