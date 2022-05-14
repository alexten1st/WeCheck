import React from "react"

export default function Pagination(props) {
    let pagesBtn = []
    const generateList = () => {
        for (let index = 1; index <= props.pagesLength; index++) {
            pagesBtn.push(<button key={index} onClick={props.onNumClick} className={props.active === index ? "active": "button"} style={{margin:"0 auto", marginRight:"5px"}}>{index}</button>)
        }
        return pagesBtn
    }
    generateList()
    return (
        <div>
            <button key={"Prev"} className={"button"} onClick={props.onPrevClick} style={{margin:"0 auto", marginRight:"5px"}}>{"<"}</button>
                {pagesBtn}
            <button key={"Next"} className={"button"} onClick={props.onNextClick} style={{margin:"0 auto", marginRight:"5px"}}>{">"}</button>
        </div>
    )
}
