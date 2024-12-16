import React, { useEffect, useState } from "react";
import RootLayout from "@/component/layout/Layout";
import { useSelector } from "react-redux";
import { RootStore, useAppDispatch } from "@/store/store";
import {
  getExpertSuggestion,
  getUserSuggestion,
} from "@/store/suggestionSlice";
import Pagination from "@/extra/Pagination";
import Table from "@/extra/Table";
import Title from "@/extra/Title";
import { baseURL } from "@/utils/config";

interface suggestion {
  provider: {
    name?: string;
    profileImage: any;
  };

  customer: {
    name: string;
    profileImage: any;
  };

  details?: string;
  createdAt?: string;
}

const Suggestion = () => {
  const dispatch = useAppDispatch();
  const { expertSuggestion, userSuggestion } = useSelector(
    (state: RootStore) => state.suggestion
  );
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [type, setType] = useState<number>(2);

  useEffect(() => {
    const payload = {
      type,
      start: page,
      limit: rowsPerPage,
    };

    if (type == 1) {
      dispatch(getExpertSuggestion(payload));
    } else {
      dispatch(getUserSuggestion(payload));
    }
  }, [dispatch, type, page, rowsPerPage]);

  const handleChangePage = (newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(1);
  };

  const suggestionExpertTable = [
    {
      Header: "No",
      Cell: ({ index }: { index: any }) => (
        <span>{(page - 1) * rowsPerPage + index + 1}</span>
      ),
    },

    {
      Header: "Image",
      Cell: ({ row }: { row: suggestion }) => (
        <div>
          <img
            src={baseURL + '/' + row?.customer?.profileImage}
            width="70px"
            height="70px"
            alt={`Profile-Image`}
            style={{objectFit : "contain"}}
          />
        </div>
      ),
    },

    {
      Header: "Name",
      Cell: ({ row }: { row: suggestion }) => (
        <span className="text-capitalize" style={{ width: "200px" }}>
          {row?.customer?.name}
        </span>
      ),
    },


    {
      Header: "Details",
      Cell: ({ row }: { row: suggestion }) => (
        <span className="text-capitalize">{row?.details}</span>
      ),
    },
    {
      Header: "CreatedAt",
      Cell: ({ row }: { row: suggestion }) => (
        <span className="text-capitalize">
          {row?.createdAt?.split("T")[0]}
        </span>
      ),
    },
  ];

  const suggestionUserTabel = [
    {
      Header: "No",
      Cell: ({ index }: { index: any }) => (
        <span>{(page - 1) * rowsPerPage + index + 1}</span>
      ),
    },
    {
      Header: "Image",
      Cell: ({ row }: { row: suggestion }) => (
        <div>
          <img
            src={baseURL + row?.provider?.profileImage}
            width="70px"
            height="70px"
            alt={`Profile-Image`}
            style={{objectFit : "contain"}}
          />
        </div>
      ),
    },

    {
      Header: "Name",
      Cell: ({ row }: { row: suggestion }) => (
        <span className="text-capitalize" style={{ width: "200px" }}>
          {row?.provider?.name}
        </span>
      ),
    },
    {
      Header: "Details",
      Cell: ({ row }: { row: suggestion }) => (
        <span className="text-capitalize">{row?.details}</span>
      ),
    },
    {
      Header: "CreatedAt",
      Cell: ({ row }: { row: suggestion }) => (
        <span className="text-capitalize">
          {row?.createdAt ? row?.createdAt?.split("T")[0] : "-"}
        </span>
      ),
    },
  ];

  return (
    <div className="mainCategory">
      <Title name="Suggestion" />
      <div
        className="my-2"
        style={{
          width: "168px",
          border: "1px solid #1c2b20",
          padding: "4px",
          borderRadius: "40px",
        }}
      >
        <button
          type="button"
          className={`${type === 1 ? "activeBtn" : "disabledBtn"}`}
          onClick={() => setType(1)}
        >
          User
        </button>
        <button
          type="button"
          className={`${type === 2 ? "activeBtn" : "disabledBtn"} ms-1`}
          onClick={() => setType(2)}
        >
          Expert
        </button>
      </div>
      <div>
        {type == 1 ? (
          <>
            <Table
              data={expertSuggestion}
              mapData={suggestionExpertTable}
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
              totalData={expertSuggestion?.length}
            />
          </>
        ) : (
          <>
            <Table
              data={userSuggestion}
              mapData={suggestionUserTabel}
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
              totalData={userSuggestion?.length}
            />
          </>
        )}
      </div>
    </div>
  );
};

Suggestion.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export default Suggestion;
