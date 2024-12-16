import React, { useState } from "react";

export default function Searching(props: any) {
  const [search, setSearch] = useState("");
  const { data, setData, type, serverSearching, button } = props;

  const handleSearch = (event: any) => {
    event.preventDefault();

    let searchValue = search ? search : event?.target?.value?.toLowerCase();
    if (type === "client") {
      if (searchValue) {
        const filteredData = data.filter((item: any) => {
          return Object.keys(item).some((key) => {
            if (key === "_id" || key === "updatedAt" || key === "createdAt") {
              return false;
            }
            const itemValue = item[key];
            if (typeof itemValue === "string") {
              return itemValue.toLowerCase().indexOf(searchValue) > -1;
            } else if (typeof itemValue === "number") {
              return itemValue.toString().indexOf(searchValue) > -1;
            }
            return false;
          });
        });
        setData(filteredData);
      } else {
        setData(data);
      }
    } else {
      serverSearching(searchValue);
    }
  };

  return (
    <>
      <>
        <div className="col-7 ms-auto">
          <div className="inputData d-flex">
            <input
              type="search"
              id="search"
              placeholder="Searching for..."
              className="bg-none m0-top"
              style={{ fontWeight: "500", height: "48px" }}
              onChange={
                button
                  ? (e) => setSearch(e.target.value)
                  : (e) => handleSearch(e)
              }
            />
            <div
              className="bg-theme p15-x midBox searchIcon"
              style={{ height: "48px" }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5 9C20.6421 9 24 12.3579 24 16.5M24.9882 24.9823L31.5 31.5M28.5 16.5C28.5 23.1275 23.1275 28.5 16.5 28.5C9.87258 28.5 4.5 23.1275 4.5 16.5C4.5 9.87258 9.87258 4.5 16.5 4.5C23.1275 4.5 28.5 9.87258 28.5 16.5Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
