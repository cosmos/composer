import axios from "axios";

export const isAuthzEnabled = async (rpc: string): Promise<boolean> => {
    const { data } = await axios.get(`${rpc}/genesis`);
    if (!data.result.genesis.app_state.authz) return false;

    return true;
};
