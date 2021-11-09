import React, { useState } from "react";
import { coin, Coin } from "@cosmjs/stargate";

interface ICoinsFormProps {
    deposit: Coin[];
    setDeposit: React.Dispatch<React.SetStateAction<Coin[]>>;
}

const CoinsForm: React.FC<ICoinsFormProps> = ({ deposit, setDeposit }) => {
    // const [amount, setAmount] = useState("");
    // const [denom, setDenom] = useState("");
    // handle input change
    const handleCoinChange = (name: "denom" | "amount", value: string, index: number) => {
        const list = [...deposit];
        // @ts-ignore
        list[index][name] = value;
        setDeposit(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = (index: number) => {
        const list = [...deposit];
        list.splice(index, 1);
        setDeposit(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setDeposit([...deposit, { denom: "", amount: "" }]);
    };
    return (
        <div className="coins-form">
            {deposit.map((c, i) => (
                <div className="coin-row" key={"coinf-" + i}>
                    <input
                        value={c.amount}
                        onChange={({ target }) => handleCoinChange("amount", target.value, i)}
                        placeholder="Amount"
                        type="number"
                    />
                    <input
                        value={c.denom}
                        onChange={({ target }) => handleCoinChange("denom", target.value, i)}
                        placeholder="Denom"
                        type="text"
                    />
                    <button className={"btn-add-coin"} onClick={() => handleRemoveClick(i)}>
                        Remove
                    </button>
                </div>
            ))}
            <button className="btn-add-coin" onClick={() => handleAddClick()}>
                Add token
            </button>
        </div>
    );
};

export default CoinsForm;
