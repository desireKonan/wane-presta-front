import RootLayout from "@/component/layout/Layout";
import WithdrawalPendingDialog from "@/component/withdrawal/WithdrawalPendingDialog";
import WithdrawDialog from "@/component/withdrawal/WithdrawDialog";
import WithdrawReasonDialog from "@/component/withdrawal/WithdrawReasonDialog";
import Analytics from "@/extra/Analytic";
import Pagination from "@/extra/Pagination";
import Table from "@/extra/Table";
import Title from "@/extra/Title";
import { openDialog } from "@/store/dialogSlice";
import { RootStore, useAppDispatch } from "@/store/store";
import {
  getWithdrawalRequest,
  withdrawRequestDeclineUpdate,
  withdrawRequestPayUpdate,
} from "@/store/withdrawalSlice";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface withdrawal {
  provider: {
    name?: string;
  };
  createdAt?: string;
  total?: any;
  amount?: any;
  _id?: any;
  status?: any;
}

export default function Withdrawal() {
  const { defaultCurrency }: any = useSelector(
    (state: RootStore) => state?.setting
  );
  const withdrawal = useSelector((state: RootStore) => state.withdraw);


  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [status, setStatus] = useState<any>(1);
  const { dialogueType } = useSelector((state: RootStore) => state.dialogue);
  const [startDate, setStartDate] = useState("All");
  const [endDate, setEndDate] = useState("All");

  const dispatch = useAppDispatch();

  useEffect(() => {
    const payload = {
      status,
      startDate,
      endDate,
    };

    dispatch(getWithdrawalRequest(payload));
  }, [dispatch, status, startDate, endDate]);

  const withdrawType = [
    { name: "All", value: "All" },
    { name: "Pending", value: 1 },
    { name: "Paid", value: 2 },
    { name: "Declined", value: 3 },
  ];

  const handleOpenDialogue = (row: any) => {
    dispatch(openDialog({ type: "withdrawal", data: row }));
  };

  const handleOpenPendingDialogue = (row: any) => {
    dispatch(openDialog({ type: "withdrawal", data: row }));
  };

  const handleOpenWithdrawDialogue = (row: any) => {
    dispatch(openDialog({ type: "reason", data: row }));
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(1);
  };

  const WithDrawalTable = [
    {
      Header: "No",
      Cell: ({ index }: { index: any }) => (
        <span>{(page - 1) * rowsPerPage + index + 1}</span>
      ),
    },
    {
      Header: "Expert Name",
      Cell: ({ row }: { row: withdrawal }) => (
        <span className="text-capitalize">{row?.provider?.name}</span>
      ),
    },

    {
      Header: `Amount (${defaultCurrency?.symbol})`,
      Cell: ({ row }: { row: withdrawal }) => (
        <span className="text-capitalize">{row?.amount}</span>
      ),
    },

    {
      Header: "Status",
      Cell: ({ row }) =>
        row?.status === 1 ? (
          <button
            className="  m5-right p12-x p4-y fs-12 br-5 text-white"
            style={{ backgroundColor: "#ff7512" }}
          >
            Pending
          </button>
        ) : row?.status === 2 ? (
          <button className="bg-info text-white m5-right p12-x p4-y fs-12 br-5 ">
            Paid
          </button>
        ) : row?.status === 3 ? (
          <button className="bg-success text-white m5-right p12-x p4-y fs-12 br-5 ">
            Declined
          </button>
        ) : (
          ""
        ),
    },

    {
      Header: "Info",
      Cell: ({ row }) => (
        <span className="">
          <button
            className="py-1 me-2"
            style={{ backgroundColor: "#CDE7FF", borderRadius: "8px" }}
            onClick={() => handleOpenDialogue(row)}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.9996 3C7.47746 3 3 7.47746 3 12.9996C3 18.5217 7.47746 23 12.9996 23C18.5217 23 23 18.5217 23 12.9996C23 7.47746 18.5217 3 12.9996 3ZM15.0813 18.498C14.5666 18.7012 14.1568 18.8552 13.8495 18.9619C13.5048 19.0745 13.1437 19.1286 12.7812 19.1219C12.1581 19.1219 11.673 18.9695 11.3276 18.6656C10.9822 18.3617 10.8104 17.9765 10.8104 17.5084C10.8104 17.3263 10.8231 17.1401 10.8485 16.9505C10.8799 16.7345 10.9214 16.52 10.9729 16.3079L11.6171 14.0324C11.6739 13.814 11.723 13.6066 11.7619 13.4135C11.8008 13.2188 11.8195 13.0402 11.8195 12.8777C11.8195 12.5881 11.7594 12.385 11.64 12.2707C11.5189 12.1564 11.2912 12.1005 10.9517 12.1005C10.7858 12.1005 10.6148 12.1251 10.4396 12.1767C10.266 12.2301 10.1153 12.2783 9.99175 12.3257L10.1619 11.6248C10.5835 11.4529 10.9873 11.3056 11.3725 11.1837C11.7247 11.0659 12.0932 11.0036 12.4646 10.9992C13.0834 10.9992 13.5608 11.1498 13.8969 11.4478C14.2313 11.7467 14.3998 12.1352 14.3998 12.6127C14.3998 12.7117 14.3879 12.8861 14.3651 13.135C14.3452 13.3676 14.3021 13.5976 14.2364 13.8216L13.5956 16.0904C13.5381 16.2956 13.4909 16.5035 13.4542 16.7134C13.4193 16.8881 13.3986 17.0654 13.3924 17.2434C13.3924 17.5448 13.4593 17.7505 13.5947 17.8597C13.7285 17.9689 13.963 18.0239 14.2948 18.0239C14.4514 18.0239 14.6267 17.996 14.8248 17.9418C15.0212 17.8876 15.1634 17.8394 15.2531 17.7979L15.0813 18.498ZM14.9678 9.2891C14.6764 9.56388 14.2889 9.71343 13.8885 9.70561C13.4686 9.70561 13.1062 9.56677 12.8049 9.2891C12.6615 9.16303 12.5471 9.00757 12.4692 8.8333C12.3913 8.65902 12.3519 8.47002 12.3537 8.27915C12.3537 7.8855 12.506 7.54688 12.8049 7.26667C13.0969 6.9897 13.4861 6.83859 13.8885 6.84593C14.3092 6.84593 14.6698 6.98561 14.9678 7.26667C15.2667 7.54688 15.4165 7.8855 15.4165 8.27915C15.4165 8.6745 15.2667 9.01143 14.9678 9.2891Z"
                fill="#0C7FE9"
              />
            </svg>
          </button>
        </span>
      ),
    },

  

    {
      Header: "CreatedAt",
      Cell: ({ row }: { row: withdrawal }) => (
        <span className="text-capitalize">{row?.createdAt?.split("T")[0]}</span>
      ),
    },
  ];

  const WithDrawalTablePending = [
    {
      Header: "No",
      Cell: ({ index }: { index: any }) => (
        <span>{(page - 1) * rowsPerPage + index + 1}</span>
      ),
    },
    {
      Header: "Expert Name",
      Cell: ({ row }: { row: withdrawal }) => (
        <span className="text-capitalize">{row?.provider?.name}</span>
      ),
    },

    {
      Header: `Amount (${defaultCurrency?.symbol})`,
      Cell: ({ row }: { row: withdrawal }) => (
        <span className="text-capitalize">{row?.amount}</span>
      ),
    },

    {
      Header: "Status",
      Cell: ({ row }) =>
        row?.status === 1 ? (
          <button
            className="  m5-right p12-x p4-y fs-12 br-5 text-white"
            style={{ backgroundColor: "#ff7512" }}
          >
            Pending
          </button>
        ) : row?.status === 2 ? (
          <button className="bg-info text-white m5-right p12-x p4-y fs-12 br-5 ">
            Paid
          </button>
        ) : row?.status === 3 ? (
          <button className="bg-success text-white m5-right p12-x p4-y fs-12 br-5 ">
            Declined
          </button>
        ) : (
          ""
        ),
    },

    {
      Header: "Info",
      Cell: ({ row }) => (
        <span className="">
          <button
            className="py-1 me-2"
            style={{ backgroundColor: "#CDE7FF", borderRadius: "8px" }}
            onClick={() => handleOpenDialogue(row)}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.9996 3C7.47746 3 3 7.47746 3 12.9996C3 18.5217 7.47746 23 12.9996 23C18.5217 23 23 18.5217 23 12.9996C23 7.47746 18.5217 3 12.9996 3ZM15.0813 18.498C14.5666 18.7012 14.1568 18.8552 13.8495 18.9619C13.5048 19.0745 13.1437 19.1286 12.7812 19.1219C12.1581 19.1219 11.673 18.9695 11.3276 18.6656C10.9822 18.3617 10.8104 17.9765 10.8104 17.5084C10.8104 17.3263 10.8231 17.1401 10.8485 16.9505C10.8799 16.7345 10.9214 16.52 10.9729 16.3079L11.6171 14.0324C11.6739 13.814 11.723 13.6066 11.7619 13.4135C11.8008 13.2188 11.8195 13.0402 11.8195 12.8777C11.8195 12.5881 11.7594 12.385 11.64 12.2707C11.5189 12.1564 11.2912 12.1005 10.9517 12.1005C10.7858 12.1005 10.6148 12.1251 10.4396 12.1767C10.266 12.2301 10.1153 12.2783 9.99175 12.3257L10.1619 11.6248C10.5835 11.4529 10.9873 11.3056 11.3725 11.1837C11.7247 11.0659 12.0932 11.0036 12.4646 10.9992C13.0834 10.9992 13.5608 11.1498 13.8969 11.4478C14.2313 11.7467 14.3998 12.1352 14.3998 12.6127C14.3998 12.7117 14.3879 12.8861 14.3651 13.135C14.3452 13.3676 14.3021 13.5976 14.2364 13.8216L13.5956 16.0904C13.5381 16.2956 13.4909 16.5035 13.4542 16.7134C13.4193 16.8881 13.3986 17.0654 13.3924 17.2434C13.3924 17.5448 13.4593 17.7505 13.5947 17.8597C13.7285 17.9689 13.963 18.0239 14.2948 18.0239C14.4514 18.0239 14.6267 17.996 14.8248 17.9418C15.0212 17.8876 15.1634 17.8394 15.2531 17.7979L15.0813 18.498ZM14.9678 9.2891C14.6764 9.56388 14.2889 9.71343 13.8885 9.70561C13.4686 9.70561 13.1062 9.56677 12.8049 9.2891C12.6615 9.16303 12.5471 9.00757 12.4692 8.8333C12.3913 8.65902 12.3519 8.47002 12.3537 8.27915C12.3537 7.8855 12.506 7.54688 12.8049 7.26667C13.0969 6.9897 13.4861 6.83859 13.8885 6.84593C14.3092 6.84593 14.6698 6.98561 14.9678 7.26667C15.2667 7.54688 15.4165 7.8855 15.4165 8.27915C15.4165 8.6745 15.2667 9.01143 14.9678 9.2891Z"
                fill="#0C7FE9"
              />
            </svg>
          </button>
        </span>
      ),
    },
    
      {
        Header: "Action",
        Cell: ({ row }: { row: withdrawal }) =>
          row?.status !== 1 ? null : (
            <span className="text-capitalize">
              {row?.status === 1 && (
                <>
                  <button
                    className="py-1 me-3"
                    style={{ backgroundColor: "#CFF3FF", borderRadius: "8px" }}
                    onClick={() => {
                  
                      dispatch(
                        openDialog({ type: "withdrawalpendingdialog", data: row })
                      );
                    }}
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
                    onClick={() => handleOpenWithdrawDialogue(row)}
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
                </>
              )}
            </span>
          ),
      },   
    {
      Header: "CreatedAt",
      Cell: ({ row }: { row: withdrawal }) => (
        <span className="text-capitalize">{row?.createdAt?.split("T")[0]}</span>
      ),
    },
  ];

  return (
    <div className="mainExpert">
      <Title name="Withdrawal" />

      {(dialogueType === "withdrawaldialog" ||
        dialogueType === "withdrawalpendingdialog") && (
        <WithdrawalPendingDialog />
      )}

      {dialogueType == "withdrawal" ? (
        <WithdrawDialog />
      ) : dialogueType == "reason" || dialogueType == "reasondialog" ? (
        <WithdrawReasonDialog />
      ) : (
        ""
      )}
      <div className="d-flex justify-content-between flex-wrap">
        <div className="inputData">
          <label className="styleForTitle" htmlFor="bookingType">
            Withdraw type
          </label>
          <div
            className="my-2"
            style={{
              maxWidth: "340px",
              border: "1px solid #1c2b20",
              padding: "4px",
              borderRadius: "40px",
            }}
          >
            {/* <button
              type="button"
              className={`${status === "All" ? "activeBtn" : "disabledBtn"}`}
              onClick={() => setStatus("All")}
            >
              All
            </button> */}
            <button
              type="button"
              className={`${status === 1 ? "activeBtn" : "disabledBtn"}`}
              onClick={() => setStatus(1)}
            >
              Pending
            </button>
            <button
              type="button"
              className={`${status === 2 ? "activeBtn" : "disabledBtn"} ms-1`}
              onClick={() => setStatus(2)}
            >
              Accepted
            </button>

            <button
              type="button"
              className={`${status === 3 ? "activeBtn" : "disabledBtn"} ms-1`}
              onClick={() => setStatus(3)}
            >
              Declined
            </button>
          </div>
        </div>

        <div>
          <div className="inputData">
            <label>Analytic</label>
          </div>
          <div className="mt-3">
            <Analytics
              analyticsStartDate={startDate}
              analyticsStartEnd={endDate}
              analyticsStartDateSet={setStartDate}
              analyticsStartEndSet={setEndDate}
            />
          </div>
        </div>
      </div>
      <div>
        {status !== 1 ? (
          <Table
            data={withdrawal?.withDrawal}
            mapData={WithDrawalTable}
            PerPage={rowsPerPage}
            Page={page}
            type={"client"}
          />
        ) : (
          <Table
            data={withdrawal?.withDrawal}
            mapData={WithDrawalTablePending}
            PerPage={rowsPerPage}
            Page={page}
            type={"client"}
          />
        )}
      </div>

      <div>
        <Pagination
          type={"server"}
          serverPage={page}
          setServerPage={setPage}
          serverPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          totalData={withdrawal?.withDrawal?.length}
        />
      </div>
    </div>
  );
}

Withdrawal.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};
