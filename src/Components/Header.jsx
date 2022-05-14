import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEyeDropper } from "@fortawesome/free-solid-svg-icons"
import { faSort } from "@fortawesome/free-solid-svg-icons"
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons"

export default (props) => {
    const [onMouse, setOnMouse] = useState(false)
    const refButton = useRef(null);

    let menu = null;
    let sorting = null;

    const onMenuClicked = () => {
        props.showColumnMenu(refButton.current);
    };

    if (props.enableMenu) {
        menu = (
            <div
                ref={refButton}
                onClick={() => onMenuClicked()}
            >
                <FontAwesomeIcon icon={faEyeDropper} />
            </div>
        );
    }

    if (props.enableSorting && onMouse && !props.column.isSortAscending() && !props.column.isSortDescending()) {
        sorting = (
            <FontAwesomeIcon style={{ marginLeft: "5px" }} icon={faSort} />
        );
    }

    if (props.enableSorting && props.column.isSortAscending()) {
        sorting = (
            <FontAwesomeIcon style={{ marginLeft: "5px", color: "green" }} icon={faSortUp} />
        );
    }

    if (props.enableSorting && props.column.isSortDescending()) {
        sorting = (
            <FontAwesomeIcon style={{ marginLeft: "5px", color: "green" }} icon={faSortDown} />
        );
    }

    const onMouseOver = () => {
        setOnMouse(true)
    }
    const onMouseOut = () => {
        setOnMouse(false)
    }
    const onSortClicked = (event) => {
        if(props.enableSorting){
            props.progressSort(event.target);
        }
    };
    return (
        <div onMouseOver={onMouseOver} onMouseOut={onMouseOut} style={{ display: "flex", justifyContent: "space-between" }}>
            {sorting}
            <div onClick={onSortClicked} style={{ marginRight: "6px" }} className="customHeaderLabel">{props.displayName}</div>
            {menu}
        </div>
    );
};