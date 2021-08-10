import React, { useEffect, useState } from "react";
import { useAccountConnection } from "../../../hooks/useAccountConnection";
import { useTypedSelector } from "../../../redux/useTypedSelector";
import { getAccountName, getBalance, getWalletAddress } from "../../../cosmos/keplr";
import Spinner from "../../Loader/Spinner";

const SidebarBottom = () => {
    const { isConnected, connectAccount, disconnectAccount } = useAccountConnection();
    const { keplr, error } = useTypedSelector((state) => state.wallet);

    const [coin, setCoin] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    useEffect(() => {
        async function setData() {
            if (isConnected && keplr) {
                setName(await getAccountName(keplr));
                setCoin(await getBalance(keplr, await getWalletAddress(keplr)));
            }
        }

        setData();

        return () => {
            setCoin(null);
            setName(null);
        };
    }, [keplr, isConnected]);

    return (
        <div className="sidebar-bottom">
            <div className="container">
                {isConnected ? (
                    <div>
                        <div className="account-data">
                            <p className="account-name">{name || <Spinner />}</p>
                            <p className="amount">{coin || <Spinner />}</p>
                        </div>

                        <button className="btn-disconnect" onClick={disconnectAccount}>
                            <p>Sign Out</p>
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="connect-error">{error}</p>
                        <button className="btn-connect" onClick={connectAccount}>
                            <p>Connect Wallet</p>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SidebarBottom;
