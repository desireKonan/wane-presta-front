import { isSkeleton } from "@/utils/allSelector";
import React, { useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";

export default function Table(props: any) {
  const roleSkeleton = useSelector(isSkeleton);
  const {
    data,
    mapData,
    Page,
    PerPage,
    onChildValue,
    className,
    id,
    thClick,
    type,
  } = props;
  const [sortColumn, setSortColumn] = useState<any>();
  const [sortOrder, setSortOrder] = useState<any>("asc");

  const handleColumnClick = (column: any) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedData =
    data?.length > 0
      ? [...data].sort((a: any, b: any) => {
          // Creating a new array using spread syntax
          const valueA = a[sortColumn];
          const valueB = b[sortColumn];

          if (valueA < valueB) {
            return sortOrder === "asc" ? -1 : 1;
          }
          if (valueA > valueB) {
            return sortOrder === "asc" ? 1 : -1;
          }
          return 0;
        })
      : data;

  const handleClick = (value: any) => {
    // Replace with your actual value
    onChildValue(value); // Invoke the callback function in the parent component
  };
  return (
    <>
      <div className="mainTable" id={id}>
        <table width="100%" className={`primeTable  ${className}`}>
          {roleSkeleton ? (
            <>
              <thead>
                <tr>
                  {mapData.map((res, i) => {
                    return (
                      <th
                        className={` ${res.thClass}`}
                        key={i}
                        // width={res.width}
                        style={{ minWidth: res.width ? res.width : "100px" }}
                      >
                        <div
                          className={`${res.thClass}`}
                          style={{ height: "20px" }}
                        ></div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {Array(6)
                  .fill(0)
                  .map((res, i) => {
                    return (
                      <>
                        <tr key={i} style={{ height: "80px" }}>
                          {mapData?.map((res, ind) => {
                            return (
                              <td key={ind}>
                                <div
                                  className="skeleton"
                                  style={{ height: "20px", width: "70%" }}
                                ></div>
                              </td>
                            );
                          })}
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </>
          ) : (
            <>
              <thead>
                <tr>
                  {mapData.map((res, i) => {
                    return (
                      <th
                        className={`text-uppercase ${res.thClass}`}
                        key={i}
                        // width={res.width}
                        onClick={res?.thClick}
                      >
                        {`${" "}${res.Header}`}
                        {res?.sorting?.type === "server" && (
                          <i
                            className="ri-expand-up-down-fill deg90 ms-1"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleClick(res.body)}
                          ></i>
                        )}
                        {res?.sorting?.type === "client" && (
                          <i
                            className="ri-expand-up-down-fill deg90 ms-1"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleColumnClick(res.body)}
                          ></i>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {sortedData?.length > 0 ? (
                  <>
                    {type === "client" && (
                      <>
                        {(PerPage > 0
                          ? 
                          (sortedData.slice(
                            (Page - 1) * PerPage,
                            Page * PerPage
                          ))
                          
                          : sortedData
                        ).map((i, k) => {
                          return (
                            <>
                              <tr key={k}>
                                {mapData?.map((res, ind) => {
                                  return (
                                    <td key={ind} className={res.tdClass}>
                                      {res.Cell ? (
                                        <res.Cell row={i} index={k} />
                                      ) : (
                                        <span>{i[res?.body]}</span>
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                            </>
                          );
                        })}
                      </>
                    )}

                    {type === "server" && (
                      <>
                        {sortedData.map((i, k) => {
                          return (
                            <>
                              <tr key={k}>
                                {mapData?.map((res, ind) => {
                                  return (
                                    <td key={ind} className={res.tdClass}>
                                      {res.Cell ? (
                                        <res.Cell row={i} index={k} />
                                      ) : (
                                        <span>{i[res?.body]}</span>
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                            </>
                          );
                        })}
                      </>
                    )}
                  </>
                ) : (
                  <tr>
                    <td colSpan={25} className="text-center">
                      No Data Found !
                    </td>
                  </tr>
                )}
              </tbody>
            </>
          )}
        </table>
      </div>
    </>
  );
}
