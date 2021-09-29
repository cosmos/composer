import { useEffect, useState } from "react";
import { useTypedSelector } from "../redux/useTypedSelector";
import { isAuthzEnabled } from "../utills/helper";

export const useAuthzConnected = () => {
    const { rpc } = useTypedSelector((state) => state.settings);
    const [connected, setConnected] = useState(false);

    async function checkCon() {
        const con = await isAuthzEnabled(rpc);
        setConnected(con);
    }

    useEffect(() => {
        checkCon();
    }, [rpc]);

    return connected;
};
