import { Checkbox, Collapse } from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

// const data = [
//   {
//     id: 1,
//     name: "Teacher",
//     permission: [
//       {
//         id: 1,
//         name: "Teaching",
//         description: "Teach the whole class",
//       },
//       {
//         id: 2,
//         name: "Guiding",
//         description: "Guide the whole class",
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Student",
//     permission: [
//       {
//         id: 3,
//         name: "Study",
//         description: "Sincerely study the books",
//       },
//       {
//         id: 4,
//         name: "Play",
//         description: "Play the football",
//       },
//     ],
//   },
// ];

const data = [
  {
    id: 6,
    name: "Assignments",
    permissions: [
      {
        id: 33,
        name: "Create Assignment",
        description: "",
        url: {
          id: 33,
          path: "/assignment/create/",
        },
      },
      {
        id: 34,
        name: "View Assignments",
        description: "",
        url: {
          id: 34,
          path: "/assignment/list/",
        },
      },
      {
        id: 35,
        name: "Update Assignment",
        description: "",
        url: {
          id: 35,
          path: "/assignment/update/",
        },
      },
      {
        id: 36,
        name: "Delete Assignment",
        description: "",
        url: {
          id: 36,
          path: "/assignment/delete/",
        },
      },
      {
        id: 37,
        name: "Assign Assignment",
        description: "",
        url: {
          id: 37,
          path: "/assignment/assign/",
        },
      },
      {
        id: 38,
        name: "View Student Assignment",
        description: "",
        url: {
          id: 38,
          path: "/assignment/student-list/",
        },
      },
      {
        id: 39,
        name: "View Assignment Details",
        description: "",
        url: {
          id: 39,
          path: "/assignment/detail/",
        },
      },
      {
        id: 40,
        name: "Submit Assignment",
        description: "",
        url: {
          id: 40,
          path: "/assignment/submit/",
        },
      },
      {
        id: 41,
        name: "Delete Assignment File",
        description: "",
        url: {
          id: 41,
          path: "/assignment/delete-file/",
        },
      },
      {
        id: 42,
        name: "Grade Assignment",
        description: "",
        url: {
          id: 42,
          path: "/assignment/grade/",
        },
      },
      {
        id: 43,
        name: "Reassign Assignment to Student",
        description: "",
        url: {
          id: 43,
          path: "/assignment/reassign/",
        },
      },
      {
        id: 44,
        name: "Add Comment in Assignment",
        description: "",
        url: {
          id: 44,
          path: "/assignment/comment/",
        },
      },
    ],
  },
  {
    id: 7,
    name: "Roles and Permissions",
    permissions: [
      {
        id: 13,
        name: "View Roles",
        description: "",
        url: {
          id: 13,
          path: "/role/list/",
        },
      },
      {
        id: 28,
        name: "Update User Permissions",
        description: "",
        url: {
          id: 28,
          path: "/user/assign-permissions/",
        },
      },
    ],
  },
  {
    id: 1,
    name: "Staff",
    permissions: [
      {
        id: 2,
        name: "Create User",
        description: "",
        url: {
          id: 2,
          path: "/user/create/",
        },
      },
      {
        id: 3,
        name: "View Users",
        description: "",
        url: {
          id: 3,
          path: "/user/list/",
        },
      },
      {
        id: 4,
        name: "Update User",
        description: "",
        url: {
          id: 4,
          path: "/user/update/",
        },
      },
      {
        id: 5,
        name: "Upload Profile Image",
        description: "",
        url: {
          id: 5,
          path: "/user/upload-profile-image/",
        },
      },
      {
        id: 6,
        name: "Update User Status",
        description: "",
        url: {
          id: 6,
          path: "/user/toggle-status/",
        },
      },
      {
        id: 7,
        name: "View Profile",
        description: "",
        url: {
          id: 7,
          path: "/user/profile/",
        },
      },
      {
        id: 8,
        name: "Change Password",
        description: "",
        url: {
          id: 8,
          path: "/user/change-password/",
        },
      },
    ],
  },
  {
    id: 2,
    name: "Student",
    permissions: [
      {
        id: 9,
        name: "Create Student",
        description: "",
        url: {
          id: 9,
          path: "/student/create/",
        },
      },
      {
        id: 10,
        name: "View Student",
        description: "",
        url: {
          id: 10,
          path: "/student/list/",
        },
      },
      {
        id: 11,
        name: "Update Student",
        description: "",
        url: {
          id: 11,
          path: "/student/update/",
        },
      },
      {
        id: 12,
        name: "Update Student Status",
        description: "",
        url: {
          id: 12,
          path: "/student/toggle-status/",
        },
      },
    ],
  },
  {
    id: 3,
    name: "Section",
    permissions: [
      {
        id: 14,
        name: "Create Section",
        description: "",
        url: {
          id: 14,
          path: "/section/create/",
        },
      },
      {
        id: 15,
        name: "View Sections",
        description: "",
        url: {
          id: 15,
          path: "/section/list/",
        },
      },
      {
        id: 16,
        name: "Update Section",
        description: "",
        url: {
          id: 16,
          path: "/section/update/",
        },
      },
      {
        id: 18,
        name: "View Grade Sections",
        description: "",
        url: {
          id: 18,
          path: "/section/grade/",
        },
      },
      {
        id: 19,
        name: "Assign Teacher To Section",
        description: "",
        url: {
          id: 19,
          path: "/section/assign-teacher/",
        },
      },
      {
        id: 20,
        name: "Remove Teacher From Section",
        description: "",
        url: {
          id: 20,
          path: "/section/remove-teacher/",
        },
      },
      {
        id: 21,
        name: "View Sections Assigned To Teacher",
        description: "",
        url: {
          id: 21,
          path: "/section/teacher",
        },
      },
      {
        id: 22,
        name: "Assign Student To Section",
        description: "",
        url: {
          id: 22,
          path: "/section/assign-student/",
        },
      },
      {
        id: 23,
        name: "Remove Student From Section",
        description: "",
        url: {
          id: 23,
          path: "/section/remove-student/",
        },
      },
      {
        id: 24,
        name: "View Sections Assigned To Student",
        description: "",
        url: {
          id: 24,
          path: "/section/student/",
        },
      },
      {
        id: 25,
        name: "Assign Course To Section",
        description: "",
        url: {
          id: 25,
          path: "/section/assign-course/",
        },
      },
      {
        id: 26,
        name: "Remove Course From Section",
        description: "",
        url: {
          id: 26,
          path: "/section/remove-course/",
        },
      },
    ],
  },
  {
    id: 4,
    name: "Course",
    permissions: [
      {
        id: 30,
        name: "Course List",
        description: "",
        url: {
          id: 30,
          path: "/course/list/",
        },
      },
      {
        id: 31,
        name: "Course Details",
        description: "",
        url: {
          id: 31,
          path: "/course/details/",
        },
      },
    ],
  },
  {
    id: 5,
    name: "Grade",
    permissions: [
      {
        id: 29,
        name: "Grade List",
        description: "",
        url: {
          id: 29,
          path: "/school/grades/",
        },
      },
    ],
  },
];

data.sort((a, b) => {
  return a.id - b.id || a.name.localeCompare(b.name);
});

const AntdCollapse = () => {
  const [checkedLists, setCheckedLists] = useState({});
  console.log(checkedLists, "checkLists11111");

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {},
  });

  const onCheckChange = (list, key) => {
    console.log(list, key, "===31");
    const newCheckedLists = { ...checkedLists, [key]: list };
    console.log(newCheckedLists, "newCheckLists");
    setCheckedLists(newCheckedLists);
    setValue("permissions", newCheckedLists);
  };
  const onCheckAllChange = (e, key) => {
    const newList = e.target.checked
      ? data[key - 1]?.permissions.map((p) => p.id)
      : [];
    console.log(newList, "newList");
    const newCheckedLists = { ...checkedLists, [key]: newList };
    setCheckedLists(newCheckedLists);
    setValue("permissions", newCheckedLists);
  };

  const items =
    data &&
    data?.map((item) => ({
      key: item.id,
      label: (
        <div
          className="flex items-center w-min"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Checkbox
            indeterminate={
              checkedLists[item.id]?.length &&
              checkedLists[item.id]?.length < item.permissions?.length
            }
            onChange={(e) => {
              onCheckAllChange(e, item.id);
            }}
            checked={
              checkedLists[item.id]?.length === item?.permissions?.length
            }
          >
            <p className="text-cyan ml-2 whitespace-nowrap">{item.name}</p>
          </Checkbox>
        </div>
      ),
      children: (
        <Checkbox.Group
          className="flex flex-col ml-4 gap-2"
          options={item?.permissions?.map((perm) => ({
            label: (
              <p className="ml-2">{`${perm.name} - ${perm?.description}`}</p>
            ),
            value: perm.id,
          }))}
          value={checkedLists[item.id]}
          onChange={(list) => onCheckChange(list, item.id)}
        />
      ),
    }));

  const onSubmitHandler = (data) => {
    console.log(data, "data");
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
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Controller
          name="permissions"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => {
            return (
              <Collapse
                collapsible="icon"
                expandIconPosition="end"
                items={items}
              />
            );
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AntdCollapse;
