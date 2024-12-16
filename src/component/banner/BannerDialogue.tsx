import Button from "@/extra/Button";
import { ExInput } from "@/extra/Input";
import { createBanner, updatedBanner } from "@/store/bannerSlice";
import { closeDialog } from "@/store/dialogSlice";
import { getServices } from "@/store/serviceSlice";
import { RootStore, useAppDispatch } from "@/store/store";

import { baseURL } from "@/utils/config";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
interface ErrorState {
  image: string;
  serviceId: string;
  type: string;
  url: string;
}
const BannerDialogue = () => {


  const { dialogue, dialogueData } = useSelector(
    (state: RootStore) => state.dialogue
  );
  const { service, total } = useSelector((state: RootStore) => state.service);

  useEffect(() => {
    const payload: any = {
      start: 1,
      limit: 100,
      search: "All",
    };
    dispatch(getServices(payload));
  }, []);

  useEffect(() => {
    setImage("");
    setImagePath("");
    setType("");
    setServiceId("");
    setUrl("");
  }, []);

  const dispatch = useAppDispatch();
  const [image, setImage] = useState<any>();
  const [type, setType] = useState<any>();
  const [imagePath, setImagePath] = useState<any>();
  const [serviceId, setServiceId] = useState<any>();
  const [url, setUrl] = useState<any>();

  const [error, setError] = useState({
    image: "",
    serviceId: "",
    type: "",
    url: "",
  });

  useEffect(() => {
    if (dialogueData) {
      setImagePath(baseURL + dialogueData?.image);
      setImage(dialogueData?.image);
      setType(dialogueData?.type);
      setServiceId(
        dialogueData?.service?._id
          ? dialogueData?.service?._id
          : dialogueData?.service
      );
      setUrl(dialogueData?.url);
    }
  }, [dialogueData]);

  const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setImage(e?.target?.files[0]);
      setImagePath(URL.createObjectURL(e.target.files[0]));
      setError({ ...error, image: "" });
    }
  };
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  const handleSubmit = (e: any) => {


    if (
      !image ||
      !type ||
      (type == 1 && !serviceId) ||
      (type == 2 && !url) ||
      (type == 2 && !urlRegex.test(url))
    ) {
      let error = {} as ErrorState;
      if (!image) error.image = "Image is required";
      if (!type) error.type = "Type is required";
      if (type == 1 && !serviceId) error.serviceId = "Service is Required";
      if (type == 2 && !url) error.url = "URL is Required";
      if (type == 2 && !urlRegex.test(url)) error.url = "Invalid URL";
      return setError({ ...error });
    } else {
  

      const formData: any = new FormData();
      formData.append("image", image);
      formData.append("type", type);
      if (type == 1) {
        formData.append("serviceId", serviceId);
      } else {
        formData.append("url", url);
      }

      if (dialogueData) {
        let payload = {
          id: dialogueData?._id,
          formData: formData,
        };

        dispatch(updatedBanner(payload));
      } else {
        dispatch(createBanner(formData));
      }

      dispatch(closeDialog());
    }
  };

  const types = [
    { value: 1, name: "Service" },
    { value: 2, name: "URL" },
  ];

  return (
    <>
      <div className="dialog">
        <div className="w-100">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-md-8 col-11">
              <div className="mainDiaogBox">
                <div className="row justify-content-between align-items-center formHead">
                  <div className="col-8">
                    <h2 className="text-theme m0">Banner dialog</h2>
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
                  <div className="col-md-6">
                    <div className="inputData">
                      <label className="  " htmlFor="category">
                        Type
                      </label>
                      <select
                        name="category"
                        className="rounded-2"
                        id="category"
                        value={type}
                        onChange={(e) => {
                          setType(e.target.value);
                          if (!e.target.value) {
                            return setError({
                              ...error,
                              type: "Type is Required !",
                            });
                          } else {
                            setError({
                              ...error,
                              type: "",
                            });
                          }
                        }}
                      >
                        <option value="" disabled selected>
                          --Select Type--
                        </option>
                        {types?.map((data) => {
                          return (
                            <option value={data?.value}>{data?.name}</option>
                          );
                        })}
                      </select>
                      {error?.type && (
                        <p className="errorMessage text-start">
                          {error && error?.type}
                        </p>
                      )}
                    </div>
                  </div>
                  {type == 2 && (
                    <div className="col-6">
                      <ExInput
                        type={`text`}
                        id={`url`}
                        name={`url`}
                        value={url}
                        label={`Url`}
                        defaultValue={dialogueData && dialogueData?.url}
                        placeholder={`https://url.com`}
                        errorMessage={error.url && error.url}
                        onChange={(e: any) => {
                          setUrl(e.target.value);
                          if (!e.target.value) {
                            return setError({
                              ...error,
                              url: `Url is required`,
                            });
                          } else if (!urlRegex.test(e.target.value)) {
                            setError({
                              ...error,
                              url: `Invalid URL format`,
                            });
                          } else {
                            return setError({
                              ...error,
                              url: "",
                            });
                          }
                        }}
                      />
                    </div>
                  )}

                  {type == 1 && (
                    <div className="col-6">
                      <div className="col-12">
                        <div className="inputData">
                          <label className="styleForTitle" htmlFor="serviceId">
                            Select service
                          </label>
                          <select
                            name="service"
                            className="rounded-2 fw-bold"
                            id="serviceId"
                            value={serviceId}
                            onChange={(e) => {
                              setServiceId(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  serviceId: "Service is Required !",
                                });
                              } else {
                                setError({
                                  ...error,
                                  serviceId: "",
                                });
                              }
                            }}
                          >
                            <option value="Select Service" selected disabled>
                              Select Service
                            </option>
                            {service?.map((data) => {
                              return (
                                <option value={data?._id}>{data?.name}</option>
                              );
                            })}
                          </select>
                          {
                            <span className="text-danger">
                              {error.serviceId && error.serviceId}
                            </span>
                          }
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="col-md-6">
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

export default BannerDialogue;
