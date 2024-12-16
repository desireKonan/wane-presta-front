import React, { useEffect, useState } from "react";
import RootLayout from "@/component/layout/Layout";
import Title from "@/extra/Title";
import { useSelector } from "react-redux";
import { RootStore, useAppDispatch } from "@/store/store";
import { getDailyBooking } from "@/store/bookingSlice";
import Table from "@/extra/Table";
import Analytics from "@/extra/Analytic";
import Pagination from "@/extra/Pagination";

interface dailyBookingData {
  date: string;
  totalwithoutTaxAmount: number;
  totaltaxAmount: number;
  totalafterTaxAmount: number;
  totaldiscountAmount: number;
  totalnetPayableAmount: number;
  totaladminCommissionAmount: number;
  totalproviderNetEarnings: number;
  totalAppointments: number;
  totalProviders: number;
}

export default function DailyBooking() {
  const { defaultCurrency }: any = useSelector(
    (state: RootStore) => state?.setting
  );

  const [page, setPage] = useState<any>(1);
  const [rowsPerPage, setRowsPerPage] = useState<any>(10);
  const [startDate, setStartDate] = useState("All");
  const [endDate, setEndDate] = useState("All");

  const dispatch = useAppDispatch();

  useEffect(() => {
    let payload: any = {
      startDate: startDate,
      endDate: endDate,
      start: page,
      limit: rowsPerPage,
    };

    dispatch(getDailyBooking(payload));
  }, [startDate, endDate, page, startDate]);

  const { total, calendarData } = useSelector(
    (state: RootStore) => state?.booking
  );

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(1);
  };

  const dailyBookingTable = [
    {
      Header: "No",
      Cell: ({ index }: { index: any }) => (
        <span>{(page - 1) * rowsPerPage + index + 1}</span>
      ),
    },

    {
      Header: "Date",
      Cell: ({ row }: { row: dailyBookingData }) => (
        <span className="text-capitalize cursor">{row?.date}</span>
      ),
    },

    {
      Header: "No Of Experts",
      Cell: ({ row }: { row: dailyBookingData }) => (
        <span className="text-capitalize cursor">
          {row?.totalProviders}
        </span>
      ),
    },

    {
      Header: `Expert Earning (${defaultCurrency?.symbol})`,
      Cell: ({ row }: { row: dailyBookingData }) => (
        <span className="text-capitalize cursor">
          {row?.totalproviderNetEarnings?.toFixed(0)}
        </span>
      ),
    },

    {
      Header: `Total Tax (${defaultCurrency?.symbol})`,
      Cell: ({ row }: { row: dailyBookingData }) => (
        <span className="text-capitalize cursor">
          {row?.totaltaxAmount?.toFixed(0)}
        </span>
      ),
    },

    {
      Header: `Admin Earning (${defaultCurrency?.symbol})`,
      Cell: ({ row }: { row: dailyBookingData }) => (
        <span className="text-capitalize cursor">
          {row?.totaladminCommissionAmount?.toFixed(0)}
        </span>
      ),
    },
    {
      Header: `Discount (${defaultCurrency?.symbol})`,
      Cell: ({ row }: { row: dailyBookingData }) => (
        <span className="text-capitalize cursor">
          {row?.totaldiscountAmount}
        </span>
      ),
    },

    {
      Header: `Total Amount (${defaultCurrency?.symbol})`,
      Cell: ({ row }: { row: dailyBookingData }) => (
        <span className="text-capitalize cursor">
          {row?.totalnetPayableAmount}
        </span>
      ),
    },
  ];

  return (
    <div className="mainCategory">
      <Title name="Daily Bookings" />
      <Analytics
        analyticsStartDate={startDate}
        analyticsStartEnd={endDate}
        analyticsStartDateSet={setStartDate}
        analyticsStartEndSet={setEndDate}
      />
      <Table
        type={"server"}
        data={calendarData}
        mapData={dailyBookingTable}
        serverPerPage={rowsPerPage}
        Page={page}
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
  );
}

DailyBooking.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};
