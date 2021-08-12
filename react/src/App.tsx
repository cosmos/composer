import React from "react";
import RouteWrapper from "./components/SideBar/RouteWrapper";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import { routes } from "./router";
import ReviewState from "./components/ReviewState/ReviewState";
import ProposalsPage from "./components/Proposals";
import AdminModule from "./components/AdminModule/AdminModule";
import NotFoundPage from "./components/NotFound";
import "./assets/scss/main.scss";
import ProposalDetail from "./components/Proposals/ProposalDetail";
import AdminList from "./components/AdminModule/AdminList/AdminList";
import SubmitProposal from "./components/AdminModule/SubmitProposal";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={routes.home}>
                    <RouteWrapper>
                        <Home />
                    </RouteWrapper>
                </Route>

                <Route exact path={routes.reviewState}>
                    <RouteWrapper>
                        <ReviewState />
                    </RouteWrapper>
                </Route>
                <Route exact path={routes.proposals}>
                    <RouteWrapper>
                        <ProposalsPage />
                    </RouteWrapper>
                </Route>
                <Route exact path={routes.proposalItem}>
                    <RouteWrapper>
                        <ProposalDetail />
                    </RouteWrapper>
                </Route>
                <Route exact path={routes.adminModule}>
                    <RouteWrapper>
                        <AdminModule />
                    </RouteWrapper>
                </Route>
                <Route>
                    <RouteWrapper>
                        <NotFoundPage />
                    </RouteWrapper>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
