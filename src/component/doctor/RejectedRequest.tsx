import Pagination from "@/extra/Pagination";
import Table from "@/extra/Table";
import { getRejectedRequest } from "@/store/doctorSlice";
import { RootStore, useAppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RejectedRequest = () => {
  const { doctorRejectedRequest } = useSelector(
    (state: RootStore) => state.doctor
  );
  const { defaultCurrency }: any = useSelector((state: RootStore) => state?.setting);

  const router = useRouter();

  const dispatch = useAppDispatch();
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState<string | undefined>("All");
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
  const [expandedReviews, setExpandedReviews] = useState({});
  const toggleReview = (index: number) => {
    setExpandedReviews((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  useEffect(() => {
    const payload: any = {
      start: page,
      limit: rowsPerPage,
      search,
    };
    dispatch(getRejectedRequest(payload));
  }, [dispatch, page, rowsPerPage, search]);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(0);
  };

  const doctorRejectedRequestTable = [
    {
      Header: "No",
      Cell: ({ index }: { index: number }) => (
        <span>{page * rowsPerPage + index + 1}</span>
      ),
    },
    {
      Header: "Image",
      Cell: ({ row }) => (
        <div className="userProfile">
          <img src={row?.image} width="70px" height="70px" alt={`Doctor`} />
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
      Cell: ({ row }) => <span>{row?.mobile ? row?.mobile : "-"}</span>,
    },
    {
      Header: "Clinic Name",
      Cell: ({ row }) => <span>{row?.clinicName ? row?.clinicName : "-"}</span>,
    },
    {
      Header: `Charge (${defaultCurrency?.symbol})`,
      body: "platformFee",
      Cell: ({ row }) => (
        <span className="text-capitalize fw-bold">
          {row?.charge?.toFixed()}
        </span>
      ),
      sorting: { type: "client" },
    },
    {
      Header: "Country",
      Cell: ({ row }) => <span>{row?.country}</span>,
    },

    {
      Header: "Your Self",
      Cell: ({ row, index }) => {
        const isExpanded = expandedReviews[index];
        const reviewText = row?.yourSelf;
        const previewText = reviewText?.substring(0, 30);

        return (
          <span className="text-capitalize fw-bold padding-left-2px">
            {isExpanded ? reviewText : previewText}
            {reviewText.length > 10 && (
              <span
                onClick={() => toggleReview(index)}
                className=" text-primary bg-none"
              >
                {isExpanded ? "Read less" : "Read more..."}
              </span>
            )}
          </span>
        );
      },
    },
  ];

  return (
    <>
      <div>
        <Table
          data={doctorRejectedRequest}
          mapData={doctorRejectedRequestTable}
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
          totalData={doctorRejectedRequest?.length}
        />
      </div>
    </>
  );
};

export default RejectedRequest;
