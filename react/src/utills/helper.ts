import axios from "axios";

export const getModulesList = async (rpcEndpoint: string): Promise<string[]> => {
    const resp = await axios.get(`${rpcEndpoint}/genesis`);
    return Object.keys(resp.data.result.genesis.app_state);
};

export const adminModuleConnected = async (rpcEndpoint: string): Promise<boolean> => {
    const moduleList = await getModulesList(rpcEndpoint);
    return moduleList.includes("adminmodule");
};

export const getProposalsHistory = async (rpcEndpoint: string): Promise<any[]> => {
    const txs = await axios.get(
        `${rpcEndpoint}/tx_search?query="message.action='submit_proposal'"`
    );
    return txs.data.result.txs;
};
