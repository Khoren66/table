import React, { useEffect, useState } from "react";
import "./table.css";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = ({
  headers,
  data,
  onScroll,
  onItemClick,
  onFilter,
  onRemoveItems,

}) => {
  const [rowState, setRowState] = useState([]);
  const [headerState, setHeaderState] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [sortingMode, setSortingMode] = useState({
    mode: "asc",
    column: (headers[0] && headers[0].dataIndex) || "",
  });

  useEffect(() => {
    data.map((o) => (o.selected = false));
    setRowState(data);
    setHeaderState(headers);

    console.log(onFilter, "onFilter");
  }, []);

  
  const handleSelectAll = () => {
    setCheckAll(!checkAll);
    rowState.map((r) => {
      if (!checkAll) {
        r.selected = true;
      } else {
        r.selected = false;
      }
    });
    setRowState(rowState);
  };

  const handleSelectRow = (e) => {
    const { name, checked } = e.target;
    rowState.map((r) => {
      if (r.name === name) {
        r.selected = checked;
      }
    });
    let newState = [...rowState];
    setRowState(newState);
  };

  const handleSort = (column, mode) => {
    console.log(column, "column");
    if (mode === "asc") {
      setSortingMode({ mode: "desc", column: column });
    } else {
      setSortingMode({ mode: "asc", column: column });
    }
    console.log(sortingMode);
    onFilter(sortingMode, column);
  };

  
  return (
    <div
      className="table-style"
      style={{ display: "flex", justifyContent: "center" }}
    >
      {console.log(rowState)}
      <table className="mytable">
        <thead onClick={()=>onScroll(setRowState)}>
          <TableHeader
          onRemoveItems={onRemoveItems}
          setRowState={setRowState}
            handleSort={handleSort}
            sortingMode={sortingMode}
            handleSelectAll={handleSelectAll}
            checkAll={checkAll}
            rowState={rowState}
            headerState={headerState}
          />
        </thead>
        <tbody>
          {rowState &&
            rowState.map((rowData, rowIndex) => (
              <TableBody
                rowData={rowData}
                rowIndex={rowIndex}
                headerState={headerState}
                handleSelectRow={handleSelectRow}
                onItemClick={onItemClick}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
