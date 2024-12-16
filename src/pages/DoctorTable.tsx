import AllDoctor from "@/component/doctor/AllDoctor";
import PendingRequest from "@/component/doctor/PendingRequest";
import RejectedRequest from "@/component/doctor/RejectedRequest";
import RootLayout from "@/component/layout/Layout";
import Title from "@/extra/Title";
import { RootStore, useAppDispatch } from "@/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";

const DoctorTable = () => {
  const { dialogueType } = useSelector((state: RootStore) => state.dialogue);

  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string | undefined>("All");
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
  const [type, setType] = useState<string>("doctor");

  return (
    <>
      <div
        className={`userTable ${
          dialogueType === "doctor" ? "d-none" : "d-block"
        }`}
      >
        <Title name="Doctors" />

        <div
          className="my-2"
          style={{
            width: "348px",
            border: "1px solid #1c2b20",
            padding: "4px",
            borderRadius: "40px",
          }}
        >
          <button
            type="button"
            className={`${type === "doctor" ? "activeBtn" : "disabledBtn"}`}
            onClick={() => setType("doctor")}
          >
            All Doctors
          </button>
          <button
            type="button"
            className={`${
              type === "pending" ? "activeBtn" : "disabledBtn"
            } ms-1`}
            onClick={() => setType("pending")}
          >
            Pending
          </button>

          <button
            type="button"
            className={`${
              type === "rejected" ? "activeBtn" : "disabledBtn"
            } ms-1`}
            onClick={() => setType("rejected")}
          >
            Rejected
          </button>
        </div>

        {type === "doctor" && <AllDoctor />}
        {type === "pending" && <PendingRequest />}
        {type === "rejected" && <RejectedRequest />}
      </div>
    </>
  );
};
DoctorTable.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};
export default DoctorTable;
