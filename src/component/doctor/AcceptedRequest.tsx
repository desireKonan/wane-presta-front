import Pagination from "@/extra/Pagination";
import Table from "@/extra/Table";
import { RootStore, useAppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AcceptedRequest = () => {
  const { doctorAcceptedRequest } = useSelector(
    (state: RootStore) => state.doctor
  );
  const router = useRouter();
  const { defaultCurrency }: any = useSelector((state: RootStore) => state?.setting);

  const dispatch = useAppDispatch();
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState<string | undefined>("All");
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setData(doctorAcceptedRequest);
  }, [doctorAcceptedRequest]);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(0);
  };

  const doctorAcceptedRequestTable = [
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
      sorting: { type: "client" },
      Cell: ({ row }) => (
        <span className="text-capitalize fw-bold">{row?.charge.toFixed()}</span>
      ),
    },
    {
      Header: "Country",
      Cell: ({ row }) => <span>{row?.country}</span>,
    },
    {
      Header: "Education",
      Cell: ({ row }) => <span>{row?.education}</span>,
    },
    {
      Header: "Your Self",
      Cell: ({ row }) => <span>{row?.yourSelf}</span>,
    },
   
  ];

  return (
    <>
      <div>
        <Table
          data={data}
          mapData={doctorAcceptedRequestTable}
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
    </>
  );
};

export default AcceptedRequest;
