import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAdminList } from "../../../redux/action-creator/adminList";
import { useTypedSelector } from "../../../redux/useTypedSelector";
import Spinner from "../../Loader/Spinner";
import AdminDetail from "./AdminDetail";
import AdminForm from "./AdminForm";

const AdminList = () => {
    const dispatch = useDispatch();
    const { admins, error, loading } = useTypedSelector((state) => state.admin);

    useEffect(() => {
        dispatch(fetchAdminList());
    }, []);

    return (
        <div className="admin-page">
            <h4 className="title">Admin List {loading && <Spinner />}</h4>
            <AdminForm />
            {error}
            <div className="admin-page__list">
                {admins?.map((adm, i) => (
                    <AdminDetail key={i} accountAddress={adm} orderNum={i + 1} />
                ))}
            </div>
        </div>
    );
};

export default AdminList;
