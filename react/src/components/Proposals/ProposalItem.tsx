import React from "react";
import { Proposal } from "@cosmjs/launchpad/build/lcdapi/gov";
import { NavLink } from "react-router-dom";
import { routes } from "../../router";
import { toPrettyDate } from "../../utills/toPrettyDate";

interface ProposalItemProps {
    proposal: Proposal;
}

const ProposalItem: React.FC<ProposalItemProps> = ({
    proposal: {
        id,
        submit_time,
        content: {
            type,
            value: { title }
        }
    }
}) => {
    const typeShort = (type: string): string => {
        const chainIdAndType = type.split("/");
        return chainIdAndType[1] || type;
    };
    const titleShort = (title: string): string => {
        return title.length > 70 ? `${title.substr(0, 70)}...` : title;
    };

    return (
        <tr>
            <td>{id}</td>
            <td>
                <NavLink to={`${routes.proposals}/${id}`}>{titleShort(title)}</NavLink>
            </td>
            <td>{typeShort(type)}</td>
            <td>{toPrettyDate(submit_time)}</td>
        </tr>
    );
};

export default ProposalItem;
