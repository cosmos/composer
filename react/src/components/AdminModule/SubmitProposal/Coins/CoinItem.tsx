import React from "react";
import { Coin } from "@cosmjs/stargate";

interface IDepositItemProps {
    deposit: Coin;
    deleteDeposit: () => void;
}

const CoinItem: React.FC<IDepositItemProps> = ({ deposit, deleteDeposit }) => {
    return (
        <div className="coin-item">
            {`${deposit.amount}${deposit.denom}`}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div className="btn-delete" onClick={deleteDeposit}>
                x
            </div>
        </div>
    );
};

export default CoinItem;
