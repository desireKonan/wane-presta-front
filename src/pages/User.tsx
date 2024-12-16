import RootLayout from "@/component/layout/Layout";
import UserTable from "@/component/user/UserTable";
import { RootStore } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const User = () => {
    const { dialogue, dialogueType } = useSelector(
        (state: RootStore) => state.dialogue
      );
  return (
    <>
      <UserTable />
      
    </>
  );
};

User.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};
export default User;
