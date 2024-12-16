import React, { useEffect, useState } from "react";
import RootLayout from "../component/layout/Layout";
import Title from "@/extra/Title";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ExInput, Textarea } from "@/extra/Input";
import { useSelector } from "react-redux";
import { isLoading } from "@/utils/allSelector";
import { RootStore, useAppDispatch } from "@/store/store";
import { getExpertProfile, getExpertReview } from "@/store/expertSlice";
import { useRouter } from "next/router";
import Table from "@/extra/Table";
import Pagination from "@/extra/Pagination";
import { baseURL } from "@/utils/config";

interface Expert {
  _id: string;
  description: string;
  price: number;
  rating?: string;
  review?: string;
  createdAt?: string;
  serviceId: {
    name: string;
    image: string;
  };
}

const ExpertProfile = () => {
  const dispatch = useAppDispatch();
  const { expertProfile, expertReview } = useSelector(
    (state: RootStore) => state.expert
  );

  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const { setting }: any = useSelector((state: RootStore) => state?.setting);


  const src = `https://maps.google.com/maps?q=${expertProfile?.locationCoordinates?.latitude},${expertProfile?.locationCoordinates?.longitude}&hl=es;&output=embed`;
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
    const payload: any = {
      start: page,
      limit: rowsPerPage,
      id,
    };
    dispatch(getExpertReview(payload));
    dispatch(getExpertProfile(id));
  }, [dispatch, id]);

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(1);
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
      Cell: ({ index }) => <span>{(page - 1) * rowsPerPage + index + 1}</span>,
    },

    {
      Header: "Image",
      Cell: ({ row }: { row: Expert }) => (
        <div className="userProfile">
          <img
            src={row && baseURL + row?.serviceId?.image}
            style={{ height: "70px", width: "70px", overflow: "hidden" }}
            alt="salon"
            className="cursor-pointer"
            height={`100%`}
          />
        </div>
      ),
    },

    {
      Header: "Service Name",
      Cell: ({ row }: { row: Expert }) => (
        <span className="text-capitalize fw-bold">{row?.serviceId?.name}</span>
      ),
    },

    {
      Header: "Charge($)",
      Cell: ({ row }: { row: Expert }) => (
        <span className="text-capitalize fw-bold">{row?.price}</span>
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
      Cell: ({ row }: { row: Expert }) => (
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
            {reviewText?.length > 100 && (
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
      Cell: ({ row }: { row: Expert }) => (
        <span className="text-capitalize fw-bold">
          {row?.createdAt?.split("T")[0]}
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="p-3">
        <Title
          name={`${
            expertProfile?.name ? expertProfile?.name : " "
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
                    src={baseURL + expertProfile?.profileImage}
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
                        id={`expertName`}
                        name={`expertName`}
                        value={expertProfile?.name}
                        label={`Expert name`}
                        placeholder={`expertName`}
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
                        value={expertProfile?.email}
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
                        type={`number`}
                        id={`mobileNumber`}
                        name={`mobileNumber`}
                        value={expertProfile?.mobileNumber}
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
                        type={`number`}
                        id={`mobileNumber`}
                        name={`experience`}
                        value={expertProfile?.experience}
                        label={`Experience (years)`}
                        placeholder={`experience`}
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
                          expertProfile?.latitude !== ""
                            ? expertProfile?.latitude
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
                          expertProfile?.longitude !== ""
                            ? expertProfile?.longitude
                            : "-"
                        }
                        label={`longitude`}
                        placeholder={`longitude`}
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
                          <label>About expert</label>
                        </div>
                        <Textarea
                          row={5}
                          value={expertProfile?.yourSelf}
                          readOnly
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row bg-white">
              <div className="col-lg-6 col-md-12 ">
                <div className="m40-top tsBox p-3 br-2">
                  <h5 className="text-center text-theme">Review</h5>
                  <div>
                    <Table
                      type={"client"}
                      data={expertReview}
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
                    totalData={expertReview?.length}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="m40-top tsBox p-3 br-2">
                  <h5 className="text-center text-theme">Services</h5>
                  <Table
                    data={expertProfile?.service}
                    mapData={serviceTable}
                    className="border-0"
                    PerPage={rowsPerPage}
                    Page={page}
                    type={"client"}
                  />

                  <Pagination
                    type={"client"}
                    serverPage={page}
                    setServerPage={setPage}
                    serverPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    totalData={expertProfile?.service?.length}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
ExpertProfile.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export default ExpertProfile;
