import React, { useEffect, useState } from "react";
import { RootStore, useAppDispatch } from "@/store/store";
import { closeDialog } from "@/store/dialogSlice";

import { ExInput } from "@/extra/Input";
import Button from "@/extra/Button";
import { useSelector } from "react-redux";
import {
  pendingToSolveUserComplain,
  pendingToSolveExpertComplain,
} from "@/store/complainSlice";
import { baseURL } from "@/utils/config";

const UserComplainDialog = () => {
  const { dialogueData } = useSelector((state: RootStore) => state.dialogue);




  const dispatch = useAppDispatch();
  const [imagePath, setImagePath] = useState("");
  const [description, setDescription] = useState("");
  const [mongoId, setMongoId] = useState<any>();

  useEffect(() => {
    if (dialogueData) {
      setMongoId(dialogueData);
      setDescription(dialogueData?.details);
      setImagePath(dialogueData?.provider?.profileImage ? baseURL + dialogueData?.provider?.profileImage : baseURL + dialogueData?.customer?.profileImage );
    }
  }, [dialogueData]);

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    if (dialogueData && dialogueData.person == 2) {
      dispatch(pendingToSolveExpertComplain(mongoId?._id));
      dispatch(closeDialog());
    } else if (dialogueData && dialogueData.person == 1) {
      dispatch(pendingToSolveUserComplain(mongoId?._id));
      dispatch(closeDialog());
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
                  <h4 className="text-theme m0">Resolve Complain</h4>
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
                      id={`description`}
                      name={`description`}
                      label={`description`}
                      placeholder={`description`}
                      value={description}
                      disabled
                    />
                  </div>

                  <label>Image</label>
                  <div className="col-12">
                    {imagePath && (
                      <>
                        <img
                          src={imagePath ? imagePath : dialogueData?.image}
                          className="mt-3 rounded float-left mb-2"
                          alt="image"
                          style={{ width: "100px", height: "100px" }}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="row  formFooter">
                  <div className="col-12 text-end m0">
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
export default UserComplainDialog;
