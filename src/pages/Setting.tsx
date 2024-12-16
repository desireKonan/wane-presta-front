import React, { useState } from "react";
import RootLayout from "@/component/layout/Layout";
import Title from "@/extra/Title";
import { RootStore, useAppDispatch } from "@/store/store";
import AdminSetting from "@/component/setting/AdminSetting";
import PaymetSetting from "@/component/setting/PaymentSetting";
import WithdrawDialog from "@/component/withdrawal/WithdrawDialog";
import WithdrawSetting from "@/component/setting/WithdrawSetting";
import CurrencySetting from "@/component/setting/CurrencySetting";

const Setting = () => {
  const [type, setType] = useState<string>("Setting");

  return (
    <>
      <div
        className="my-2 setting"
      
      >
        <button
          type="button"
          className={`${type === "Setting" ? "activeBtn" : "disabledBtn"}`}
          onClick={() => setType("Setting")}
        >
          Setting
        </button>
        <button
          type="button"
          className={`${
            type === "PaymetSetting" ? "activeBtn" : "disabledBtn"
          } ms-1`}
          onClick={() => setType("PaymetSetting")}
        >
          Payment Setting
        </button>

        <button
          type="button"
          className={`${
            type === "WithdrawSetting" ? "activeBtn" : "disabledBtn"
          } ms-1`}
          onClick={() => setType("WithdrawSetting")}
        >
          Withdraw Setting
        </button>
        <button
          type="button"
          className={`${
            type === "CurrencySetting" ? "activeBtn" : "disabledBtn"
          } ms-1`}
          onClick={() => setType("CurrencySetting")}
        >
          Currency Setting
        </button>
      </div>
      <div>
        {type === "Setting" && <AdminSetting />}
        {type === "PaymetSetting" && <PaymetSetting  />}
        {type === "WithdrawSetting" && <WithdrawSetting />}
        {type === "CurrencySetting" && <CurrencySetting />}
      </div>
    </>
  );
};

Setting.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export default Setting;
