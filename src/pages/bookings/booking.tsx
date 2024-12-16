import CancelBooking from "@/component/booking/CancelBooking";
import CompletedBooking from "@/component/booking/CompletedBooking";
import ConfirmBooking from "@/component/booking/ConfirmBooking";
import PendingBookingDialog from "@/component/booking/PendingBookingDialog";
import RootLayout from "@/component/layout/Layout";
import Analytics from "@/extra/Analytic";
import Pagination from "@/extra/Pagination";
import Table from "@/extra/Table";
import Title from "@/extra/Title";
import { getAllBookings } from "@/store/bookingSlice";
import { openDialog } from "@/store/dialogSlice";
import { RootStore, useAppDispatch } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { baseURL } from "@/utils/config";

interface bookingData {
  _id: any;
  time: string;
  netPayableAmount: number;
  customerName: string;
  customerImage: string;
  serviceName: string;
  providerName: string;
  date: string;
  appointmentId: any;
  status: number;
}

const Booking = () => {
  const { defaultCurrency }: any = useSelector((state: RootStore) => state?.setting);
  const booking = useSelector((state: RootStore) => state?.booking);
  const { dialogueType } = useSelector((state: RootStore) => state.dialogue);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [startDate, setStartDate] = useState("All");
  const [endDate, setEndDate] = useState("All");
  const [status, setStatus] = useState<string>("All");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const total = booking?.total;
  useEffect(() => {
    let payload: any = {
      startDate: startDate,
      endDate: endDate,
      status: status,
      start: page,
      limit: rowsPerPage,
    };

    dispatch(getAllBookings(payload));
  }, [dispatch, startDate, endDate, page, rowsPerPage, status]);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(1);
  };

  const handlePendingOpenDialogue = (row: any) => {
    dispatch(openDialog({ type: "pending", data: row }));
  };
  const handleOpenDialogue = (row: any) => {
    dispatch(openDialog({ type: "cancel", data: row }));
  };

  const handleCompletedDialogue = (row: any) => {
    dispatch(openDialog({ type: "completed", data: row }));
  };

  const handleConfirmDialogue = (row: any) => {
    dispatch(openDialog({ type: "confirm", data: row }));
  };

  const bookingType = [
    { name: "All", value: "All" },
    { name: "Pending", value: 1 },
    { name: "Confirm", value: 2 },
    { name: "Completed", value: 3 },
    { name: "Cancelled", value: 4 },
  ];

  const handleInfo = (row: any) => {
    router.push({
      pathname: "/UserProfile",
      query: { id: row?.customerId },
    });
  };

  const bookingTable = [
    {
      Header: "No",
      Cell: ({ index }: { index: any }) => (
        <span>{(page - 1) * rowsPerPage + index + 1}</span>
      ),
    },

    {
      Header: "User",
      Cell: ({ row, index }: { row: bookingData; index: number }) => (
        <div className="userProfile">
          <div className="userProfile">
            <img
              src={baseURL + row?.customerImage}
              style={{ width: "70px", height: "70px" }}
              alt={`Doctor ${page * rowsPerPage + index + 1}`}
            />
          </div>
        </div>
      ),
    },

    {
      Header: "User Name",
      Cell: ({ row }: { row: bookingData }) => (
        <span
          className="text-capitalize cursor"
          onClick={() => handleInfo(row)}
        >
          {row?.customerName}
        </span>
      ),
    },

    {
      Header: "Expert",
      Cell: ({ row }: { row: bookingData }) => (
        <span className="text-capitalize cursor">
          {row?.providerName}
        </span>
      ),
    },

    {
      Header: "AppoinmentId",
      Cell: ({ row }: { row: bookingData }) => (
        <span className="text-capitalize cursor">
          {row?.appointmentId}
        </span>
      ),
    },

    {
      Header: "Service",
      Cell: ({ row }: { row: bookingData }) => (
        <span className="text-capitalize cursor">
          {row?.serviceName}
        </span>
      ),
    },

    {
      Header: `Amount (${defaultCurrency?.symbol})`,
      Cell: ({ row }: { row: bookingData }) => (
        <span className="text-capitalize cursor">
          {row?.netPayableAmount}
        </span>
      ),
    },

    {
      Header: "Date",
      Cell: ({ row }: { row: bookingData }) => (
        <span className="text-capitalize cursor">{row?.date}</span>
      ),
    },

    {
      Header: "Time",
      Cell: ({ row }: { row: bookingData }) => (
        <span className="text-capitalize cursor">{row?.time}</span>
      ),
    },



    {
      Header: "Status",
      Cell: ({ row }) =>
        row?.status === 1 ? (
          <button
            className="  m5-right p12-x p4-y fs-12 br-5 text-white"
            style={{ backgroundColor: "#ff7512" }}
            onClick={() => handlePendingOpenDialogue(row)}
          >
            Pending
          </button>
        ) : row?.status === 2 ? (
          <button
            className="bg-info text-white m5-right p12-x p4-y fs-12 br-5 "
            onClick={() => handleConfirmDialogue(row)}
          >
            Confirm
          </button>
        ) : row?.status === 3 ? (
          <button
            className="bg-success text-white m5-right p12-x p4-y fs-12 br-5 "
            onClick={() => handleCompletedDialogue(row)}
          >
            Completed
          </button>
        ) : row?.status === 4 ? (
          <button
            className="bg-danger text-white m5-right p12-x p4-y fs-12 br-5 "
            style={{ cursor: "pointer" }}
            onClick={() => handleOpenDialogue(row)}
          >
            Cancel
          </button>
        ) : (
          ""
        ),
    },

 
  ];

  return (
    <div className="mainCategory">
      <Title name="Bookings" />
      {dialogueType == "pending" ? (
        <PendingBookingDialog />
      ) : dialogueType == "cancel" ? (
        <CancelBooking />
      ) : dialogueType == "completed" ? (
        <CompletedBooking />
      ) : dialogueType == "confirm" ? (
        <ConfirmBooking />
      ) : (
        ""
      )}
      <div className="row">
        <div className="inputData col-12 col-md-3 col-lg-2">
          <label className="styleForTitle" htmlFor="bookingType">
            Appointment type
          </label>
          <select
            name="bookingType"
            className="rounded-2 fw-bold"
            id="bookingType"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            {bookingType?.map((data) => {
              return <option value={data?.value}>{data?.name}</option>;
            })}
          </select>
        </div>

        <div className="col-md-9 col-12">
          <div className="inputData">
            <label>Analytic</label>
          </div>
          <Analytics
            analyticsStartDate={startDate}
            analyticsStartEnd={endDate}
            analyticsStartDateSet={setStartDate}
            analyticsStartEndSet={setEndDate}
          />
        </div>
      </div>
      <div>
        <Table
          type={"server"}
          data={status ? booking?.booking : ""}
          mapData={bookingTable}
          serverPerPage={rowsPerPage}
          Page={page}
        />
      </div>

      <div>
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
  );
};

Booking.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export default Booking;
