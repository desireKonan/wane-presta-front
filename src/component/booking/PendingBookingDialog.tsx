import React, { useEffect, useState } from "react";
import { RootStore, useAppDispatch } from "@/store/store";
import { closeDialog } from "@/store/dialogSlice";

import { ExInput } from "@/extra/Input";
import Button from "@/extra/Button";
import { useSelector } from "react-redux";
import { cancelBooking } from "@/store/bookingSlice";

const PendingBookingDialog = () => {
  const { dialogueData } = useSelector((state: RootStore) => state.dialogue);


  const dispatch = useAppDispatch();
  const [reason, setReason] = useState("");
  const [mongoId, setMongoId] = useState<any>();
  const [customerId, setCustomerId] = useState<any>();
  const [error, setError] = useState("");

  useEffect(() => {
    if (dialogueData) {
      setMongoId(dialogueData?._id);
      setCustomerId(dialogueData?.customerId);
    }
  }, [dialogueData]);

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!reason) {
      setError("Reason is Required");
    } else {
      if (dialogueData) {
        const payload: any = {
          customerId: customerId,
          appointmentId: mongoId,
          reason: reason,
        };
        dispatch(cancelBooking(payload));
        dispatch(closeDialog());
      }
    }
  };

  return (
    <div className="dialog">
      <div className="w-100">
        <div className="row justify-content-center">
          <div className="col-xl-3 col-md-4 col-11">
            <div className="mainDiaogBox">
              <div className="row justify-content-between align-items-center formHead">
                <div className="col-8">
                  <h4 className="text-theme m0">Cancel booking</h4>
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
              <form onSubmit={handleSubmit} id="expertForm">
                <div className="row align-items-start formBody">
                  <div className="col-12">
                    <ExInput
                      type={`text`}
                      id={`reason`}
                      name={`reason`}
                      label={`Reason`}
                      placeholder={`Reason`}
                      value={reason}
                      onChange={(e) => {
                        setReason(e.target.value);
                        if (!e.target.value) {
                          return setError("Reason is Required !");
                        } else {
                          setError("");
                        }
                      }}
                    />
                    {error && (
                      <p className="errorMessage text-start">
                        {error && error}
                      </p>
                    )}
                  </div>
                </div>
                <div className="row  formFooter">
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
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PendingBookingDialog;
