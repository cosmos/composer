import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import TextProposal from "./SubmitProposal/TextProposal";
import ParameterChangeProposal from "./SubmitProposal/ParameterChangeProposal/ParameterChangeProposal";
import CommunityPoolSpendProposal from "./SubmitProposal/CommunityPoolSpendProposal";
import AdminList from "./AdminList/AdminList";
import SubmitProposal from "./SubmitProposal";

const AdminModule = () => {
    return (
        <div className={"admin-module"}>
            <Tabs>
                <TabList>
                    <Tab>Admin List</Tab>
                    <Tab>Submit Proposal</Tab>
                </TabList>

                <TabPanel forceRender>
                    <div className={"tab-panel-content"}>
                        <AdminList />
                    </div>
                </TabPanel>

                <TabPanel forceRender>
                    <div className={"tab-panel-content"}>
                        <SubmitProposal />
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default AdminModule;
