import SuggestedServiceDialogue from "@/component/SuggestedService/SuggestedServiceDialogue";
import RootLayout from "@/component/layout/Layout";
import Button from "@/extra/Button";
import Pagination from "@/extra/Pagination";
import Table from "@/extra/Table";
import Title from "@/extra/Title";
import { openDialog } from "@/store/dialogSlice";
import { RootStore, useAppDispatch } from "@/store/store";
import {
  declineSuggestedServiceRequest,
  getSuggestedServices,
} from "@/store/suggestedServiceSlice";
import {  warning } from "@/utils/Alert";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface SuggestedServiceData {
  _id: string;
  provider: string;
  name: string;
  description: string;
}

const SuggestedService = () => {
  const dispatch = useAppDispatch();


  const { suggestedService } = useSelector(
    (state: RootStore) => state.suggestedService
  );

  const { dialogue, dialogueType } = useSelector(
    (state: RootStore) => state.dialogue
  );

  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<any[]>([]);
  const [expandedDescription, setExpandedReviews] = useState({});
  const toggleReview = (index: number) => {
    setExpandedReviews((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  useEffect(() => {
    dispatch(getSuggestedServices());
  }, [dispatch]);

  useEffect(() => {
    setData(suggestedService);
  }, [suggestedService]);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(1);
  };

  const suggestedServiceTabel = [
    {
      Header: "No",
      Cell: ({ index }: { index: any }) => (
        <span>{(page - 1) * rowsPerPage + index + 1}</span>
      ),
    },
    {
      Header: "Service Name",
      Cell: ({ row }: { row: SuggestedServiceData }) => (
        <span className="text-capitalize fw-bold">{row?.name}</span>
      ),
    },
    {
      Header: "Description",
      Cell: ({ row, index }) => {
        const isExpanded = expandedDescription[index];
        const descriptionText = row?.description ? row?.description : "-";
        const previewText = descriptionText?.substring(0, 25);

        return (
          <span className="text-capitalize fw-bold">
            {isExpanded ? descriptionText : previewText}
            {descriptionText.length > 30 && (
              <span
                onClick={() => toggleReview(index)}
                className="read-more text-primary ps-1"
              >
                {isExpanded ? "Read less" : "Read more..."}
              </span>
            )}
          </span>
        );
      },
    },
    {
      Header: "Expert Name",
      Cell: ({ row }: { row: SuggestedServiceData }) => (
        <span className="text-capitalize fw-bold">{row?.provider}</span>
      ),
    },
    {
      Header: "Action",
      Cell: ({ row }: { row: SuggestedServiceData }) => (
        <span>
          <button
            className="py-1 me-3"
            style={{ backgroundColor: "#CFF3FF", borderRadius: "8px" }}
            onClick={() =>
              dispatch(openDialog({ type: "suggestedService", data: row }))
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
          <button
            className="py-1"
            style={{ backgroundColor: "#FFF1F1", borderRadius: "8px" }}
            onClick={() => handleDecline(row?._id)}
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

  const handleDecline = (id: any) => {

    const data = warning("Decline");
    data
      .then((logout: any) => {
        if (logout) {
          dispatch(declineSuggestedServiceRequest(id));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {dialogueType === "suggestedService" && <SuggestedServiceDialogue />}
      <div className="mainCategory">
        <Title name="Suggested services" />

        <div>
          <Table
            data={data}
            mapData={suggestedServiceTabel}
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
            totalData={data?.length}
          />
        </div>
      </div>
    </>
  );
};

SuggestedService.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export default SuggestedService;
