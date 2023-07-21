import { Button, Checkbox, Collapse } from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const data = [
  {
    id: 1,
    name: "Teacher",
    permission: [
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
    permission: [
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
  const [checkedLists, setCheckedLists] = useState({});

  const onChange = (list, key) => {
    setCheckedLists((prevCheckedLists) => ({
      ...prevCheckedLists,
      [key]: list,
    }));
  };

  const onCheckAllChange = (e, key) => {
    const newList = e.target.checked
      ? data[key - 1].permission.map((p) => p.id)
      : [];
    setCheckedLists((prevCheckedLists) => ({
      ...prevCheckedLists,
      [key]: newList,
    }));
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
          options={item.permission.map((perm) => ({
            label: `${perm.name} - ${perm.description}`,
            value: perm.id,
          }))}
          value={checkedLists[item.id]}
          onChange={(list) => onChange(list, item.id)}
        />
      </div>
    ),
  }));

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {},
  });

  const onSubmitHandler = (data) => {
    // Flatten the selected permission IDs into a single array
    let permissionIds = [];
    Object.keys(data.permissions).forEach((category) => {
      const permissions = data.permissions[category];
      const trueKeys = Object.keys(permissions).filter(
        (key) => permissions[key] === true
      );
      permissionIds = [...permissionIds, ...trueKeys];
    });
    const permissionIdsInt = permissionIds.map((str) => Number(str));

    // Update the form data with the selected permission IDs
    setValue("permissions", permissionIdsInt);
    console.log(permissionIdsInt, "permissionIdsInt");
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

// import { useEffect, useState } from "react";

// const App = () => {
//   const [first, setFirst] = useState("");
//   console.log(first, "first");
//   const handleSubmit = () => {
//     console.log("form submitted ✅");
//   };

//   useEffect(() => {
//     const keyDownHandler = (event) => {
//       console.log("User pressed: ", event.key);

//       console.log(event.target.value, "event");
//       if (event.key === "Enter") {
//         event.preventDefault();
//         handleSubmit();
//         setFirst("");
//       }
//     };

//     document.addEventListener("keydown", keyDownHandler);

//     return () => {
//       document.removeEventListener("keydown", keyDownHandler);
//     };
//   }, [first]);

//   return (
//     <div>
//       <form>
//         <input
//           type="text"
//           id="first"
//           name="first"
//           value={first}
//           onChange={(event) => setFirst(event.target.value)}
//           autoComplete="off"
//         />
//       </form>
//     </div>
//   );
// };

// export default App;

// export default function App() {
//   const inputRef = useRef(null);

//   const [updated, setUpdated] = useState("");
//   console.log(updated, "updated");

//   const handleKeyDown = async (event) => {
//     if (event.key === "Enter") {
//       const message = inputRef.current.value;
//       setUpdated(message);
//       inputRef.current.value = "";

//       try {
//         const response = await fetch("YOUR_API_ENDPOINT_URL", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ message }),
//         });

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         // Do something with the successful response, if needed.
//       } catch (error) {
//         // Handle errors from the fetch request.
//         console.error("Error posting data:", error);
//       }
//     }
//   };

//   return (
//     <div>
//       <input
//         ref={inputRef}
//         type="text"
//         id="message"
//         name="message"
//         onKeyDown={handleKeyDown}
//       />
//     </div>
//   );
// }
