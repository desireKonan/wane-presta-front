import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootStore, useAppDispatch } from "@/store/store";
import { closeDialog } from "@/store/dialogSlice";
import { ExInput } from "@/extra/Input";

const WithdrawDialog = () => {
  const { dialogueData } = useSelector((state: RootStore) => state.dialogue);

  const dispatch = useAppDispatch();
  const [mongoId, setMongoId] = useState<any>();


  useEffect(() => {
    if (dialogueData) {
      setMongoId(dialogueData);
    }
  }, [dialogueData]);

  return (
    <div className="dialog">
      <div className="w-100">
        <div className="row justify-content-center">
          <div className="col-xl-3 col-md-4 col-11">
            <div className="mainDiaogBox">
              <div className="row justify-content-between align-items-center formHead">
                <div className="col-8">
                  <h4 className="text-theme m0">Bank Details</h4>
                </div>
                <div className="col-4">
                  <div
                    className="closeButton"
                    onClick={() => {
                      dispatch(closeDialog());
                    }}
                  >
                    <i className="ri-close-line"></i>
                  </div>
                </div>
              </div>
              <form id="expertForm">
                <div className="row align-items-start formBody">
                  {mongoId?.paymentDetails &&
                    mongoId?.paymentDetails.map((data: any) => {
                      let items = data?.split(":");
                      return (
                        <div className="col-12">
                          <ExInput
                            type={`text`}
                            id={`${items[0]}`}
                            name={`${items[0]}`}
                            label={`${items[0]}`}
                            placeholder={`${items[0]}`}
                            value={items[1]}
                            disabled={true}
                          />
                        </div>
                      );
                    })}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WithdrawDialog;
