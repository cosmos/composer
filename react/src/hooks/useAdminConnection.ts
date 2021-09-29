import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { setModule } from "../redux/action-creator/settings";
import { useTypedSelector } from "../redux/useTypedSelector";
import { ModuleNames } from "../types/settings";
import { adminModuleConnected } from "../utills/helper";

export function useAdminConnection(): boolean {
    const [admConnected, setAdmConnected] = useState(false);
    const dispatch = useDispatch();
    const { rpc } = useTypedSelector((state) => state.settings);

    const updateConnection = async () => {
        const conn = await adminModuleConnected(rpc);
        setAdmConnected(conn);

        if (!conn) {
            dispatch(setModule(ModuleNames.gov));
        }
    };

    useEffect(() => {
        updateConnection();
    }, [rpc]);

    return useMemo(() => admConnected, [admConnected]);
}
