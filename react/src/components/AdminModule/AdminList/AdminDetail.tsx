import React from "react";
import { useDispatch } from "react-redux";
import { deleteAdminAction } from "../../../redux/action-creator/adminList";
import { useTypedSelector } from "../../../redux/useTypedSelector";

interface AdminDetailProps {
    accountAddress: string;
    orderNum: number;
}

const AdminDetail = ({ accountAddress, orderNum }: AdminDetailProps) => {
    const { isConnected, keplr } = useTypedSelector((state) => state.wallet);
    const dispatch = useDispatch();
    const { stargateClient } = useTypedSelector((state) => state.wallet);

    function deleteAdmin(address: string) {
        const res = window.confirm(`Delete "${address}"?`);
        if (res && stargateClient && keplr) {
            console.log("delete", address);
            dispatch(deleteAdminAction(address, stargateClient, keplr));
        }
    }

    return (
        <div className="admin-card">
            {orderNum}. {accountAddress}
            <div className="admin-card__buttons">
                <button
                    disabled={!isConnected}
                    className="admin-card__delete-btn"
                    onClick={() => deleteAdmin(accountAddress)}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default AdminDetail;
