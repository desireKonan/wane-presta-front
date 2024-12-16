import AllExpert from "@/component/expert/AllExpert";
import PendingRequest from "@/component/expert/PendingRequest";
import RejectedRequest from "@/component/expert/RejectedRequest";

import RootLayout from "@/component/layout/Layout";
import Title from "@/extra/Title";
import { RootStore, useAppDispatch } from "@/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";

const ExpertTable = () => {
  const { dialogueType } = useSelector((state: RootStore) => state.dialogue);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string | undefined>("All");
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
  const [type, setType] = useState<string>("expert");

  return (
    <>
      <div
        className={`userTable ${
          dialogueType === "expert" ? "d-none" : "d-block"
        }`}
      >
        <Title name="Expert" />

        <div
          className="my-2 expert_width"
     
        >
          <button
            type="button"
            className={`${type === "expert" ? "activeBtn" : "disabledBtn"}`}
            onClick={() => setType("expert")}
          >
            All Experts
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

        {type === "expert" && <AllExpert />}
        {type === "pending" && <PendingRequest />}
        {type === "rejected" && <RejectedRequest />}
      </div>
    </>
  );
};
ExpertTable.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};
export default ExpertTable;
