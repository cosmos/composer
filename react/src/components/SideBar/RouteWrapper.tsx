import React, { FunctionComponent } from "react";
import { Sidebar } from "./SideBar";

const RouteWrapper: FunctionComponent = ({ children }) => {
    return (
        <div className="router-wrapper">
            <Sidebar />
            {children}
        </div>
    );
};

export default RouteWrapper;
