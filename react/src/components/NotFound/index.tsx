import React from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../../router";

const NotFoundPage: React.FC = () => {
    return (
        <ul>
            <h1>Not Found</h1>
            <NavLink to={routes.home}>Home</NavLink>
        </ul>
    );
};

export default NotFoundPage;
