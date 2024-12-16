import Pagination from "@/extra/Pagination";
import Table from "@/extra/Table";
import { openDialog } from "@/store/dialogSlice";
import {
  expertActionDeclined,
  getPendingRequest,
} from "@/store/expertSlice";
import { RootStore, useAppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RequestDialog from "./RequestDialog";
import { baseURL } from "@/utils/config";
import {  warning, warningDeclined } from "@/utils/Alert";


const PendingRequest = () => {
  const { expertPendingRequest } = useSelector(
    (state: RootStore) => state.expert
  );

  const { setting }: any = useSelector((state: RootStore) => state?.setting);

  const { dialogue, dialogueType } = useSelector(
    (state: RootStore) => state.dialogue
  );


  const router = useRouter();

  const dispatch = useAppDispatch();
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState<string | undefined>("All");
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const payload: any = {
      start: page,
      limit: rowsPerPage,
      search,
    };
    dispatch(getPendingRequest(payload));
  }, [dispatch, page, rowsPerPage, search]);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(1);
  };

    const handleActionDeclined = (id: any) => {

    const data = warningDeclined("Decline");
    data
      .then((logouts) => {
        const yes = logouts.isConfirmed;
        if (yes) {
          let payload : any = {
            id : id,
            status : 3
          }
          dispatch(expertActionDeclined(payload))
        }
      })
      .catch((err) => console.log(err));
  };


  const expertPendingRequestTable = [
    {
      Header: "No",
      Cell: ({ index }: { index: number }) => (
        <span>{(page - 1) * rowsPerPage + index + 1}</span>
      ),
    },
    {
      Header: "Image",
      Cell: ({ row }) => (
        <div className="userProfile">
          <img src={baseURL + row?.profileImage} width="70px" height="70px" alt={`Expert`} />
        </div>
      ),
    },
    {
      Header: "Name",
      Cell: ({ row }) => (
        <span className="text-capitalize fw-bold cursor">{row?.name}</span>
      ),
    },
    {
      Header: "Mobile No",
      Cell: ({ row }) => <span>{row?.mobileNumber ? row?.mobileNumber : "-"}</span>,
    },
    {
      Header: "Experience (Years)",
      Cell: ({ row }) => <span>{row?.experience ? row?.experience : "-"}</span>,
    },

    {
      Header: "Country",
      Cell: ({ row }) => <span>{row?.country}</span>,
    },

    {
      Header: "Accepted",
      Cell: ({ row }) => (
        <span>
          <button
            className="py-1 me-2"
            style={{ backgroundColor: "#CFF3FF", borderRadius: "8px" }}
            onClick={() =>
              dispatch(openDialog({ type: "pendingcomplain", data: row }))
            }
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.9999 21.4286C17.2071 21.4286 21.4284 17.2072 21.4284 12C21.4284 6.79273 17.2071 2.57141 11.9999 2.57141C6.7926 2.57141 2.57129 6.79273 2.57129 12C2.57129 17.2072 6.7926 21.4286 11.9999 21.4286Z"
                fill="#00A1F6"
                stroke="#00A1F6"
                stroke-width="2.48008"
              />
              <path
                d="M10.17 13.5432L8.22373 11.5969C7.86321 11.2364 7.26813 11.2364 6.90762 11.5969C6.5471 11.9574 6.5471 12.5525 6.90762 12.913L9.51191 15.5173C9.51193 15.5173 9.51195 15.5174 9.51197 15.5174C9.68642 15.692 9.92307 15.7902 10.1699 15.7905L10.1701 15.7905C10.417 15.7902 10.6536 15.692 10.8281 15.5174C10.8281 15.5174 10.8281 15.5173 10.8281 15.5173L16.026 10.3194C16.3866 9.95892 16.3866 9.36384 16.026 9.00332C15.6655 8.6428 15.0704 8.6428 14.7099 9.00332L10.17 13.5432Z"
                fill="white"
                stroke="white"
                stroke-width="0.248008"
              />
            </svg>
          </button>
        </span>
      ),
    },

    {
      Header: "Declined",
      Cell: ({ row }) => (
        <span>
          <button
            className="py-1"
            style={{ backgroundColor: "#FFF1F1", borderRadius: "8px" }}
            onClick={() => handleActionDeclined(row?._id)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0003 21.4286C17.2076 21.4286 21.4289 17.2072 21.4289 12C21.4289 6.79273 17.2076 2.57141 12.0003 2.57141C6.79309 2.57141 2.57178 6.79273 2.57178 12C2.57178 17.2072 6.79309 21.4286 12.0003 21.4286Z"
                fill="#F90008"
                stroke="#F90008"
                stroke-width="2.48008"
              />
              <path
                d="M15.1436 8.85696L8.85794 15.1426M8.85791 8.85693L15.1436 15.1426"
                stroke="white"
                stroke-width="2.14286"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </span>
      ),
    },
  ];

  return (
    <>
      <div>
        {dialogueType == "pendingcomplain" && <RequestDialog />}
        <Table
          data={expertPendingRequest}
          mapData={expertPendingRequestTable}
          PerPage={rowsPerPage}
          Page={page}
          type={"client"}
        />
        <Pagination
          type={"client"}
          serverPage={page}
          setServerPage={setPage}
          serverPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          totalData={expertPendingRequest?.length}
        />
      </div>
    </>
  );
};

export default PendingRequest;
