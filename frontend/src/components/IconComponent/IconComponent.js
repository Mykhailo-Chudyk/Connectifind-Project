import React from 'react';
import "./styles.scss";

const IconComponent = ({ icon = null, isFaComponent = false, nameToShow, selected = false, onClick = () => {} }) => {
    /* 
    IconComponent is a versatile UI element that can display either an icon (as a Font Awesome component
    or as an image) or text when no icon is available. It supports selection states and click handlers,
    making it useful for navigation items, buttons, or category selectors.
    
    Props:
    - icon: The icon element (Font Awesome component) or image URL to display
    - isFaComponent: Boolean indicating if the icon is a Font Awesome component
    - nameToShow: Text to display when no icon is provided
    - selected: Boolean to indicate if this icon is in selected state
    - onClick: Function to execute when the icon is clicked
    */

    return (
        <div className={`icon-container ${selected ? "selected" : ""}`} onClick={onClick}>
            {icon && isFaComponent && icon}
            {icon && !isFaComponent && <img src={icon} alt="icon" /> }
            {!icon && 
                <div className="icon-name">
                    {nameToShow || ""}
                </div>
            }
        </div>
    );
};

export default IconComponent;