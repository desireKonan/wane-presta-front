import React, { useEffect, useState } from "react";
import RootLayout from "../component/layout/Layout";
import { useAppDispatch } from "@/store/store";
import { getRechargeRequest } from "../store/rechargeSlice";
import { useSelector } from "react-redux";
import Table from "@/extra/Table";
import Pagination from "@/extra/Pagination";
import Analytics from "@/extra/Analytic";
import Title from "@/extra/Title";

interface rechargeTable {
  _id?: string;
  customer?: {
    name: string;
  };
  date?: string;
  amount?: any;
  paymentGateway?: any;
  time?: string;
  currencySymbol?: any;
  couponId?: any;
  couponAmount?: any;
  coupon?: any;
  type?: number;
}

interface RootStore {
  setting: any;
  recharge: {
    recharge: any;
    userWalletHistory: any;
    user: any;
    total: number;
  };
  total: number;
}

const Recharge = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<any>();
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
  const [startDate, setStartDate] = useState("All");
  const [endDate, setEndDate] = useState("All");
  const [status, setStatus] = useState<string>("All");
  const { recharge, total } = useSelector((state: RootStore) => state.recharge);
  const { defaultCurrency } = useSelector((state: RootStore) => state.setting);

  useEffect(() => {
    const payload = {
      startDate: startDate,
      endDate: endDate,
      type: status,
      start: page,
      limit: rowsPerPage,
    };
    dispatch(getRechargeRequest(payload));
  }, [dispatch, startDate, endDate, status, page, rowsPerPage]);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(1);
  };

  const bookingType = [
    { name: "All", value: "All" },
    { name: "Credit", value: 1 },
    { name: "Debit", value: 2 },
  ];

  const rechargeTable = [
    {
      Header: "No",
      Cell: ({ index }: { index: any }) => (
        <span>{(page - 1) * rowsPerPage + index + 1}</span>
      ),
    },
    {
      Header: "User",
      Cell: ({ row }: { row: rechargeTable }) => (
        <span className="text-capitalize">
          {row?.customer?.name ? row?.customer?.name : "-"}
        </span>
      ),
    },

    {
      Header: "Payment Gateway",
      Cell: ({ row }: { row: rechargeTable }) => (
        <span className="text-capitalize">
          {row?.paymentGateway === 1
            ? "Razorpay"
            : row?.paymentGateway === 2
            ? "Stripe"
            : "Flutter"}
        </span>
      ),
    },

 

    {
      Header: "Coupon Code",
      Cell: ({ row }: { row: rechargeTable }) => (
        <span className="text-capitalize">
          {row?.coupon.code ? row?.coupon.code : "-"}
        </span>
      ),
    },

    {
      Header: "Discount",
      Cell: ({ row }: { row: rechargeTable }) => (
        <span className="text-capitalize">
          {row?.couponAmount ? row?.couponAmount : "-"}
        </span>
      ),
    },

    {
      Header: `Amount (${defaultCurrency?.symbol})`,

      Cell: ({ row }: { row: rechargeTable }) => (
        <p className="text-capitalize">{`${row?.amount} `}</p>
      ),
    },

    {
      Header: "Date",
      Cell: ({ row }: { row: rechargeTable }) => (
        <span className="text-capitalize">{`${row?.date}`}</span>
      ),
    },

    {
      Header: "Time",
      Cell: ({ row }: { row: rechargeTable }) => (
        <span className="text-capitalize">{row?.time}</span>
      ),
    },

    {
      Header: "Transaction Type",
      Cell: ({ row }: { row: rechargeTable }) => (
        <span className="text-capitalize">
          {row?.type === 1 ? (
            <button
              className=" p12-x p4-y fs-12 br-5 text-white"
              style={{ backgroundColor: "green", width: "65px" }}
            >
              Credit
            </button>
          ) : (
            <button
              className=" p12-x p4-y fs-12 br-5 text-white"
              style={{ backgroundColor: "red", width: "65px" }}
            >
              Debit
            </button>
          )}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Title name="Recharge" />

      <div className="row">
        <div className="inputData col-12 col-md-3 col-lg-2">
          <label className="styleForTitle" htmlFor="bookingType">
            Transaction type
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
        <div className="col-12 col-md-3">
          <div className="inputData">
            <label>Analytic</label>
          </div>
          <div>
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
        <Table
          data={recharge}
          mapData={rechargeTable}
          serverPerPage={rowsPerPage}
          Page={page}
          type={"server"}
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
    </div>
  );
};

Recharge.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default Recharge;
