import React, { useEffect, useState } from "react";
import RootLayout from "@/component/layout/Layout";
import { useSelector } from "react-redux";
import { RootStore, useAppDispatch } from "@/store/store";
import { getMonthlyReport } from "@/store/monthlyReportSlice";
import Title from "@/extra/Title";
import Table from "@/extra/Table";
import ReactDatePicker from "react-datepicker";
import moment from "moment";

interface monthlyReport {
  amount?: number;
  completedAppointments?: number;
  doctorEarning?: number;
  totalAppointments?: number;
  totalProviders?: number;
  month?: string;
  tax?: number;
  totalproviderNetEarnings?: number;
  totaltaxAmount?: number;
  totaladminCommissionAmount?: number;
  totalnetPayableAmount?: number;
  totalwithoutTaxAmount ?: number;
  totaldiscountAmount?: number
}

export default function monthlyReport() {
  const thisYear = new Date();
  thisYear.setDate(1);
  const { defaultCurrency }: any = useSelector(
    (state: RootStore) => state?.setting
  );
  const monthlyReport = useSelector((state: RootStore) => state?.monthlyReport);
  const [page, setPage] = useState<any>(1);
  const [rowsPerPage, setRowsPerPage] = useState<any>(0);
  const [selectedDate, setSelectedDate] = useState<any>(thisYear);

  const dispatch = useAppDispatch();

  const formattedDate: any = moment(selectedDate, "YYYY").format("YYYY");
  useEffect(() => {
    dispatch(getMonthlyReport(formattedDate));
  }, [dispatch, formattedDate]);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(1);
  };

  const handleDateChange = (date) => {
    const selectedDateObject = moment(date, "YYYY").toDate();
    setSelectedDate(selectedDateObject);
  };

  const monthReportTable = [
    {
      Header: "No",
      Cell: ({ index }: { index: any }) => (
        <span>{(page - 1) * rowsPerPage + index + 1}</span>
      ),
    },

    {
      Header: "Month",
      Cell: ({ row }: { row: monthlyReport }) => (
        <span className="text-capitalize cursor">{row?.month}</span>
      ),
    },

    {
      Header: "Total Expert",
      Cell: ({ row }: { row: monthlyReport }) => (
        <span className="text-capitalize cursor">
          {row?.totalProviders}
        </span>
      ),
    },

    {
      Header: "Total Appointment",
      Cell: ({ row }: { row: monthlyReport }) => (
        <span className="text-capitalize cursor">
          {row?.totalAppointments}
        </span>
      ),
    },

    {
      Header: `Total Amount Without Tax (${defaultCurrency?.symbol})`,
      Cell: ({ row }: { row: monthlyReport }) => (
        <span className="text-capitalize cursor">
          {row?.totalwithoutTaxAmount?.toFixed(0)}
        </span>
      ),
    },

    {
      Header: `Total Tax Amount (${defaultCurrency?.symbol})`,
      Cell: ({ row }: { row: monthlyReport }) => (
        <span className="text-capitalize cursor">
          {row?.totaltaxAmount}
        </span>
      ),
    },

    {
      Header: `Total Amount After Tax (${defaultCurrency?.symbol})`,
      Cell: ({ row }: { row: monthlyReport }) => (
        <span className="text-capitalize cursor">
          {row?.totalnetPayableAmount?.toFixed(0)}
        </span>
      ),
    },

    {
      Header: `Total Discount (${defaultCurrency?.symbol})`,
      Cell: ({ row }: { row: monthlyReport }) => (
        <span className="text-capitalize cursor">
          {row?.totaldiscountAmount}
        </span>
      ),
    },
   
    {
      Header: `Expert Earning (${defaultCurrency?.symbol})`,
      Cell: ({ row }: { row: monthlyReport }) => (
        <span className="text-capitalize cursor">
          {row?.totalproviderNetEarnings?.toFixed(0)}
        </span>
      ),
    },

 

    {
      Header: `Admin Earning (${defaultCurrency?.symbol})`,
      Cell: ({ row }: { row: monthlyReport }) => (
        <span className="text-capitalize cursor">
          {row?.totaladminCommissionAmount?.toFixed(0)}
        </span>
      ),
    },

    {
      Header: `Total Net Payable Amount (${defaultCurrency?.symbol})`,
      Cell: ({ row }: { row: monthlyReport }) => (
        <span className="text-capitalize cursor">
          {row?.totalnetPayableAmount?.toFixed(0)}
        </span>
      ),
    },
  ];

  return (
    <div className="mainCategory">
      <Title name="MonthlyReport" />
      <div className="inputData col-lg-2 col-md-4 me-3 mb-0">
        <label>Select year</label>

        <ReactDatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy/MM"
          showYearPicker
          className="mt-0"
        />
      </div>

      <div className="mt-4">
        <Table
          type={"server"}
          data={monthlyReport?.monthlyReport}
          mapData={monthReportTable}
          serverPerPage={rowsPerPage}
          Page={page}
        />
      </div>
    </div>
  );
}

monthlyReport.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};
