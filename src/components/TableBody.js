import React from 'react';

const TableBody = ({rowData,rowIndex,onItemClick,headerState, handleSelectRow}) => {
    return (
        <tr onClick ={()=>onItemClick(rowData)}>
        <td>
          <input
            value={rowData.selected}
            checked={rowData.selected}
            name={rowData.name}
            onChange={(e) =>
              handleSelectRow(e, rowData.selected, rowIndex)
            }
            type="checkbox"
          ></input>
        </td>
        {headerState &&
          headerState.map((column, index) => (
            <td> {rowData[column.dataIndex]}</td>
          ))}
      </tr>
    );
};

export default TableBody;