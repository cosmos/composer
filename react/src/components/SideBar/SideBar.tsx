import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { useAdminConnection } from "../../hooks/useAdminConnection";
import { useAuthzConnected } from "../../hooks/useAuthzEnabled";
import { routes } from "../../router";
import SidebarBottom from "./SidebarBottom/SidebarBottom";

const active = {
    // color: '#ff0000',
    fontWeight: 700,
    boxShadow: "0 0 20px rgba(29, 29, 29, 0.13)",
    borderLeft: "3px solid #56CCF2",
    color: "black"
};

const SideBar: React.FC = () => {
    const admConnected = useAdminConnection();
    const authzConnected = useAuthzConnected();

    return (
        <div className="sidebar">
            <ul className="sidebar-list">
                <li className="sidebar-item">
                    <NavLink to={routes.reviewState} activeStyle={active}>
                        Review state
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink to={routes.proposals} activeStyle={active}>
                        Proposals
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink to={routes.submitProposal} activeStyle={active}>
                        Submit proposal
                    </NavLink>
                </li>
                {admConnected && (
                    <li className="sidebar-item">
                        <NavLink to={routes.adminList} activeStyle={active}>
                            Admin list
                        </NavLink>
                    </li>
                )}

                {/* <li className="sidebar-item">
                    <NavLink to={routes.adminModule} activeStyle={active}>
                        Admin Module
                    </NavLink>

                </li> */}

                {authzConnected && (
                    <li className="sidebar-item">
                        <NavLink to={routes.authz} activeStyle={active}>
                            Authz
                        </NavLink>
                    </li>
                )}

                <li className="sidebar-item">
                    <NavLink to={routes.settings} activeStyle={active}>
                        Settings
                    </NavLink>
                </li>
            </ul>
            <SidebarBottom />
        </div>
    );
};

export const Sidebar = withRouter(SideBar);
