import { Checkbox, Collapse } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const data = [
  {
    id: 1,
    name: "Teacher",
    permission: [
      {
        name: "Teaching",
        description: "Teach the whole class",
      },
      {
        name: "Guiding",
        description: "Guide the whole class",
      },
    ],
  },
  {
    id: 2,
    name: "Student",
    permission: [
      {
        name: "Study",
        description: "Sincerely study the books",
      },
      {
        name: "Play",
        description: "Play the football",
      },
    ],
  },
];

const AntdCollapse = () => {
  const [checkedLists, setCheckedLists] = useState({});
  console.log(checkedLists, "checkLists11111");

  const onChange = (list, key) => {
    console.log(list, "======40", key);
    const newCheckedLists = { ...checkedLists, [key]: list };
    console.log(newCheckedLists, "newCheckliost");
    setCheckedLists(newCheckedLists);
  };

  const onCheckAllChange = (e, key) => {
    console.log("======46", key);
    const newList = e.target.checked
      ? data[key - 1].permission.map((p) => `${p.name} - ${p.description}`)
      : [];
    console.log(newList, "======50");

    const newCheckedLists = { ...checkedLists, [key]: newList };
    setCheckedLists(newCheckedLists);
  };

  const items = data.map((item) => ({
    key: item.id,
    label: (
      <span className="flex items-center gap-4">
        <Checkbox
          indeterminate={
            checkedLists[item.id]?.length > 0 &&
            checkedLists[item.id]?.length < item.permission.length
          }
          onChange={(e) => onCheckAllChange(e, item.id)}
          checked={checkedLists[item.id]?.length === item.permission.length}
        >
          {item.name}
        </Checkbox>
      </span>
    ),
    children: (
      <div>
        <Checkbox.Group
          options={item.permission.map(
            (perm) => `${perm.name} - ${perm.description}`
          )}
          value={checkedLists[item.id]}
          onChange={(list) => onChange(list, item.id)}
        />
      </div>
    ),
  }));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        marginTop: "100px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link to="/">Back to Home</Link>
      <Collapse collapsible="icon" expandIconPosition="end" items={items} />
    </div>
  );
};

export default AntdCollapse;
