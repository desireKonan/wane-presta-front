import Pagination from "@/extra/Pagination";
import Searching from "@/extra/Searching";
import Table from "@/extra/Table";
import Title from "@/extra/Title";
import ToggleSwitch from "@/extra/TogggleSwitch";
import { openDialog } from "@/store/dialogSlice";
import { RootStore, useAppDispatch } from "@/store/store";
import { blockuser, getAllUser } from "@/store/userSlice";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import male from "../../assets/images/male.png";
import { useRouter } from "next/router";
import NotificationDialogue from "./NotificationDialogue";
import { baseURL } from "@/utils/config";

const UserTable = () => {
  const dispatch = useAppDispatch();



  const { dialogue, dialogueType } = useSelector(
    (state: RootStore) => state.dialogue
  );

  const { user, total } = useSelector((state: RootStore) => state.user);

  const router = useRouter();

  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState<string | undefined>("All");

  useEffect(() => {
    const payload: any = {
      start: page,
      limit: rowsPerPage,
      search,
    };
    dispatch(getAllUser(payload));
  }, [dispatch, search, page, rowsPerPage]);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(1);
  };

  const handleFilterData = (filteredData: any) => {
    if (typeof filteredData === "string") {
      setSearch(filteredData);
    } else {
      setData(filteredData);
    }
  };

  const handleNotify = (id: any) => {
    dispatch(openDialog({ type: "notification", data: { id, type: "user" } }));
  };
  const handleStatus = (id: any) => {

    dispatch(blockuser(id));
  };

  const handleOpenBookings = (id: any) => {
    router.push({
      pathname: "/UserBooking",
      query: { id: id?._id },
    });
  };

  const handleInfo = (id: any) => {
    router.push({
      pathname: "/UserProfile",
      query: { id: id },
    });
  };

  const userTable = [
    {
      Header: "No",
      Cell: ({ index }) => <span>{(page - 1) * rowsPerPage + index + 1}</span>,
    },
    {
      Header: "Image",
      Cell: ({ row }) => (
        <div className="userProfile">
          <img
            src={baseURL + row?.profileImage}
            alt=""
            style={{
              height: "70px",
              width: "70px",
              overflow: "hidden",
              borderRadius: "10px",
            }}
            // className="cursor-pointer"
            onClick={() => handleInfo(row._id)}
          />
        </div>
      ),
    },
    {
      Header: "Name",
      Cell: ({ row }) => (
        <span
          className="text-capitalize cursor"
            onClick={() => handleInfo(row._id)}
        >
          {row?.name ? row?.name : "-"}
        </span>
      ),
    },
    {
      Header: "Unique ID",
      Cell: ({ row }) => <span>{row?.uniqueId}</span>,
    },
    {
      Header: "Mobile No",
      Cell: ({ row }) => (
        <span>{row?.mobileNumber ? row?.mobileNumber : "-"}</span>
      ),
    },
    {
      Header: "Email",
      Cell: ({ row }) => (
        <span>{row?.email ? row?.email : "demo@demo.com"}</span>
      ),
    },
    {
      Header: "Total Appointments",
      Cell: ({ row }) => <span>{row?.totalAppointments}</span>,
    },
    {
      Header: "gender",
      Cell: ({ row }) => (
        <span className="text-capitalize">
          {row?.gender ? row?.gender : "Not Specified"}
        </span>
      ),
    },
    {
      Header: "Block",
      Cell: ({ row }) => (
        <ToggleSwitch
          value={row?.isBlock}
          onClick={() => handleStatus(row?._id)}
        />
      ),
    },
    {
      Header: "Appointments",
      Cell: ({ row }) => (
        <button
          className="py-1"
          style={{ backgroundColor: "#FFE7CF", borderRadius: "8px" }}
          onClick={() => handleOpenBookings(row)}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.9111 3H6.37786C3.9639 3 2 4.9639 2 7.37786C2 9.8035 3.98431 11.7557 6.35174 11.7557H8.31805V8.32563C8.31805 6.7895 9.56773 5.53978 11.1038 5.53978H11.1099C12.6427 5.54306 13.8897 6.79279 13.8897 8.32563V11.7557H18.9111C21.325 11.7557 23.2889 9.79181 23.2889 7.37786C23.2889 4.9639 21.325 3 18.9111 3ZM20.1499 6.76738L17.6551 9.26217C17.4116 9.50574 17.0166 9.50579 16.7731 9.26217L15.5257 8.01478C15.2821 7.7712 15.2821 7.37632 15.5257 7.13274C15.7692 6.88917 16.1641 6.88917 16.4077 7.13274L17.2141 7.9391L19.2679 5.88535C19.5114 5.64177 19.9063 5.64177 20.1499 5.88535C20.3935 6.12892 20.3935 6.52385 20.1499 6.76738Z"
              fill="#F98519"
            />
            <path
              d="M16.6573 13.5109L12.6422 13.0936V8.32557C12.6422 7.47717 11.9554 6.78894 11.107 6.78711C10.2561 6.78528 9.56528 7.47459 9.56528 8.32557V16.3055H9.55131L8.03269 15.0373C7.39215 14.5025 6.43632 14.6027 5.92073 15.2589C5.4263 15.8882 5.52177 16.7965 6.13619 17.3092L9.21863 19.8814H18.297V15.3676C18.297 14.4237 17.5939 13.6276 16.6573 13.5109ZM9.56524 22.3762C9.56524 22.7206 9.84449 22.9999 10.1889 22.9999H17.6733C18.0178 22.9999 18.297 22.7206 18.297 22.3762V21.1288H9.56524V22.3762Z"
              fill="#F98519"
            />
          </svg>
        </button>
      ),
    },
    {
      Header: "Info",
      Cell: ({ row }) => (
        <span className="">
          <button
            className="py-1"
            style={{ backgroundColor: "#EEE5FF", borderRadius: "8px" }}
            onClick={() => handleInfo(row._id)}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.5808 9.27892C18.5808 10.3064 17.7479 11.1394 16.7203 11.1394C15.6928 11.1394 14.8599 10.3064 14.8599 9.27892C14.8599 8.25142 15.6928 7.41846 16.7203 7.41846C17.7479 7.41846 18.5808 8.25142 18.5808 9.27892Z"
                fill="#7B2BFF"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.0534 3H12.9466C10.7993 2.99999 9.11646 2.99998 7.80345 3.17651C6.45951 3.3572 5.39902 3.73426 4.56664 4.56664C3.73426 5.39902 3.3572 6.45951 3.17651 7.80345C2.99998 9.11646 2.99999 10.7993 3 12.9466V13.0534C2.99999 15.2007 2.99998 16.8835 3.17651 18.1966C3.3572 19.5405 3.73426 20.601 4.56664 21.4334C5.39902 22.2658 6.45951 22.6428 7.80345 22.8235C9.11646 23 10.7993 23 12.9466 23H13.0534C15.2007 23 16.8835 23 18.1966 22.8235C19.5405 22.6428 20.601 22.2658 21.4334 21.4334C22.2658 20.601 22.6428 19.5405 22.8235 18.1966C23 16.8835 23 15.2007 23 13.0534V12.9466C23 10.7993 23 9.11646 22.8235 7.80345C22.6428 6.45951 22.2658 5.39902 21.4334 4.56664C20.601 3.73426 19.5405 3.3572 18.1966 3.17651C16.8835 2.99998 15.2007 2.99999 13.0534 3ZM5.5533 5.5533C6.08321 5.02339 6.80016 4.7193 7.98938 4.55941C9.19866 4.39683 10.7877 4.39535 13 4.39535C15.2123 4.39535 16.8013 4.39683 18.0106 4.55941C19.1998 4.7193 19.9167 5.02339 20.4467 5.5533C20.9767 6.08321 21.2807 6.80016 21.4406 7.98938C21.6032 9.19866 21.6047 10.7877 21.6047 13C21.6047 13.4188 21.6046 13.8153 21.6034 14.1911L21.3968 14.1625C18.7514 13.7962 16.3307 15.1714 15.098 17.2443C13.5078 13.221 9.30553 10.4773 4.60998 11.1515L4.39997 11.1818C4.41054 9.87434 4.44528 8.83829 4.55941 7.98938C4.7193 6.80016 5.02339 6.08321 5.5533 5.5533Z"
                fill="#7B2BFF"
              />
            </svg>
          </button>
        </span>
      ),
    },
    {
      Header: "Notification",
      Cell: ({ row }) => (
        <span className="">
          <button
            className="py-1"
            style={{ backgroundColor: "#FEF0BF", borderRadius: "8px" }}
            onClick={() => handleNotify(row._id)}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.1459 17.0942C20.5242 16.5697 20.0247 15.9157 19.6823 15.178C19.3398 14.4403 19.1627 13.6367 19.1634 12.8233V10.5C19.1634 7.5675 16.9851 5.14 14.1634 4.73333V3.83333C14.1634 3.61232 14.0756 3.40036 13.9193 3.24408C13.763 3.0878 13.5511 3 13.3301 3C13.1091 3 12.8971 3.0878 12.7408 3.24408C12.5845 3.40036 12.4967 3.61232 12.4967 3.83333V4.73333C9.67424 5.14 7.49674 7.5675 7.49674 10.5V12.8233C7.49706 13.6383 7.3191 14.4435 6.97533 15.1824C6.63156 15.9213 6.13032 16.5761 5.50674 17.1008C5.28137 17.2951 5.12074 17.5536 5.04636 17.8417C4.97197 18.1298 4.98739 18.4337 5.09054 18.7128C5.1937 18.9919 5.37966 19.2328 5.62353 19.4033C5.8674 19.5738 6.15753 19.6657 6.45507 19.6667H20.2051C21.0092 19.6667 21.6634 19.0125 21.6634 18.2083C21.6634 17.7817 21.4776 17.3783 21.1459 17.0942ZM13.3301 23C14.0501 22.999 14.7477 22.7498 15.3055 22.2944C15.8632 21.839 16.2468 21.2053 16.3917 20.5H10.2684C10.4133 21.2053 10.797 21.839 11.3547 22.2944C11.9124 22.7498 12.6101 22.999 13.3301 23Z"
                fill="#EFBB00"
              />
            </svg>
          </button>
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="mainCategory">
        <Title name="User" />
        {dialogueType == "notification" && <NotificationDialogue />}
        <div className="row">
          <div className="col-3"></div>
          <div className="col-lg-5 col-md-7  col-12 ms-auto">
            <Searching
              type={`server`}
              data={user}
              setData={setData}
              column={userTable}
              serverSearching={handleFilterData}
            />
          </div>
        </div>
        <div>
          <Table
            data={user}
            mapData={userTable}
            PerPage={rowsPerPage}
            Page={page}
            type={"server"}
          />
          <Pagination
            type={"server"}
            serverPage={page}
            setServerPage={setPage}
            serverPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            totalData={total}
          />
        </div>
      </div>
    </>
  );
};

export default UserTable;
