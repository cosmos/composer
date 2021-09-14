import { useEffect, useMemo, useState } from "react";
import { useTypedSelector } from "../redux/useTypedSelector";
import { adminModuleConnected } from "../utills/helper";

export function useAdminConnection(): boolean {
    const [admConnected, setAdmConnected] = useState(false);
    const { rpc } = useTypedSelector((state) => state.settings);

    const updateConnection = async () => {
        const conn = await adminModuleConnected(rpc);
        setAdmConnected(conn);
    };

    useEffect(() => {
        updateConnection();
    }, [rpc]);

    return useMemo(() => admConnected, [admConnected]);
}
