import Button from "@/extra/Button";
import { ExInput } from "@/extra/Input";
import { closeDialog } from "@/store/dialogSlice";
import { createService, updateService } from "@/store/serviceSlice";
import { RootStore, useAppDispatch } from "@/store/store";

import { baseURL } from "@/utils/config";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface ErrorState {
  name: string;
  image: string;
}

const ServicesDialogue = () => {
  const dispatch = useAppDispatch();

  const { dialogueData } = useSelector((state: RootStore) => state.dialogue);


  const [name, setName] = useState<string>();
  const [image, setImage] = useState<any>("");
  const [imagePath, setImagePath] = useState<any>("");

  const [error, setError] = useState({
    name: "",
    image: "",
    subService: "",
  });

  useEffect(() => {
    if(dialogueData){
      setName(dialogueData?.name);
      setImagePath(baseURL + dialogueData?.image);
      setImage(dialogueData?.image);
    }

  }, [dialogueData]);

  const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e?.target?.files) {
      setImage(e?.target?.files[0]);
      setImagePath(URL.createObjectURL(e.target.files[0]));
      return setError({ ...error, image: "" });
    }
  };

  const handleSubmit = (e: any) => {


    if (!name || !image) {
      let error = {} as ErrorState;
      if (!name) error.name = "Name is required";
      if (!image) error.image = "Image is required";
      return setError({ ...error, image: "", subService: "" });
    } else {
  

      const formData: any = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      if (dialogueData) {
        let payload: any = {
          id: dialogueData?._id,
          formData: formData,
        };
    

        dispatch(updateService(payload));
      } else {
        dispatch(createService(formData));
      }

      dispatch(closeDialog());
    }
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
                    <h2 className="text-theme m0">Service dialog</h2>
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
                      defaultValue={dialogueData && dialogueData?.name}
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
                          src={imagePath ? imagePath : dialogueData?.image}
                          className="mt-3 rounded float-left mb-2"
                          alt="image"
                          style={{ width: "100px", height: "100px" }}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="row  formFooter mt-3">
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

export default ServicesDialogue;
