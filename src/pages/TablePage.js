import Table from "../components/Table";
import { Typography, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const { confirm } = Modal;
const { Title } = Typography;

const headers = [
  {
    dataIndex: "name",
    title: "Name",
    width: 320,
    sorter: true,
  },
  {
    dataIndex: "rate",
    title: "Rating",
    width: 320,
    sorter: true,
  },
];

const data = [
  {
    name: "Vue",
    rate: 130,
  },
  {
    name: "Angular",
    rate: 110,
  },
  {
    name: "PHP",
    rate: 90,
  },
  {
    rate: 120,
    name: "React",
  },
];

const TablePage = () => {
  const addMoreData = (setRowState) => {
    data.push(...getMoreItems(10));
    setRowState(data)
    console.log(data,"==============");
  };
  const getMoreItems = (count, offset = Math.max.apply(Math, data.map(function(o) { return o.rate; }))+1) =>{
    
    return Array.from({ length: count }, (v, k) => k).map((k) => ({
        name: `NAME${k + offset}`,
        rate: k + offset,
        selected: false,
      }));
  }
    

  
  
 

  const handleSorting = (sortingMode, column) => {
    if (sortingMode.mode === "asc") {
      data.sort((a, b) => {
        var columnA = a[column];
        var columnB = b[column];
        if (columnA < columnB) {
          return -1;
        }
        if (columnA > columnB) {
          return 1;
        }
        return 0;
      });
    } else {
      data.sort((a, b) => {
        var columnA = a[column];
        var columnB = b[column];
        if (columnA < columnB) {
          return 1;
        }
        if (columnA > columnB) {
          return -1;
        }

        return 0;
      });
    }
  };
  const handleRemoveItems = (rowState, setRowState) => {
    console.log(setRowState, "setRowStatesetRowStatesetRowState");
    let selected = rowState.filter((el) => el.selected === true);
    console.log(selected, "selected", rowState, "rowState");
    let newRowData = rowState.filter((item) => !selected.includes(item));

    console.log(newRowData, "NEWWEWEW");
    if (selected.length > 0) {
      confirm({
        title: "Do you Want to delete these items?",
        icon: <ExclamationCircleOutlined />,
        onOk() {
          setRowState(newRowData);
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    } else {
      confirm({
        title: "No items are selected!",
        icon: <ExclamationCircleOutlined />,
        // content: "Some descriptions",
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }
  };

  const handleShowItem = (item) => {
    console.log(item, "ITTTEEEM");
  };
  return (
    <div className="table-page">
      <Title> React Table</Title>
      <Table
        headers={headers}
        data={data}
        onScroll={(setRowState)=>addMoreData(setRowState)}
        onItemClick={(item) => handleShowItem(item)}
        onFilter={(sortingMode, column) => handleSorting(sortingMode, column)}
        onRemoveItems={(items, setRowState) =>
          handleRemoveItems(items, setRowState)
        }
      />
    </div>
  );
};

export default TablePage;
