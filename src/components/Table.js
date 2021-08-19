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
  const [selectedRows, setSelectedRows] = useState({});
  const [headerState, setHeaderState] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [sortingMode, setSortingMode] = useState({
    mode: "asc",
    column: (headers[0] && headers[0].dataIndex) || "",
  });

  useEffect(() => {
    let res = data.reduce((o, key) => ({ ...o, [key.name]: false }), {});
    setSelectedRows(res);
    setHeaderState(headers);
  }, [data]);

  const handleSelectAll = () => {
    setCheckAll(!checkAll);
    let rows = { ...selectedRows };
    Object.entries(rows).forEach(([k, v]) => {
      !checkAll ? (rows[k] = true) : (rows[k] = false);
    });
    setSelectedRows(rows);
  };

  const handleSelectRow = (e) => {
    const { name, checked } = e.target;
    selectedRows[name] = checked;
    setSelectedRows({ ...selectedRows, [selectedRows[name]]: checked });
  };

  const handleSort = (column, mode) => {
    if (mode === "asc") {
      setSortingMode({ mode: "desc", column: column });
    } else {
      setSortingMode({ mode: "asc", column: column });
    }
    onFilter(sortingMode, column);
  };

  return (
    <div className="table-style" onScroll={(e) => onScroll(e)}>
      <table className="mytable">
        <thead>
          <TableHeader
            onRemoveItems={onRemoveItems}
            handleSort={handleSort}
            sortingMode={sortingMode}
            handleSelectAll={handleSelectAll}
            checkAll={checkAll}
            selectedRows={selectedRows}
            data={data}
            headerState={headerState}
          />
        </thead>
        <tbody>
          {data &&
            data.map((rowData, rowIndex) => (
              <TableBody
                class="tabel-body"
                rowData={rowData}
                selectedRows={selectedRows}
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
