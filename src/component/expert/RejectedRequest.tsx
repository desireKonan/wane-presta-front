import Pagination from "@/extra/Pagination";
import Table from "@/extra/Table";
import { getRejectedRequest } from "@/store/expertSlice";
import { RootStore, useAppDispatch } from "@/store/store";
import { baseURL } from "@/utils/config";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RejectedRequest = () => {
  const { expertRejectedRequest } = useSelector(
    (state: RootStore) => state.expert
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
    setPage(1);
  };

  const expertRejectedRequestTable = [
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
          data={expertRejectedRequest}
          mapData={expertRejectedRequestTable}
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
          totalData={expertRejectedRequest?.length}
        />
      </div>
    </>
  );
};

export default RejectedRequest;
