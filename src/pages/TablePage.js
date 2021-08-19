import React, { useState } from "react";
import Table from "../components/Table";
import { Typography, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
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
    name: "Ruby",
    rate: 90,
  },
  {
    rate: 120,
    name: "React",
  },
  {
    name: "Vue1",
    rate: 130,
  },
  {
    name: "Angular1",
    rate: 110,
  },
  {
    name: "PHP1",
    rate: 90,
  },
  {
    rate: 120,
    name: "Reac1",
  },
  {
    name: "Vue2",
    rate: 130,
  },
  {
    name: "Angular2",
    rate: 110,
  },
  {
    name: "PHP2",
    rate: 90,
  },
  {
    rate: 120,
    name: "React2",
  },
  {
    rate: 120,
    name: "Reac3",
  },
];

const TablePage = () => {
  const [dataRow, setDataRow] = useState(data);

  const getMoreItems = (count, offset = 1) => {
    return Array.from({ length: count }, (v, k) => k).map((k) => ({
      name: `NAME${k + offset}`,
      rate: k + offset,
    }));
  };

  const handleSorting = (sortingMode, column) => {
    let notSorted = [...dataRow];
    let sorted = notSorted.sort((a, b) => {
      if (a[column] < b[column]) {
        return sortingMode.mode === "asc" ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return sortingMode.mode === "asc" ? 1 : -1;
      }
      return 0;
    });
    setDataRow(sorted);
  };
  const handleRemoveItems = (items) => {
    let selected = dataRow.filter((el) => items[el.name] === true);
    let newDataRow = dataRow.filter((item) => !selected.includes(item));
    confirm({
      title: [
        selected.length > 0
          ? "Do you Want to delete these items?"
          : "No items are selected!",
      ],
      icon: <ExclamationCircleOutlined />,
      onOk() {
        return selected.length > 0 ? setDataRow(newDataRow) : "";
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const fetchMoreData = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      let array = [...dataRow];
      const offset =
        Math.max.apply(
          Math,
          array.map((o) => o.rate)
        ) + 1;
      const data =
        offset !== -Infinity ? getMoreItems(20, offset) : getMoreItems(20);
      console.log(data);
      setDataRow((prev) => [...prev, ...data]);
    }
  };

  const handleShowItem = (item) => {
    confirm({
      title: "Here is the item that you selected?",
      icon: <ExclamationCircleOutlined />,
      content: `(Name: ${item.name}, Rate: ${item.rate})`,
      onOk() {},
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <div className="table-page">
      <Title> React Table</Title>
      <Table
        headers={headers}
        data={dataRow}
        onScroll={(e) => fetchMoreData(e)}
        onItemClick={(item) => handleShowItem(item)}
        onFilter={(sortingMode, column) => handleSorting(sortingMode, column)}
        onRemoveItems={(items) => handleRemoveItems(items)}
      />
    </div>
  );
};

export default TablePage;
