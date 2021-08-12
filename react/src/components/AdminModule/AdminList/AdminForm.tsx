import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveAdminAction } from "../../../redux/action-creator/adminList";
import { useTypedSelector } from "../../../redux/useTypedSelector";

const AdminForm = () => {
    const [address, setAddress] = useState("");
    const dispatch = useDispatch();
    const { isConnected, keplr } = useTypedSelector((state) => state.wallet);
    const { stargateClient } = useTypedSelector((state) => state.wallet);

    function addAdmin(adminAddress: string) {
        if (stargateClient && isConnected && keplr) {
            dispatch(saveAdminAction(adminAddress, stargateClient, keplr));
            setAddress("");
        }
    }

    return (
        <div className="admin-page__form">
            <label className="admin-page__form__label" htmlFor="new-admin">
                Add new admin{" "}
                <input
                    value={address}
                    onChange={({ target }) => setAddress(target.value)}
                    className="admin-page__form__address-input"
                    disabled={!isConnected}
                    placeholder="Address"
                    type="text"
                    name="new-admin"
                    id="new-admin"
                />
            </label>{" "}
            <button
                onClick={() => addAdmin(address)}
                className="admin-page__form__save-btn"
                disabled={!isConnected}>
                Save
            </button>
        </div>
    );
};

export default AdminForm;
