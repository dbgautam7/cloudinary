import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import { Tooltip } from "react-tooltip";

const data = [
  { name: "Rohit Chhetri", age: 20, address: "Parbat" },
  { name: "Bibek Basnet", age: 16, address: "Nawalparasi" },
  { name: "Osan Sharma", age: 18, address: "Gulmi" },
];

const columns = [
  {
    Header: "Name",
    accessor: (row) => row.name,
    Cell: ({ row }) => {
      const data = row.original.name;

      const splittedData = data.toString().slice(0, 4).concat("...");
      console.log(splittedData, "splittedData==18");
      /* Add data-tip */
      return (
        <>
          <a
            data-tooltip-id={row.original.name}
            data-tooltip-content={row.original.name}
            data-tooltip-variant="success"
            // data-tooltip-delay-hide={1000}
          >
            {splittedData}
          </a>
          <Tooltip id={row.original.name} />
        </>
      );
    },
  },
  {
    Header: "Age",
    accessor: "age",
    Cell: ({ row }) => {
      return (
        <>
          <span
            data-tooltip-id={row.original.age}
            data-tooltip-content={row.original.age}
            data-tooltip-variant="success"
          >
            {row.original.age}
          </span>
          <Tooltip id={row.original.age} />
        </>
      );
    },
  },
  {
    Header: "Address",
    accessor: "address",
    Cell: ({ row }) => {
      /* Add data-tip */
      return (
        <span data-tip={row.original.address}>{row.original.address}</span>
      );
    },
  },
];

const CustomTable = () => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

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
      <div>
        <Tooltip place="left" type="success" effect="solid" />
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;
