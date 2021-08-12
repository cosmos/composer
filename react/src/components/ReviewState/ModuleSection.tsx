import React from "react";

interface ModuleSectionProps {
    title: string;
    children: JSX.Element[] | JSX.Element;
}

const ModuleSection = ({ title, children }: ModuleSectionProps): JSX.Element => {
    return (
        <div className="review-changes__module-container">
            <div className="review-changes__module-container__title">{title}</div>
            {children}
        </div>
    );
};

export default ModuleSection;
