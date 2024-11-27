import React from 'react';
import "./styles.scss";

const IconComponent = ({ icon = null, nameToShow = "NA", selected = false }) => {

    return (
        <div className={`icon-container ${selected ? "selected" : ""}`}>
            {icon && <img src={icon} alt="icon" />}
            {!icon && 
                <div className="icon-name">
                    {nameToShow}
                </div>
            }
        </div>
    );
};

export default IconComponent;