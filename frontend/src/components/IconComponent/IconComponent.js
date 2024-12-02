import React from 'react';
import "./styles.scss";

const IconComponent = ({ icon = null, isFaComponent = false, nameToShow, selected = false, onClick = () => {} }) => {

    return (
        <div className={`icon-container ${selected ? "selected" : ""}`} onClick={onClick}>
            {icon && isFaComponent && icon}
            {icon && !isFaComponent && <img src={icon} alt="icon" /> }
            {!icon && 
                <div className="icon-name">
                    {nameToShow || "NA"}
                </div>
            }
        </div>
    );
};

export default IconComponent;