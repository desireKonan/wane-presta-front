import Button from "@/extra/Button";
import { ExInput } from "@/extra/Input";
import { closeDialog } from "@/store/dialogSlice";
import {
  allUserNotification,
  expertNotification,
  userNotification,
  userNotificationWithoutImage,
} from "@/store/notificationSlice";
import { RootStore, useAppDispatch } from "@/store/store";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface ErrorState {
  title: string;
  message: string;
  image: string;
  imagePath: string;
}

const NotificationDialog = () => {
  const dispatch = useAppDispatch();
  const { dialogueData } = useSelector((state: RootStore) => state.dialogue);


  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>();
  const [imagePath, setImagePath] = useState<string>();

  const [error, setError] = useState<ErrorState>({
    title: "",
    message: "",
    image: "",
    imagePath: "",
  });

  useEffect(() => {
    if (dialogueData) {
      setTitle(dialogueData?.title);
      setMessage(dialogueData?.message);
      setImagePath(dialogueData?.image);
    }
  }, [dialogueData]);

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setImagePath(URL.createObjectURL(event.target.files[0]));
      setError((prevErrors) => ({ ...prevErrors, image: "" }));
    }
  };

  const handleSubmit = () => {

    if (!title || !message) {
      let error = {} as ErrorState;
      if (!title) error.title = "Title is Required";
      if (!message) error.message = "Message is Required";

      return setError({ ...error });
    } else {
      // if (image?.length !== 0) {
      // let payload;

      if (dialogueData.type === "user") {
        if (image) {
          let formData = new FormData();
          formData.append("title", title);
          formData.append("message", message);
          formData.append("image", image as File);
          formData.append("customerId", dialogueData.id);
          let payload = {
            formData: formData,
            customerId: dialogueData.id,
          };
          dispatch(userNotification(payload)).unwrap();
        } else {
       

          let payload = {
            title: title,
            message: message,
            customerId: dialogueData.id,
          };
          dispatch(userNotificationWithoutImage(payload)).unwrap();
        }
      } else if (dialogueData?.type === "expert") {
        if (image) {
          let formData = new FormData();
          formData.append("title", title);
          formData.append("message", message);
          formData.append("image", image as File);
          formData.append("providerId", dialogueData.id);

          dispatch(expertNotification(formData)).unwrap();
        } else {
          const data = {
            title: title,
            message: message,
            providerId: dialogueData.id,
          };

          dispatch(expertNotification(data)).unwrap();
        }
      } else {
        if (dialogueData.type === "Alluser") {
          if (image) {
            let formdata = new FormData();

            formdata.append("image", image);
            formdata.append("title", title);
            formdata.append("message", message);
            dispatch(allUserNotification(formdata)).unwrap();
          } else {
            let payload = {
              data: {
                title,
                message,
              },
            };
            dispatch(allUserNotification(payload)).unwrap();
          }
        }
      }
      dispatch(closeDialog());
    }
  };

  const handleAllUser = (e: any) => {
    e.preventDefault(); // Prevent default form submission

    let payload;
    if (!title || !message) {
      let error = {} as ErrorState;
      if (!title) error.title = "Title is Required";
      if (!message) error.message = "Message is Required";
      setError({ ...error });
      return;
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("message", message);
      formData.append("image", image as File);

      dispatch(allUserNotification(formData)).unwrap();
      dispatch(closeDialog());
    }
  };

  return (
    <div className="dialog">
      <div className="w-100">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-md-6 col-11">
            <div className="mainDiaogBox">
              <div className="row justify-content-between align-items-center formHead">
                <div className="col-8">
                  <h2 className="text-theme m0">
                    {dialogueData == null
                      ? "User Notification"
                      : "Notification"}
                  </h2>
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
              <div className="row align-items-start formBody">
                <div className="col-6">
                  <ExInput
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    label="Title"
                    placeholder="Title"
                    errorMessage={error && error.title}
                    onChange={(e: any) => {
                      setTitle(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          title: "Title is required",
                        });
                      } else {
                        return setError({
                          ...error,
                          title: "",
                        });
                      }
                    }}
                  />
                </div>

                <div className="col-6">
                  <ExInput
                    type="text"
                    id="message"
                    name="message"
                    value={message}
                    label="Message"
                    placeholder="Message"
                    errorMessage={error && error.message}
                    onChange={(e: any) => {
                      setMessage(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          message: "Message is required",
                        });
                      } else {
                        return setError({
                          ...error,
                          message: "",
                        });
                      }
                    }}
                  />
                </div>

                <div className="col-6">
                  <ExInput
                    label="Image"
                    id="image"
                    type="file"
                    onChange={(e: any) => handleUploadImage(e)}
                    errorMessage={error?.image && error?.image}
                    accept="image/*"
                  />
                  <img
                    src={imagePath !== "" ? imagePath : dialogueData?.image}
                    alt=""
                    draggable="false"
                    className={`${
                      (!imagePath || imagePath === "") && "d-none"
                    }`}
                    data-class="showImage"
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
              </div>
              <div className="row formFooter">
                <div className="col-12 text-end m0">
                  <Button
                    className="bg-gray text-light"
                    text="Cancel"
                    type="button"
                    onClick={() => dispatch(closeDialog())}
                  />
                  {dialogueData && (
                    <Button
                      type="submit"
                      className="text-white m10-left"
                      style={{ backgroundColor: "#1ebc1e" }}
                      text="Submit"
                      onClick={handleSubmit}
                    />
                  )}
                  {dialogueData == null && (
                    <Button
                      type="submit"
                      className="text-white m10-left"
                      style={{ backgroundColor: "#1ebc1e" }}
                      text="Submit"
                      onClick={handleAllUser}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDialog;
