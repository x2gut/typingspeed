import React from "react";

interface FooterCommandsProps {
    className:string;
}

const FooterCommands:React.FC<FooterCommandsProps> = ({ className }) => {
    return (
        <div className={`footer-commands transition-opacity ${className}`}>
            <div className="commands-tips max-w-64 mx-auto">
                <span className="commands-key">Tab</span> + <span className="commands-key">Enter</span> - restart test
            </div>
        </div>
    );
}

export default FooterCommands;