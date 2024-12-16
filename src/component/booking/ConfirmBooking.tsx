import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootStore, useAppDispatch } from "@/store/store";
import { ExInput } from "@/extra/Input";
import Button from "@/extra/Button";
import { closeDialog } from "@/store/dialogSlice";

const ConfirmBooking = () => {
  const { dialogueData } = useSelector((state: RootStore) => state.dialogue);

  const dispatch = useAppDispatch();
  const [mongoId, setMongoId] = useState<any>();

  useEffect(() => {
    if (dialogueData) {
      setMongoId(dialogueData);
    }
  }, [dialogueData]);

  // appointmentId: "#2DEBBE784";
  // date: "2024-09-13";
  // providerName: "Mark Davis";
  // provideravgRating: 3;
  // serviceName: "Plumbing";
  // serviceProviderFee: 150;
  // status: 3;
  // time: "08:15 PM";
  // _id: "66e42d0a09c9314ef6619434";

  return (
    <div className="dialog">
      <div className="w-100">
        <div className="row justify-content-center">
          <div className="col-xl-3 col-md-4 col-11">
            <div className="mainDiaogBox">
              <div className="row justify-content-between align-items-center formHead">
                <div className="col-8">
                  <h4 className="text-theme m0">Appointment Info</h4>
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
                  <div className="col-12">
                    <ExInput
                      type={`text`}
                      id={`Time`}
                      name={`checkInTime`}
                      label={`Time`}
                      placeholder={`checkInTime`}
                      value={mongoId?.time}
                      disabled={true}
                    />
                  </div>
                  <div className="col-12">
                    <ExInput
                      type={`text`}
                      id={`id`}
                      name={`appointment Id`}
                      label={`Appointment Id`}
                      placeholder={`appointment Id`}
                      value={mongoId?.appointmentId}
                      disabled={true}
                    />
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
export default ConfirmBooking;
