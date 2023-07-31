import { Button, Checkbox, Collapse } from "antd";
import React, { useEffect, useState } from "react";
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
  const [checkedLists, setCheckedLists] = useState([1, 2]);
  console.log(checkedLists, "checkLists");

  const { handleSubmit, control, watch, setValue } = useForm();

  useEffect(() => {
    // Set the default values in the form using the setValue function
    setValue("permissions", checkedLists);
  }, [checkedLists, setValue]);

  const onChange = (list, key) => {
    const newCheckedLists = { ...checkedLists, [key]: list };
    console.log(newCheckedLists, "newCheckLists");
    const values = Object.values(newCheckedLists).flat();
    setCheckedLists(values);
    console.log(values, "values");
  };

  const onCheckAllChange = (e, key) => {
    const newList = e.target.checked
      ? data[key - 1].permissions.map((p) => p.id)
      : [];
    console.log(newList, "newList");
    const newCheckedLists = { ...checkedLists, [key]: newList };
    const values = Object.values(newCheckedLists).flat();
    setCheckedLists(values);
  };

  const items = data.map((item) => ({
    key: item.id,
    label: (
      <span className="flex items-center gap-4">
        <Checkbox
          indeterminate={
            checkedLists?.length > 0 &&
            checkedLists?.length < item.permissions.length
          }
          onChange={(e) => onCheckAllChange(e, item.id)}
          checked={checkedLists?.length === item.permissions.length}
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
          value={checkedLists}
          onChange={(list) => onChange(list, item.id)}
        />
      </div>
    ),
  }));

  console.log(watch("permissions"), "watch");
  console.log(checkedLists, "checkedList");

  const onSubmitHandler = (data) => {
    console.log(data, "data");
    // const values = Object.values(data.permissions).flat();
    // console.log(values, "values");
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
