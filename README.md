# React table 
**This table is written with React Hooks**

- The table receives **data** and **headers**
```js
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
    name: "React1",
  }
];
```

- Each column can have sorting by changing value **sorter** in **headers**
- In the header near the checkbox, you can see **more icon** which will show a dropdown for removing 
- If you scroll down table will autogenerate fake 20 more rows





