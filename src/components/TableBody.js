import React from "react";

const TableBody = ({
  rowData,
  rowIndex,
  onItemClick,
  headerState,
  selectedRows,
  handleSelectRow,
}) => {
  return (
    <tr key={rowIndex}>
      <td>
        {headerState &&
          headerState.map((column, index) =>
            selectedRows[rowData[column.dataIndex]] !== undefined ? (
              <input
                value={selectedRows[rowData[column.dataIndex]]}
                checked={selectedRows[rowData[column.dataIndex]]}
                name={rowData[column.dataIndex]}
                onChange={(e) => handleSelectRow(e, rowData.selected, rowIndex)}
                type="checkbox"
              ></input>
            ) : (
              ""
            )
          )}
      </td>
      {headerState &&
        headerState.map((column, index) => (
          <td onClick={() => onItemClick(rowData)}>
            {rowData[column.dataIndex]}
          </td>
        ))}
    </tr>
  );
};

export default TableBody;
