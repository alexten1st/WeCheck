import React, { useRef, useState, useCallback, useEffect, useMemo } from "react"
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { json } from "../data/data";
import Pagination from "./Pagination";
import Header from "./Header";
export default function MainComponent() {
    const [pagesState, setPagesState] = useState(1);
    const [pagesLength, setPagesLength] = useState();
    const gridRef = useRef();
    const [rowData, setRowData] = useState();

    const [columnDefs] = useState([
        { field: "name", headerName: "Название товара", sortable: false },
        { field: "inner_product_id", headerName: "Артикул ", sortable: false },
        { field: "brand_name", headerName: "Бренд", sortable: false },
        { field: "seller_name", headerName: "Продавец ", sortable: false },
        { field: "last_price", headerName: "Цена", sortable: false, },
        { field: "sold_money", headerName: "Заказы, руб", sortable: true, filter: true, headerComponentParams: { enableMenu: true }, },
        { field: "sold_number", headerName: "Заказы, шт", sortable: true, filter: true, headerComponentParams: { enableMenu: true }, suppressMenu: true },
    ]);

    const takeDataFromJson = () => {
        const rows = json.all_data.map(el => {
            return {
                "name": el.name,
                "inner_product_id": el.inner_product_id,
                "brand_name": el.brand.name,
                "seller_name": el.seller.name,
                "last_price": el.last_price,
                "sold_money": Number(el.sold_money),
                "sold_number": Number(el.sold_number),
            }
        })
        setRowData(rows)
    }

    useEffect(() => {
        if (gridRef.current.api) {
            gridRef.current.api.paginationGoToPage(pagesState - 1)
        }
    }, [pagesState])

    useEffect(() => {
        if (rowData) {
            setPagesLength(gridRef.current.api.paginationProxy.totalPages);
        }
    }, [rowData])

    const onGridReady = useCallback((params) => {
        takeDataFromJson();
        gridRef.current.api.sizeColumnsToFit();
        params.api.paginationGoToPage(pagesState)
    }, []);

    const onNumClick = (event) => {
        setPagesState(Number(event.target.innerText))

    }

    const onPrevClick = (event) => {
        if (pagesState > 1) {
            setPagesState(prev => prev - 1)

        }
    }

    const onNextClick = (event) => {
        if (pagesState < pagesLength) {
            setPagesState(prev => prev + 1)
        }
    }

    const onClickReset = useCallback(() => {
        gridRef.current.columnApi.applyColumnState({
            defaultState: { sort: null },
        });
        gridRef.current.api.setFilterModel(null);
    }, []);

    const components = useMemo(() => {
        return {
            agColumnHeader: Header,
        };
    }, []);

    return (
        <div>
            <div className="ag-theme-alpine" style={{ width: "85%", height: 230, margin: "0 auto", marginTop: "10%" }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    onGridReady={onGridReady}
                    pagination={true}
                    paginationPageSize={4}
                    suppressPaginationPanel={true}
                    components={components}
                // defaultColDef={defaultColDef} 
                // animateRows={true} 
                // rowSelection="multiple"
                // onCellClicked={cellClickedListener}
                />
                <div style={{ padding: "5px", position: "realative", marginLeft: "50%", display: "flex", justifyContent: "space-between" }}>
                    {<Pagination pagesLength={pagesLength} active={pagesState} onNumClick={onNumClick} onPrevClick={onPrevClick} onNextClick={onNextClick} />}
                    <button className="resetSpan" style={{ marginRight: "180px" }} onClick={onClickReset}>Сбросить</button>
                </div>

            </div>
        </div>
    )
}
