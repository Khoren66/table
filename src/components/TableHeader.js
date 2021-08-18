import React from "react";
import {
  MoreOutlined,
  SortDescendingOutlined,
  SortAscendingOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Menu, Dropdown, Modal } from "antd";

const { confirm } = Modal;

const TableHeader = ({
  handleSort,
  checkAll,
  handleSelectAll,
  headerState,
  sortingMode,
  rowState,
  setRowState,
  onRemoveItems
}) => {

 
  const menu = (
    <Menu>
      <Menu.Item onClick={() => onRemoveItems(rowState,setRowState)} key="1">
        <a>Remove Selected</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <tr>
      <th width="15px">
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            onClick={handleSelectAll}
            defaultChecked={checkAll}
            type="checkbox"
          ></input>
          <Dropdown overlay={menu} placement="bottomLeft" arrow>
            <MoreOutlined style={{ marginLeft: "20px" }} />
          </Dropdown>
        </div>
      </th>
      {headerState &&
        headerState.map((column, index) => (
          <th width={column.width + "px"} index={index}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{column.title}</span>
              {column["sorter"] ? (
                sortingMode.mode === "asc" ? (
                  <SortAscendingOutlined
                    onClick={() => handleSort(column.dataIndex, "asc")}
                  />
                ) : (
                  <SortDescendingOutlined
                    onClick={() => handleSort(column.dataIndex, "desc")}
                  />
                )
              ) : (
                ""
              )}
            </div>
          </th>
        ))}
    </tr>
  );
};

export default TableHeader;
