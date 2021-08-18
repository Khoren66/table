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
  const [rowState, setRowState] = useState(data);
  const [headerState, setHeaderState] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [sortingMode, setSortingMode] = useState({
    mode: "asc",
    column: (headers[0] && headers[0].dataIndex) || "",
  });

  useEffect(() => {
    data.map((o) => (o.selected = false));
    setHeaderState(headers);
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
    if (mode === "asc") {
      setSortingMode({ mode: "desc", column: column });
    } else {
      setSortingMode({ mode: "asc", column: column });
    }
    onFilter(sortingMode, column,setRowState);
  };

  return (
    <div
      className="table-style"
      onScroll={(e) => onScroll(e, rowState, setRowState)}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <table className="mytable">
        <thead>
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
                class="tabel-body"
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
