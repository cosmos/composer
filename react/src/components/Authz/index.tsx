import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { grantAuth, revokeAuth } from "../../redux/action-creator/authz";
import { useTypedSelector } from "../../redux/useTypedSelector";
import { initSettings } from "../../utills/initSettings";
import Spinner from "../Loader/Spinner";

const AuthzPage = (): JSX.Element => {
    const [granterG, setGranterG] = useState("");
    const [granteeG, setGranteeG] = useState("");
    const [msgTypeUrlG, setMsgTypeUrlG] = useState("");

    const [granterR, setGranterR] = useState("");
    const [granteeR, setGranteeR] = useState("");
    const [msgTypeUrlR, setMsgTypeUrlR] = useState("");

    const { broadcastResponse, error, fetching } = useTypedSelector((s) => s.authz);
    const { isConnected } = useTypedSelector((s) => s.wallet);
    const dispatch = useDispatch();

    function sendGrant() {
        dispatch(grantAuth(granterG, granteeG, msgTypeUrlG));
    }

    function revokeGrant() {
        dispatch(revokeAuth(granterR, granteeR, msgTypeUrlR));
    }

    useEffect(() => {
        initSettings(dispatch);
    }, []);

    return (
        <div className="authz-page">
            <div className="authz-page__header">Authz {fetching && <Spinner />}</div>

            {error && <div className={"error-label"}>Error: {error}</div>}
            {broadcastResponse && <h1 className={"success-label"}>Success</h1>}

            <div className="authz-page__form">
                <div className="authz-page__subheader">Grant authorization</div>
                <label className="authz-page__label" htmlFor="granterg">
                    Granter:
                    <input
                        type="text"
                        name="granterg"
                        id="granterg"
                        className="authz-page__input"
                        value={granterG}
                        onChange={({ target }) => setGranterG(target.value)}
                        disabled={!isConnected}
                    />
                </label>
                <label className="authz-page__label" htmlFor="granteeg">
                    Grantee:
                    <input
                        type="text"
                        name="granteeg"
                        id="granteeg"
                        className="authz-page__input"
                        value={granteeG}
                        onChange={({ target }) => setGranteeG(target.value)}
                        disabled={!isConnected}
                    />
                </label>
                <label className="authz-page__label" htmlFor="msgTypeUrlg">
                    Msg Type URL:
                    <input
                        type="text"
                        name="msgTypeUrlg"
                        id="msgTypeUrlg"
                        className="authz-page__input"
                        value={msgTypeUrlG}
                        onChange={({ target }) => setMsgTypeUrlG(target.value)}
                        disabled={!isConnected}
                    />
                </label>

                <button disabled={!isConnected} onClick={sendGrant} className="authz-page__btn">
                    Grant
                </button>
            </div>

            <div className="authz-page__form">
                <div className="authz-page__subheader">Revoke authorization</div>
                <label className="authz-page__label" htmlFor="granterr">
                    Granter:
                    <input
                        type="text"
                        name="granterr"
                        id="granterr"
                        className="authz-page__input"
                        value={granterR}
                        onChange={({ target }) => setGranterR(target.value)}
                        disabled={!isConnected}
                    />
                </label>
                <label className="authz-page__label" htmlFor="granteer">
                    Grantee:
                    <input
                        type="text"
                        name="granteer"
                        id="granteer"
                        className="authz-page__input"
                        value={granteeR}
                        onChange={({ target }) => setGranteeR(target.value)}
                        disabled={!isConnected}
                    />
                </label>
                <label className="authz-page__label" htmlFor="msgTypeUrlr">
                    Msg Type URL:
                    <input
                        type="text"
                        name="msgTypeUrlr"
                        id="msgTypeUrlr"
                        className="authz-page__input"
                        value={msgTypeUrlR}
                        onChange={({ target }) => setMsgTypeUrlR(target.value)}
                        disabled={!isConnected}
                    />
                </label>

                <button disabled={!isConnected} onClick={revokeGrant} className="authz-page__btn">
                    Revoke
                </button>
            </div>
        </div>
    );
};

export default AuthzPage;
