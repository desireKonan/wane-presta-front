import ExpertComplain from "@/component/complain/ExpertComplain";
import UserComplain from "@/component/complain/UserComplain";
import RootLayout from "@/component/layout/Layout";
import Title from "@/extra/Title";
import React, { useState } from "react";

const Complain = () => {
  const [type, setType] = useState<string>("user");

  return (
    <>
      <div className={`userTable`}>
        <Title name="Complain" />
        <div
          className="my-2"
          style={{
            width: "167px",
            border: "1px solid #1c2b20",
            padding: "4px",
            borderRadius: "40px",
          }}
        >
          <button
            type="button"
            className={`${type === "user" ? "activeBtn" : "disabledBtn"}`}
            onClick={() => setType("user")}
          >
            User
          </button>
          <button
            type="button"
            className={`${
              type === "expert" ? "activeBtn" : "disabledBtn"
            } ms-1`}
            onClick={() => setType("expert")}
          >
            Expert
          </button>
        </div>

        {type === "user" && <UserComplain />}
        {type === "expert" && <ExpertComplain />}
      </div>
    </>
  );
};
Complain.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};
export default Complain;
