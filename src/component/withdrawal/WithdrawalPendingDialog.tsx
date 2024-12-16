import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootStore, useAppDispatch } from "@/store/store";
import { closeDialog } from "@/store/dialogSlice";
import { ExInput } from "@/extra/Input";
import Button from "@/extra/Button";
import { withdrawRequestPayUpdate, withdrawRequestPendingPayUpdate } from "@/store/withdrawalSlice";


const WithdrawalPendingDialog = () => {
  const { dialogueData , dialogueType } = useSelector((state: RootStore) => state.dialogue);


  const dispatch = useAppDispatch();
  const [mongoId, setMongoId] = useState<any>();


  useEffect(() => {
    if (dialogueData) {
      setMongoId(dialogueData);
    }
  }, [dialogueData]);

  const handleSubmit = () => {


    if(dialogueType === "withdrawaldialog"){
        dispatch(withdrawRequestPayUpdate(dialogueData?._id));
    }else {
        dispatch(withdrawRequestPendingPayUpdate(dialogueData?._id));
    }
    dispatch(closeDialog())
  }

  return (
    <div className="dialog">
      <div className="w-100">
        <div className="row justify-content-center">
          <div className="col-xl-3 col-md-4 col-11">
            <div className="mainDiaogBox">
              <div className="row justify-content-between align-items-center formHead">
                <div className="col-12">
                  <h4 className="text-theme m0">Would you like to approve the withdrawal request?</h4>
                </div>

              </div>

              <div className="col-12 text-end m0">
                    <Button
                      className={`bg-gray text-light`}
                      text={`Cancel`}
                      type={`button`}
                      onClick={() => dispatch(closeDialog())}
                    />
                    <Button
                      type={`submit`}
                      className={` text-white m10-left`}
                      style={{ backgroundColor: "#1ebc1e" }}
                      text={`Submit`}
                      onClick={handleSubmit}
                    />
                  </div>
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WithdrawalPendingDialog;
