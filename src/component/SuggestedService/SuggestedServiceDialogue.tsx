import Button from "@/extra/Button";
import { ExInput } from "@/extra/Input";
import { closeDialog } from "@/store/dialogSlice";
import { RootStore, useAppDispatch } from "@/store/store";
import { acceptSuggestedServiceRequest } from "@/store/suggestedServiceSlice";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface ErrorState {
  image: string;
  name: string;
}

const SuggestedServiceDialogue = () => {
  const dispatch = useAppDispatch();

  const { dialogue, dialogueData } = useSelector(
    (state: RootStore) => state.dialogue
  );


  const [image, setImage] = useState<any>();
  const [imagePath, setImagePath] = useState<any>();
  const [name, setName] = useState<any>();

  useEffect(() => {
    if (dialogueData) {
      setName(dialogueData?.name);
    }
  }, [dialogueData]);

  const [error, setError] = useState({
    image: "",
    name: "",
  });

  const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setImage(e?.target?.files[0]);
      setImagePath(URL.createObjectURL(e.target.files[0]));
      setError({ ...error, image: "" });
    }
  };

  const handleSubmit = (e: any) => {


    if (!image) {
      let error = {} as ErrorState;
      if (!image) error.image = "Image is required";
      if (!name) error.name = "Name is Required";
      return setError({ ...error });
    } else {
  

      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      if (dialogueData) {
        let payload = {
          id: dialogueData?._id,
          formData: formData,
        };
        dispatch(acceptSuggestedServiceRequest(payload));
      }

      dispatch(closeDialog());
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <>
      <div className="dialog">
        <div className="w-100">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-md-8 col-11">
              <div className="mainDiaogBox">
                <div className="row justify-content-between align-items-center formHead">
                  <div className="col-8">
                    <h2 className="text-theme m0">Add Service</h2>
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
                <div className="row">
                  <div className="col-12">
                    <ExInput
                      type={`text`}
                      id={`name`}
                      name={`name`}
                      value={name}
                      label={`Name`}
                      placeholder={`Name`}
                      errorMessage={error.name && error.name}
                      onChange={(e: any) => {
                        setName(e.target.value);
                        if (!e.target.value) {
                          return setError({
                            ...error,
                            name: ` Name is required`,
                          });
                        } else {
                          return setError({
                            ...error,
                            name: "",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="col-12">
                    <ExInput
                      type={"file"}
                      label={"Image"}
                      accept={"image/png, image/jpeg"}
                      errorMessage={error.image && error.image}
                      onChange={handleInputImage}
                    />

                    {imagePath && (
                      <>
                        <img
                          src={imagePath}
                          className="mt-3 rounded float-left mb-2"
                          alt="image"
                          style={{ width: "100px", height: "100px" }}
                        />
                      </>
                    )}
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
                      onClick={(e: any) => handleSubmit(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuggestedServiceDialogue;
