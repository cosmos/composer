import React, { useEffect, useState } from "react";
import { ParamChange } from "../../../../../cosmos/codec/cosmos/params/v1beta1/params";
import Select from "react-select";
import { useTypedSelector } from "../../../../../redux/useTypedSelector";
import { IModules } from "../../../../../types/reviewChanges";
import { useDispatch } from "react-redux";
import { fetchParamsList } from "../../../../../redux/action-creator/reviewChanges";

interface IChangeFormProps {
    // addChange: (change: ParamChange) => void;
    changes: ParamChange[];
    setChanges: React.Dispatch<
        React.SetStateAction<
            {
                subspace: string;
                key: string;
                value: string;
            }[]
        >
    >;
}

type KeysOfModules = keyof IModules;

const ChangeForm: React.FC<IChangeFormProps> = ({ changes, setChanges }) => {
    // const [subspace, setSubspace] = useState<KeysOfModules>("" as KeysOfModules);
    // const [key, setKey] = useState("");
    // const [value, setValue] = useState("");
    const modules = useTypedSelector((state) => state.reviewChanges.modules);
    const currentChanges = useTypedSelector((state) => state.reviewChanges);

    // const [inputList, setInputList] = useState([{ subspace: "staking", key: "", value: "" }]);

    // handle input change
    const handleInputChange = (
        name: "subspace" | "key" | "value",
        value: string,
        index: number
    ) => {
        const list = [...changes];
        list[index][name] = value;
        setChanges(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = (index: number) => {
        const list = [...changes];
        list.splice(index, 1);
        setChanges(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setChanges([...changes, { subspace: "staking", key: "", value: "" }]);
    };

    const subOptions = Object.keys(modules).map((key) => ({ value: key, label: key }));
    // const keyOptions = subspaceKeys[subspace]
    //     ? subspaceKeys[subspace].map((key) => ({ value: key, label: key }))
    //     : [];

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchParamsList());
    }, []);

    console.log("current inputs", changes);
    return (
        <div className="parameter-change-form">
            {changes.map((input, i) => (
                <div key={"input-k-" + i}>
                    <div className={"input-params"}>
                        <div className={"input-param-elem"}>
                            <Select
                                menuPlacement={"top"}
                                options={subOptions}
                                value={
                                    subOptions.find((elm) => elm.value === input.subspace) || null
                                }
                                onChange={(e) => {
                                    const value: KeysOfModules = e?.value
                                        ? (e.value as KeysOfModules)
                                        : (input.subspace as KeysOfModules);
                                    // setSubspace(value);
                                    // if (subspaceKeys[value]) setKey(subspaceKeys[value][0]);

                                    // new
                                    handleInputChange("subspace", value, i);
                                    if (subspaceKeys[value])
                                        handleInputChange("key", subspaceKeys[value][0], i);
                                }}
                                placeholder={"Subspace"}
                            />
                        </div>

                        <div className={"input-param-elem"}>
                            <Select
                                menuPlacement={"top"}
                                options={
                                    subspaceKeys[input?.subspace].map((key) => ({
                                        value: key,
                                        label: key
                                    })) || []
                                }
                                // onChange={(e) => setKey(e?.value || key)}
                                onChange={(e) => handleInputChange("key", e?.value || "", i)}
                                defaultValue={
                                    subspaceKeys[input?.subspace].map((key) => ({
                                        value: key,
                                        label: key
                                    }))[0] || ""
                                }
                                // value={keyOptions.find((elm) => elm.value === key) || null}
                                value={
                                    subspaceKeys[input?.subspace]
                                        .map((key) => ({
                                            value: key,
                                            label: key
                                        }))
                                        .find((elm) => elm.value === input.key) || null
                                }
                                placeholder={"Key"}
                            />
                        </div>

                        <div className={"input-param-elem"}>
                            <input
                                value={input.value}
                                onChange={({ target }) =>
                                    handleInputChange("value", target.value, i)
                                }
                                className="value-input"
                                placeholder="Value"
                                type="text"
                            />
                        </div>
                        <button onClick={() => handleRemoveClick(i)}>Remove</button>
                    </div>
                    <div>
                        Current value: {/* @ts-ignore */}
                        {/* {currentChanges.modules[input.subspace][input.key].toString()} */}
                    </div>
                    <div>
                        {input.key === "depositparams"
                            ? // eslint-disable-next-line quotes
                              'Deposit params example: {"min_deposit": [{"denom": "uscrt", "amount": "10000000"}], "max_deposit_period": "172800000000000"}'
                            : null}
                        {input.key === "votingparams"
                            ? // eslint-disable-next-line quotes
                              'Voting params example: {"voting_period": "172800000000000"}'
                            : null}
                        {input.key === "tallyparams"
                            ? // eslint-disable-next-line quotes
                              'Tally Params example: {"quorum": "0.334000000000000000", "threshold": "0.500000000000000000", "veto": "0.334000000000000000"}'
                            : null}
                    </div>
                </div>
            ))}
            <button
                className={"btn-add-param"}
                onClick={() => {
                    // addChange({ key, value: modifiedValue, subspace });

                    // new
                    handleAddClick();
                }}>
                Add parameter
            </button>
        </div>
    );
};

type tParamOptions = {
    [key: string]: string[];
};

const subspaceKeys: tParamOptions = {
    auth: [
        "MaxMemoCharacters",
        "TxSigLimit",
        "TxSizeCostPerByte",
        "SigVerifyCostED25519",
        "SigVerifyCostSecp256k1"
    ],
    bank: ["sendenabled"],
    gov: ["depositparams", "votingparams", "tallyparams"],
    staking: ["UnbondingTime", "MaxValidators", "KeyMaxEntries", "HistoricalEntries", "BondDenom"],
    slashing: [
        "SignedBlocksWindow",
        "MinSignedPerWindow",
        "DowntimeJailDuration",
        "SlashFractionDoubleSign",
        "SlashFractionDowntime"
    ],
    distribution: [
        "communitytax",
        "secretfoundationtax",
        "secretfoundationaddress",
        "baseproposerreward",
        "bonusproposerreward",
        "withdrawaddrenabled"
    ],
    crisis: ["ConstantFee"],
    mint: [
        "MintDenom",
        "InflationRateChange",
        "InflationMax",
        "InflationMin",
        "GoalBonded",
        "BlocksPerYear"
    ],
    evidence: ["MaxEvidenceAge"]
};

export default ChangeForm;
