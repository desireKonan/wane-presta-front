import CancelBooking from "@/component/booking/CancelBooking";
import CompletedBooking from "@/component/booking/CompletedBooking";
import ConfirmBooking from "@/component/booking/ConfirmBooking";
import PendingBookingDialog from "@/component/booking/PendingBookingDialog";
import RootLayout from "@/component/layout/Layout";
import Analytics from "@/extra/Analytic";
import Pagination from "@/extra/Pagination";
import Table from "@/extra/Table";
import Title from "@/extra/Title";
import { openDialog } from "@/store/dialogSlice";
import { getParticularProviderAppointment } from "@/store/doctorSlice";
import { RootStore, useAppDispatch } from "@/store/store";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface bookingData {
  _id: any;
  time: string;
  serviceProviderFee: number;
  date: string;
  appointmentId: any;
  customerName: string;
  serviceName: string;
}

const DoctorBooking = () => {
  const { doctorAppointment, total } = useSelector(
    (state: RootStore) => state?.doctor
  );

  const { defaultCurrency }: any = useSelector(
    (state: RootStore) => state?.setting
  );

  const [startDate, setStartDate] = useState("All");
  const [endDate, setEndDate] = useState("All");
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [status, setStatus] = useState<string>("All");
  const dispatch = useAppDispatch();
  const { dialogueType } = useSelector((state: RootStore) => state?.dialogue);

  const router = useRouter();
  const id: any = router?.query?.id;

  useEffect(() => {
    let payload: any = {
      providerId: id,
      start: page,
      limit: rowsPerPage,
      startDate: startDate,
      endDate: endDate,
      status: status,
    };
    dispatch(getParticularProviderAppointment(payload));
  }, [dispatch, id, page, rowsPerPage, startDate, endDate, status]);

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

  const bookingTable = [
    {
      Header: "No",
      Cell: ({ index }: { index: any }) => (
        <span>{(page - 1) * rowsPerPage + index + 1}</span>
      ),
    },

    {
      Header: "User",
      Cell: ({ row }: { row: bookingData }) => (
        <span className="text-capitalize fw-bold cursor">
          {row?.customerName}
        </span>
      ),
    },

    {
      Header: "AppoinmentId",
      Cell: ({ row }: { row: bookingData }) => (
        <span className="text-capitalize fw-bold cursor">
          {row?.appointmentId}
        </span>
      ),
    },

    {
      Header: "Service",
      Cell: ({ row }: { row: bookingData }) => (
        <span className="text-capitalize fw-bold cursor">
          {row?.serviceName}
        </span>
      ),
    },

    {
      Header: `Service Charge (${defaultCurrency?.symbol})`,
      Cell: ({ row }: { row: bookingData }) => (
        <span className="text-capitalize fw-bold cursor">
          {row?.serviceProviderFee}
        </span>
      ),
    },

    {
      Header: "Date",
      Cell: ({ row }: { row: bookingData }) => (
        <span className="text-capitalize fw-bold cursor">{row?.date}</span>
      ),
    },

    {
      Header: "Time",
      Cell: ({ row }: { row: bookingData }) => (
        <span className="text-capitalize fw-bold cursor">{row?.time}</span>
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

  const bookingType = [
    { name: "All", value: "All" },
    { name: "Pending", value: 1 },
    { name: "Completed", value: 3 },
    { name: "Cancelled", value: 4 },
  ];
  return (
    <>
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
          <div className="inputData col-2">
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

          <div className="col-9">
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
            data={doctorAppointment}
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
    </>
  );
};

DoctorBooking.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export default DoctorBooking;
