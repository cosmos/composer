import React, { useState } from "react";
import { coin, Coin } from "@cosmjs/stargate";

interface ICoinsFormProps {
    addCoin: (coin: Coin) => void;
}

const CoinsForm: React.FC<ICoinsFormProps> = ({ addCoin }) => {
    const [amount, setAmount] = useState("");
    const [denom, setDenom] = useState("");

    return (
        <div className="coins-form">
            <input
                value={amount}
                onChange={({ target }) => setAmount(target.value)}
                placeholder="Amount"
                type="number"
            />
            <input
                value={denom}
                onChange={({ target }) => setDenom(target.value)}
                placeholder="Denom"
                type="text"
            />
            <button className={"btn-add-coin"} onClick={() => addCoin(coin(+amount, denom))}>
                Add
            </button>
        </div>
    );
};

export default CoinsForm;
