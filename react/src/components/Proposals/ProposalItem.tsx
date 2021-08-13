import React from "react";
import { Proposal } from "@cosmjs/launchpad/build/lcdapi/gov";
import { NavLink } from "react-router-dom";
import { routes } from "../../router";
import { toPrettyDate } from "../../utills/toPrettyDate";
import { ArchivedProposal } from "../../types/proposal";

interface ProposalItemProps {
    proposal: ArchivedProposal;
}

const ProposalItem: React.FC<ProposalItemProps> = ({
    proposal: { proposal_id, submit_time, content }
}) => {
    const typeShort = (type: string): string => {
        const chainIdAndType = type.split(".");
        return chainIdAndType[chainIdAndType.length - 1] || type;
    };
    const titleShort = (title: string): string => {
        return title.length > 70 ? `${title.substr(0, 70)}...` : title;
    };

    return (
        <tr>
            <td>{proposal_id}</td>
            <td>
                <NavLink to={`${routes.proposals}/${proposal_id}`}>
                    {titleShort(content.title)}
                </NavLink>
            </td>
            <td>{typeShort(content["@type"])}</td>
            <td>{toPrettyDate(submit_time)}</td>
        </tr>
    );
};

export default ProposalItem;
