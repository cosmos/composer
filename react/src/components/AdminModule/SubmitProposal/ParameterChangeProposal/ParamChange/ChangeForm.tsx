import React, { useEffect, useState } from "react";
import { ParamChange } from "../../../../../cosmos/codec/cosmos/params/v1beta1/params";
import Select from "react-select";
import { useTypedSelector } from "../../../../../redux/useTypedSelector";
import { IModules } from "../../../../../types/reviewChanges";
import { useDispatch } from "react-redux";
import { fetchParamsList } from "../../../../../redux/action-creator/reviewChanges";

interface IChangeFormProps {
    addChange: (change: ParamChange) => void;
}

type KeysOfModules = keyof IModules;

const ChangeForm: React.FC<IChangeFormProps> = ({ addChange }) => {
    const [subspace, setSubspace] = useState<KeysOfModules>("" as KeysOfModules);
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");
    const modules = useTypedSelector((state) => state.reviewChanges.modules);

    const subOptions = Object.keys(modules).map((key) => ({ value: key, label: key }));
    const keyOptions = subspaceKeys[subspace]
        ? subspaceKeys[subspace].map((key) => ({ value: key, label: key }))
        : [];

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchParamsList());
    }, []);
    return (
        <div className="parameter-change-form">
            <div className={"input-params"}>
                <div className={"input-param-elem"}>
                    <Select
                        menuPlacement={"top"}
                        options={subOptions}
                        onChange={(e) => {
                            const value: KeysOfModules = e?.value
                                ? (e.value as KeysOfModules)
                                : subspace;
                            setSubspace(value);
                            if (subspaceKeys[value]) setKey(subspaceKeys[value][0]);
                        }}
                        placeholder={"Subspace"}
                    />
                </div>

                <div className={"input-param-elem"}>
                    <Select
                        menuPlacement={"top"}
                        options={keyOptions}
                        onChange={(e) => setKey(e?.value || key)}
                        defaultValue={keyOptions[0]}
                        value={keyOptions.find((elm) => elm.value === key) || null}
                        placeholder={"Key"}
                    />
                </div>

                <div className={"input-param-elem"}>
                    <input
                        value={value}
                        onChange={({ target }) => setValue(target.value)}
                        className="value-input"
                        placeholder="Value"
                        type="text"
                    />
                </div>
                <button
                    className={"btn-add-param"}
                    onClick={() => addChange({ key, value, subspace })}>
                    Add
                </button>
            </div>
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
