import { Button, Checkbox, Collapse } from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const data = [
  {
    id: 1,
    name: "Teacher",
    permissions: [
      {
        id: 1,
        name: "Teaching",
        description: "Teach the whole class",
      },
      {
        id: 2,
        name: "Guiding",
        description: "Guide the whole class",
      },
    ],
  },
  {
    id: 2,
    name: "Student",
    permissions: [
      {
        id: 3,
        name: "Study",
        description: "Sincerely study the books",
      },
      {
        id: 4,
        name: "Play",
        description: "Play the football",
      },
    ],
  },
];

const AntdCollapse = () => {
  const [checkedLists, setCheckedLists] = useState({
    2: [3, 4],
  });
  console.log(checkedLists, "checkLists");

  const { handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {},
  });

  const onChange = (list, key) => {
    const newCheckedLists = { ...checkedLists, [key]: list };
    console.log(newCheckedLists, "newCheckLists");
    setCheckedLists(newCheckedLists);
    setValue("permissions", newCheckedLists);
  };

  const onCheckAllChange = (e, key) => {
    const newList = e.target.checked
      ? data[key - 1].permissions.map((p) => p.id)
      : [];
    console.log(newList, "newLsit");
    const newCheckedLists = { ...checkedLists, [key]: newList };
    setCheckedLists(newCheckedLists);
    setValue("permissions", newCheckedLists);
  };

  const items = data.map((item) => ({
    key: item.id,
    label: (
      <span className="flex items-center gap-4">
        <Checkbox
          indeterminate={
            checkedLists[item.id]?.length > 0 &&
            checkedLists[item.id]?.length < item.permissions.length
          }
          onChange={(e) => onCheckAllChange(e, item.id)}
          checked={checkedLists[item.id]?.length === item.permissions.length}
        >
          {item.name}
        </Checkbox>
      </span>
    ),
    children: (
      <div>
        <Checkbox.Group
          options={item.permissions.map((perm) => ({
            label: `${perm.name} - ${perm.description}`,
            value: perm.id, // Store the ID as the value
          }))}
          value={checkedLists[item.id]}
          onChange={(list) => onChange(list, item.id)}
        />
      </div>
    ),
  }));

  console.log(watch("permissions"), "watch");

  const onSubmitHandler = (data) => {
    console.log(data, "data");
    const values = Object.values(data.permissions).flat();
    console.log(values, "values");
  };

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
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="w-full space-y-10"
      >
        <Controller
          name="permissions"
          control={control}
          render={({ field }) => {
            return (
              <Collapse
                {...field}
                className="mb-10"
                collapsible="icon"
                expandIconPosition="end"
                items={items}
              />
            );
          }}
        />
        <div className="flex justify-end">
          <Button htmlType="submit" className="flex items-center gap-2">
            Edit Permissions
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AntdCollapse;
