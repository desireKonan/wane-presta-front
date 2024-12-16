import RootLayout from "@/component/layout/Layout";
import Pagination from "@/extra/Pagination";
import Table from "@/extra/Table";
import Title from "@/extra/Title";
import { getParticularProviderEarning } from "@/store/doctorSlice";
import { RootStore, useAppDispatch } from "@/store/store";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface DoctorEarning {
  amount?: any;
  date?: any;
  time?: any;
  wallet?: any;
  appointment?: any;
  provider: {
    name: string;
  };
}

const DoctorEarning = () => {
  const { doctorAppointment, total, doctorEarning, wallet } = useSelector(
    (state: RootStore) => state?.doctor
  );
  const { defaultCurrency }: any = useSelector(
    (state: RootStore) => state?.setting
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const id: any = router?.query?.id;
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [status, setStatus] = useState<any>(1);


  useEffect(() => {
    let payload: any = {
      providerId: id,
      status: status,
    };
    dispatch(getParticularProviderEarning(payload));
  }, [dispatch, id, status]);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(0);
  };

  let earningTable: any;

  if (status == 2) {
    earningTable = [
      {
        Header: "No",
        Cell: ({ index }: { index: any }) => <span>{index + 1}</span>,
      },

      {
        Header: `Name`,
        Cell: ({ row }: { row: DoctorEarning }) => (
          <span className="text-capitalize fw-bold">{row?.provider?.name}</span>
        ),
      },

      {
        Header: `Amount (${defaultCurrency?.symbol})`,
        Cell: ({ row }: { row: DoctorEarning }) => (
          <span className="text-capitalize fw-bold">{row?.amount}</span>
        ),
      },
      {
        Header: "Date",
        Cell: ({ row }: { row: DoctorEarning }) => (
          <span className="text-capitalize fw-bold">{row?.date}</span>
        ),
      },
      {
        Header: "Time",
        Cell: ({ row }: { row: DoctorEarning }) => (
          <span className="text-capitalize fw-bold">{row?.time}</span>
        ),
      },

      {
        Header: "Earning Type",
        Cell: ({ row }: { row: DoctorEarning }) => (
          <span className="text-capitalize">
            {status == 1 ? (
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
  } else {
    earningTable = [
      {
        Header: "No",
        Cell: ({ index }: { index: any }) => <span>{index + 1}</span>,
      },

      {
        Header: "Appointment Id",
        Cell: ({ row }: { row: DoctorEarning }) => (
          <span className="text-capitalize fw-bold">
            {row?.appointment?.appointmentId}
          </span>
        ),
      },
      {
        Header: `Name`,
        Cell: ({ row }: { row: DoctorEarning }) => (
          <span className="text-capitalize fw-bold">{row?.provider?.name}</span>
        ),
      },

      {
        Header: `Amount (${defaultCurrency?.symbol})`,
        Cell: ({ row }: { row: DoctorEarning }) => (
          <span className="text-capitalize fw-bold">{row?.amount}</span>
        ),
      },
      {
        Header: "Date",
        Cell: ({ row }: { row: DoctorEarning }) => (
          <span className="text-capitalize fw-bold">{row?.date}</span>
        ),
      },

      {
        Header: "Time",
        Cell: ({ row }: { row: DoctorEarning }) => (
          <span className="text-capitalize fw-bold">{row?.time}</span>
        ),
      },




      {
        Header: "Earning Type",
        Cell: ({ row }: { row: DoctorEarning }) => (
          <span className="text-capitalize">
            {status == 1 ? (
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
  }

  const earningType = [
    { name: "Earning", value: 1 },
    { name: "Withdrawal", value: 2 },
  ];

  return (
    <>
      <div className="mainCategory">
        <Title name={status == 1 ? "Expert earning" : "Expert withdrawal"} />

        <div className="row  justify-content-between align-self-start">
          <div className="inputData col-2">
            <label className="styleForTitle" htmlFor="bookingType">
              Earning type
            </label>
            <select
              name="bookingType"
              className="rounded-2 fw-bold"
              id="bookingType"
              value={status}
              onChange={(e: any) => {
                setStatus(e.target.value);
              }}
            >
              {earningType?.map((data) => {
                return <option value={data?.value}>{data?.name}</option>;
              })}
            </select>
          </div>
        </div>
        <div>
          <Table
            type={"client"}
            data={doctorEarning}
            mapData={earningTable}
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
DoctorEarning.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export default DoctorEarning;
