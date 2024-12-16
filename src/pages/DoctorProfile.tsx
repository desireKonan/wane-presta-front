import React, { useEffect, useState } from "react";
import RootLayout from "../component/layout/Layout";
import Title from "@/extra/Title";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ExInput, Textarea } from "@/extra/Input";
import { useSelector } from "react-redux";
import { isLoading } from "@/utils/allSelector";
import { RootStore, useAppDispatch } from "@/store/store";
import {
  deleteDoctorVideo,
  getDoctorProfile,
  getDoctorReview,
  getDoctorVideo,
} from "@/store/doctorSlice";
import {  warning } from "@/utils/Alert";
import { useRouter } from "next/router";
import Table from "@/extra/Table";
import Pagination from "@/extra/Pagination";

interface Doctor {
  _id: string;
  name: string;
  image: string;
  description: string;
  rating?: string;
  review?: string;
  createdAt?: string;
  videoImage?: string;
  videoUrl?: string;
}

const DoctorProfile = () => {
  const dispatch = useAppDispatch();
  const { doctorProfile, doctorReview, doctorVideo } = useSelector(
    (state: RootStore) => state.doctor
  );


  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const { defaultCurrency }: any = useSelector((state: RootStore) => state?.setting);


  const src = `https://maps.google.com/maps?q=${doctorProfile?.locationCoordinates?.latitude},${doctorProfile?.locationCoordinates?.longitude}&hl=es;&output=embed`;
  const loader = useSelector(isLoading);
  const router = useRouter();
  const id: any = router?.query?.id;
  const [type, setType] = useState<string>("address");
  const [data, setData] = useState<any[]>([]);
  const [serviceData, setServiceData] = useState<any[]>([]);
  const [expandedReviews, setExpandedReviews] = useState({});
  const toggleReview = (index: number) => {
    setExpandedReviews((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  useEffect(() => {
    const payload = {
      start: page,
      limit: rowsPerPage,
      id,
    };
    dispatch(getDoctorReview(payload));
    dispatch(getDoctorVideo(id));
    dispatch(getDoctorProfile(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (doctorProfile) {
      //   setData();
    } else {
      //   setData();
    }
  }, []);

  const handleDelete = async (row: any) => {

    try {
      const data = await warning("Delete");
      const yes = data?.isConfirmed;
      if (yes) {
        const id: any = router?.query?.id;

        const paylaod = {
          videoId: row?._id,
          doctorId: id,
        };
        dispatch(deleteDoctorVideo(paylaod));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(0);
  };

  const handleInfo = (id: any) => {
    router.push({
      pathname: "/Comments",
      query: { id: id?._id },
    });
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const serviceTable = [
    {
      Header: "No",
      Cell: ({ index }: { index: any }) => (
        <span>{page * rowsPerPage + parseInt(index) + 1}</span>
      ),
    },
    {
      Header: "Service Name",
      Cell: ({ row }: { row: Doctor }) => (
        <span className="text-capitalize fw-bold">{row?.name}</span>
      ),
    },
    {
      Header: "Image",
      Cell: ({ row }: { row: Doctor }) => (
        <div className="userProfile">
          <img
            src={row && row.image}
            style={{ height: "70px", width: "70px", overflow: "hidden" }}
            alt="salon"
            className="cursor-pointer"
            height={`100%`}
          />
        </div>
      ),
    },
  ];

  const reviewTable = [
    {
      Header: "No",
      Cell: ({ index }: { index: any }) => (
        <span>{page * rowsPerPage + parseInt(index) + 1}</span>
      ),
    },
    {
      Header: "Rating",
      Cell: ({ row }: { row: Doctor }) => (
        <span className="text-capitalize fw-bold">{row?.rating}</span>
      ),
    },

    {
      Header: "Review",
      Cell: ({ row, index }) => {
        const isExpanded = expandedReviews[index];
        const reviewText = row?.review;
        const previewText = reviewText?.substring(0, 30);

        return (
          <span className="text-capitalize fw-bold">
            {isExpanded ? reviewText : previewText}
            {reviewText.length > 100 && (
              <span
                onClick={() => toggleReview(index)}
                className="read-more text-primary bg-none ps-2"
              >
                {isExpanded ? "Read less" : "Read more..."}
              </span>
            )}
          </span>
        );
      },
    },

    {
      Header: "CreatedAt",
      Cell: ({ row }: { row: Doctor }) => (
        <span className="text-capitalize fw-bold">
          {row?.createdAt?.split("T")[0]}
        </span>
      ),
    },
  ];

  const videoTable = [
    {
      Header: "No",
      Cell: ({ index }: { index: any }) => (
        <span>{page * rowsPerPage + parseInt(index) + 1}</span>
      ),
    },

    {
      Header: "Thumbnail",
      Cell: ({ row }: { row: Doctor }) => (
        <div className="userProfile">
          <img
            src={row && row?.videoImage}
            style={{ height: "70px", width: "70px", overflow: "hidden" }}
            alt="salon"
            className="cursor-pointer"
            height={`100%`}
          />
        </div>
      ),
    },

    {
      Header: "Video",
      Cell: ({ row }: { row: Doctor }) => (
        <div className="userProfile">
          <video
            controls
            src={row && row?.videoUrl}
            style={{
              height: "150px",
              width: "150px",
              overflow: "hidden",
              borderRadius: "10px",
            }}
            className="cursor-pointer"
            height={`100%`}
            muted
          />
        </div>
      ),
    },

    {
      Header: "CreatedAt",
      Cell: ({ row }: { row: Doctor }) => (
        <span className="text-capitalize fw-bold">
          {row?.createdAt?.split("T")[0]}
        </span>
      ),
    },

    {
      Header: "Description",
      Cell: ({ row, index }) => {
        const isExpanded = expandedReviews[index];
        const reviewText = row?.description;
        const previewText = reviewText?.substring(0, 30);

        return (
          <span className="text-capitalize fw-bold">
            {isExpanded ? reviewText : previewText}
            {reviewText.length > 30 && (
              <span
                onClick={() => toggleReview(index)}
                className="read-more text-primary bg-none ps-2"
              >
                {isExpanded ? "Read less" : "Read more..."}
              </span>
            )}
          </span>
        );
      },
    },

    {
      Header: "Comments",
      Cell: ({ row }: { row: Doctor }) => (
        <span className="d-flex justify-content-center">
          <button
            className="py-1"
            style={{
              backgroundColor: "#FFF1F1",
              borderRadius: "8px",
              height: "50px",
              width: "50px",
            }}
            onClick={() => handleInfo(row)}
          >
            <i
              className="fa-regular fa-comment-dots"
              style={{ fontSize: "22px" }}
            />
          </button>
        </span>
      ),
    },
    {
      Header: "Delete",
      Cell: ({ row }: { row: Doctor }) => (
        <span className="d-flex justify-content-center">
          <button
            className="py-1"
            style={{ backgroundColor: "#FFF1F1", borderRadius: "8px" }}
            onClick={() => handleDelete(row)}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.9062 5.6875H16.25V5.28125C16.25 4.16122 15.3388 3.25 14.2188 3.25H11.7812C10.6612 3.25 9.75 4.16122 9.75 5.28125V5.6875H6.09375C5.87826 5.6875 5.6716 5.7731 5.51923 5.92548C5.36685 6.07785 5.28125 6.28451 5.28125 6.5V7.71875C5.28125 7.93424 5.36685 8.1409 5.51923 8.29327C5.6716 8.44565 5.87826 8.53125 6.09375 8.53125H19.9062C20.1217 8.53125 20.3284 8.44565 20.4808 8.29327C20.6331 8.1409 20.7188 7.93424 20.7188 7.71875V6.5C20.7188 6.28451 20.6331 6.07785 20.4808 5.92548C20.3284 5.7731 20.1217 5.6875 19.9062 5.6875ZM11.375 5.28125C11.375 5.05741 11.5574 4.875 11.7812 4.875H14.2188C14.4426 4.875 14.625 5.05741 14.625 5.28125V5.6875H11.375V5.28125ZM19.6137 9.60984C19.5376 9.52606 19.4448 9.45912 19.3412 9.4133C19.2377 9.36747 19.1257 9.34379 19.0125 9.34375H6.9875C6.87427 9.3438 6.7623 9.36751 6.65877 9.41335C6.55524 9.4592 6.46242 9.52616 6.38628 9.60996C6.31013 9.69376 6.25233 9.79254 6.21657 9.89997C6.18082 10.0074 6.1679 10.1211 6.17866 10.2338L7.17722 20.6696C7.29056 21.8558 8.33422 22.7504 9.60497 22.7504H16.395C17.6654 22.7504 18.7094 21.8558 18.8228 20.6696L19.8213 10.2338C19.8321 10.1211 19.8193 10.0074 19.7835 9.8999C19.7477 9.79244 19.6899 9.69364 19.6137 9.60984ZM11.1012 20.7171C11.0837 20.7179 11.0667 20.7187 11.0492 20.7187C10.8427 20.7185 10.644 20.6397 10.4936 20.4983C10.3431 20.3569 10.2521 20.1635 10.2391 19.9574L9.75163 12.2387C9.73816 12.0237 9.81061 11.8121 9.95306 11.6504C10.0955 11.4888 10.2963 11.3903 10.5113 11.3766C10.7262 11.3636 10.9376 11.4362 11.0991 11.5786C11.2607 11.7209 11.3593 11.9215 11.3734 12.1363L11.8609 19.8551C11.8743 20.0701 11.8019 20.2817 11.6594 20.4433C11.517 20.605 11.3162 20.7034 11.1012 20.7171ZM15.7609 19.9574C15.7547 20.0643 15.7274 20.1689 15.6807 20.2652C15.634 20.3615 15.5686 20.4477 15.4885 20.5186C15.4084 20.5896 15.315 20.6441 15.2138 20.6789C15.1125 20.7137 15.0054 20.7281 14.8985 20.7213C14.7917 20.7146 14.6872 20.6868 14.5912 20.6396C14.4951 20.5923 14.4093 20.5266 14.3388 20.4461C14.2682 20.3656 14.2142 20.2719 14.18 20.1705C14.1457 20.0691 14.1318 19.9619 14.1391 19.8551L14.6266 12.1363C14.6413 11.9221 14.7401 11.7223 14.9016 11.5807C15.0631 11.4392 15.2741 11.3673 15.4884 11.3808C15.7028 11.3944 15.903 11.4922 16.0454 11.6529C16.1878 11.8137 16.2608 12.0243 16.2484 12.2387L15.7609 19.9574Z"
                fill="#ED1717"
              />
            </svg>
          </button>
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="p-3">
        <Title
          name={`${
            doctorProfile?.name ? doctorProfile?.name : " "
          }'s   Profile`}
        />
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-12">
                {loader === true ? (
                  <>
                    <SkeletonTheme baseColor="#e2e5e7" highlightColor="#fff">
                      <p className="d-flex justify-content-center">
                        <Skeleton
                          height={380}
                          width={380}
                          style={{
                            height: "380px",
                            width: "380px",
                            objectFit: "cover",
                            boxSizing: "border-box",
                            borderRadius: "30px",
                          }}
                        />
                      </p>
                    </SkeletonTheme>
                  </>
                ) : (
                  <img
                    src={doctorProfile?.image}
                    className="img-fluid"
                    style={{
                      height: "380px",
                      width: "380px",
                      objectFit: "cover",
                      boxSizing: "border-box",
                      borderRadius: "30px",
                    }}
                    alt=""
                  />
                )}
              </div>
              <div className="col-lg-8 col-md-6 col-12">
                <div className="row">
                  <div className="col-md-4">
                    {loader === true ? (
                      <>
                        <SkeletonTheme
                          baseColor="#e2e5e7"
                          highlightColor="#fff"
                        >
                          <p className="d-flex justify-content-center my-3">
                            <Skeleton
                              height={40}
                              width={250}
                              style={{
                                borderRadius: "10px",
                              }}
                            />
                          </p>
                        </SkeletonTheme>
                      </>
                    ) : (
                      <ExInput
                        id={`doctorName`}
                        name={`doctorName`}
                        value={doctorProfile?.name}
                        label={`Doctor name`}
                        placeholder={`doctorName`}
                        readOnly
                      />
                    )}
                  </div>
                  <div className="col-md-4">
                    {loader === true ? (
                      <>
                        <SkeletonTheme
                          baseColor="#e2e5e7"
                          highlightColor="#fff"
                        >
                          <p className="d-flex justify-content-center my-3">
                            <Skeleton
                              height={40}
                              width={250}
                              style={{
                                borderRadius: "10px",
                              }}
                            />
                          </p>
                        </SkeletonTheme>
                      </>
                    ) : (
                      <ExInput
                        id={`email`}
                        name={`email`}
                        value={doctorProfile?.email}
                        label={`Email`}
                        placeholder={`email`}
                        readOnly
                      />
                    )}
                  </div>
                  <div className="col-md-4">
                    {loader === true ? (
                      <>
                        <SkeletonTheme
                          baseColor="#e2e5e7"
                          highlightColor="#fff"
                        >
                          <p className="d-flex justify-content-center my-3">
                            <Skeleton
                              height={40}
                              width={250}
                              style={{
                                borderRadius: "10px",
                              }}
                            />
                          </p>
                        </SkeletonTheme>
                      </>
                    ) : (
                      <ExInput
                        id={`charge`}
                        name={`charge`}
                        value={
                          doctorProfile?.charge ? doctorProfile?.charge : ""
                        }
                        label={`Charge (${defaultCurrency?.symbol})`}
                        placeholder={`Charge`}
                        readOnly
                      />
                    )}
                  </div>
                  <div className="col-md-4">
                    {loader === true ? (
                      <>
                        <SkeletonTheme
                          baseColor="#e2e5e7"
                          highlightColor="#fff"
                        >
                          <p className="d-flex justify-content-center my-3">
                            <Skeleton
                              height={40}
                              width={250}
                              style={{
                                borderRadius: "10px",
                              }}
                            />
                          </p>
                        </SkeletonTheme>
                      </>
                    ) : (
                      <ExInput
                        type={`number`}
                        id={`mobileNumber`}
                        name={`mobileNumber`}
                        value={doctorProfile?.mobile}
                        label={`Mobile number`}
                        placeholder={`mobileNumber`}
                        readOnly
                      />
                    )}
                  </div>
                  <div className="col-md-4">
                    {loader === true ? (
                      <>
                        <SkeletonTheme
                          baseColor="#e2e5e7"
                          highlightColor="#fff"
                        >
                          <p className="d-flex justify-content-center my-3">
                            <Skeleton
                              height={40}
                              width={250}
                              style={{
                                borderRadius: "10px",
                              }}
                            />
                          </p>
                        </SkeletonTheme>
                      </>
                    ) : (
                      <ExInput
                        id={`latitude`}
                        name={`latitude`}
                        value={
                          doctorProfile?.latitude !== ""
                            ? doctorProfile?.latitude
                            : "-"
                        }
                        label={`Latitude`}
                        placeholder={`latitude`}
                        readOnly
                      />
                    )}
                  </div>
                  <div className="col-md-4">
                    {loader === true ? (
                      <>
                        <SkeletonTheme
                          baseColor="#e2e5e7"
                          highlightColor="#fff"
                        >
                          <p className="d-flex justify-content-center my-3">
                            <Skeleton
                              height={40}
                              width={250}
                              style={{
                                borderRadius: "10px",
                              }}
                            />
                          </p>
                        </SkeletonTheme>
                      </>
                    ) : (
                      <ExInput
                        id={`longitude`}
                        name={`longitude`}
                        value={
                          doctorProfile?.longitude !== ""
                            ? doctorProfile?.longitude
                            : "-"
                        }
                        label={`longitude`}
                        placeholder={`longitude`}
                        readOnly
                      />
                    )}
                  </div>

                  <div className="col-md-4">
                    {loader === true ? (
                      <>
                        <SkeletonTheme
                          baseColor="#e2e5e7"
                          highlightColor="#fff"
                        >
                          <p className="d-flex justify-content-center my-3">
                            <Skeleton
                              height={40}
                              width={250}
                              style={{
                                borderRadius: "10px",
                              }}
                            />
                          </p>
                        </SkeletonTheme>
                      </>
                    ) : (
                      <ExInput
                        id={`type`}
                        name={`type`}
                        value={
                          doctorProfile?.type == 1
                            ? "Online"
                            : doctorProfile?.type == 2
                            ? "Clinic"
                            : "Both"
                        }
                        label={`Type`}
                        placeholder={`Type`}
                        readOnly
                      />
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    {loader === true ? (
                      <>
                        <SkeletonTheme
                          baseColor="#e2e5e7"
                          highlightColor="#fff"
                        >
                          <p className="d-flex justify-content-center my-3">
                            <Skeleton
                              height={150}
                              width={850}
                              style={{
                                borderRadius: "10px",
                              }}
                            />
                          </p>
                        </SkeletonTheme>
                      </>
                    ) : (
                      <>
                        <div className="inputData number  flex-row justify-content-start text-start">
                          <label>About doctor</label>
                        </div>
                        <Textarea
                          row={5}
                          value={doctorProfile?.yourSelf}
                          readOnly
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="my-2"
              style={{
                width: "291px",
                border: "1px solid #1c2b20",
                padding: "4px",
                borderRadius: "40px",
              }}
            >
              <button
                type="button"
                className={`${
                  type === "address" ? "activeBtn" : "disabledBtn"
                }`}
                onClick={() => setType("address")}  
              >
                Address
              </button>
              <button
                type="button"
                className={`${
                  type === "review" ? "activeBtn" : "disabledBtn"
                } ms-1`}
                onClick={() => setType("review")}
              >
                Review
              </button>

              <button
                type="button"
                className={`${
                  type === "video" ? "activeBtn" : "disabledBtn"
                } ms-1`}
                onClick={() => setType("video")}
              >
                Video
              </button>
            </div>
            {type === "address" && (
              <div className="row">
                <div className="col-lg-4">
                  {loader === true ? (
                    <>
                      <SkeletonTheme baseColor="#e2e5e7" highlightColor="#fff">
                        <p className="d-flex justify-content-center my-3">
                          <Skeleton
                            height={40}
                            width={400}
                            style={{
                              borderRadius: "10px",
                            }}
                          />
                        </p>
                      </SkeletonTheme>
                    </>
                  ) : (
                    <ExInput
                      id={`address`}
                      name={`address`}
                      value={doctorProfile?.address}
                      label={`Address`}
                      placeholder={`address`}
                      readOnly
                    />
                  )}
                </div>

                <div className="col-lg-4">
                  {loader === true ? (
                    <>
                      <SkeletonTheme baseColor="#e2e5e7" highlightColor="#fff">
                        <p className="d-flex justify-content-center my-3">
                          <Skeleton
                            height={40}
                            width={400}
                            style={{
                              borderRadius: "10px",
                            }}
                          />
                        </p>
                      </SkeletonTheme>
                    </>
                  ) : (
                    <ExInput
                      id={`country`}
                      name={`country`}
                      value={doctorProfile?.country}
                      label={`Country`}
                      placeholder={`country`}
                      readOnly
                    />
                  )}
                </div>
                <div>
                  <label className="fw-bold mb-2">Map</label>
                  <iframe
                    src={src}
                    id="iframeId"
                    height="500px"
                    title="doctorLocation"
                    width="100%"
                  ></iframe>
                </div>
              </div>
            )}

            {type === "review" && (
              <>
                <div className="row bg-white">
                  <div className="col-lg-6 col-md-12 ">
                    <div className="m40-top tsBox p-3 br-2">
                      <h5 className="text-center text-theme">Review</h5>
                      <div>
                        <Table
                          type={"client"}
                          data={doctorReview}
                          mapData={reviewTable}
                          PerPage={rowsPerPage}
                          Page={page}
                          className="border-0"
                        />
                      </div>

                      <Pagination
                        type={"client"}
                        serverPage={page}
                        setServerPage={setPage}
                        serverPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        totalData={doctorReview?.length}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="m40-top tsBox p-3 br-2">
                      <h5 className="text-center text-theme">Services</h5>
                      <Table
                        data={doctorProfile?.service}
                        mapData={serviceTable}
                        className="border-0"
                        PerPage={rowsPerPage}
                        Page={page}
                        type={"client"}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {type === "video" && (
              <>
                <div className="row bg-white">
                  <div className="col-lg-12 col-md-12 ">
                    <div className="m40-top tsBox p-3 br-2">
                      <h5 className="text-center text-theme">Video</h5>
                      <div>
                        <Table
                          type={"client"}
                          data={doctorVideo}
                          mapData={videoTable}
                          PerPage={rowsPerPage}
                          Page={page}
                          className="border-0"
                        />
                      </div>

                      <Pagination
                        type={"client"}
                        serverPage={page}
                        setServerPage={setPage}
                        serverPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        totalData={doctorReview?.length}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
DoctorProfile.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export default DoctorProfile;
