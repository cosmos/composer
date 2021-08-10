import React from "react";
import { NavLink, withRouter } from "react-router-dom";
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
    return (
        <div className="sidebar">
            <ul className="sidebar-list">
                <li className="sidebar-item">
                    <NavLink to={routes.reviewState} activeStyle={active}>
                        ReviewState
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink to={routes.proposals} activeStyle={active}>
                        Proposals
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink to={routes.adminModule} activeStyle={active}>
                        Admin Module
                    </NavLink>
                </li>
            </ul>
            <SidebarBottom />
        </div>
    );
};

export const Sidebar = withRouter(SideBar);
