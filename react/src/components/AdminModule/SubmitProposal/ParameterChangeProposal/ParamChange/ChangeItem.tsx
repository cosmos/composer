import React, { useState } from "react";
import { ParamChange } from "../../../../../cosmos/codec/cosmos/params/v1beta1/params";

interface IChangeItem {
    change: ParamChange;
    deleteChange: () => void;
}

const ChangeItem: React.FC<IChangeItem> = ({ change, deleteChange }) => {
    const [btnDeleteShow, setBtnDeleteShow] = useState(false);
    const onEnter = () => setBtnDeleteShow(true);
    const onLeave = () => setBtnDeleteShow(false);

    return (
        <tr onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <td>{change.subspace}</td>
            <td>{change.key}</td>
            <td>{change.value}</td>
            <td>
                {btnDeleteShow && (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                    <div className="btn-delete" onClick={deleteChange}>
                        x
                    </div>
                )}
            </td>
        </tr>
    );
};

export default ChangeItem;
