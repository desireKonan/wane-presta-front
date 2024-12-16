import React, { useEffect, useState } from "react";
import RootLayout from "../component/layout/Layout";
import Title from "@/extra/Title";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ExInput, Textarea } from "@/extra/Input";
import { useSelector } from "react-redux";
import { isLoading } from "@/utils/allSelector";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "next/router";
import Table from "@/extra/Table";
import Pagination from "@/extra/Pagination";
import { getUserProfile, getUserWalletHistory } from "@/store/userSlice";
import Analytics from "@/extra/Analytic";
import { baseURL } from "@/utils/config";

interface DoctorService {
  _id: string;
  name: string;
  image: string;
  description: string;
}

interface rechargeTable {
  _id?: string;
  user?: {
    name: string;
  };
  date?: string;
  amount?: any;
  paymentGateway?: any;
  time?: string;
  currencySymbol?: any;
  uniqueId?: any;
}

interface RootStore {
  setting: any;
  user: {
    userProfile: any;
    userWalletHistory: any;
    user: any;
  };
}

const UserProfile = () => {
  const { userProfile, user } = useSelector((state: RootStore) => state.user);

  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);

  const loader = useSelector(isLoading);
  const router = useRouter();
  const id: any = router?.query?.id;

  const [type, setType] = useState<string>("wallet_history");
  const [data, setData] = useState<any[]>([]);
  const [startDate, setStartDate] = useState("All");
  const [endDate, setEndDate] = useState("All");
  const { setting } = useSelector((state: RootStore) => state.setting);
  const { userWalletHistory } = useSelector((state: RootStore) => state.user);
  const [status, setStatus] = useState<any>("All");

  const dispatch = useAppDispatch();

  useEffect(() => {
    const payload: any = {
      startDate,
      endDate,
      status,
      id,
    };
    dispatch(getUserProfile(id));
    dispatch(getUserWalletHistory(payload));
  }, [dispatch, id, startDate, endDate, status]);

  const bookingType = [
    { name: "All", value: "All" },
    { name: "Credit", value: 1 },
    { name: "Debit", value: 2 },
  ];

  useEffect(() => {
    const iframeData = document.getElementById("iframeId");

    if (iframeData) {
      // iframeData.src = `https://maps.google.com/maps?q=${doctorProfile?.locationCoordinates?.latitude},${doctorProfile?.locationCoordinates?.longitude}&hl=es;&output=embed`;
    }
  }, []);

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(0);
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
      Cell: ({ row }: { row: DoctorService }) => (
        <span className="text-capitalize fw-bold">{row?.name}</span>
      ),
    },
    {
      Header: "Image",
      Cell: ({ row }: { row: DoctorService }) => (
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

  const rechargeTable = [
    {
      Header: "No",
      Cell: ({ index }: { index: any }) => (
        <span>{(page - 1) * rowsPerPage + index + 1}</span>
      ),
    },

    {
      Header: `Transaction Id`,
      Cell: ({ row }: { row: rechargeTable }) => (
        <span className="text-capitalize fw-bold">{row?.uniqueId}</span>
      ),
    },

    {
      Header: "Payment Gateway",
      Cell: ({ row }: { row: rechargeTable }) => (
        <span className="text-capitalize fw-bold">
          {row?.paymentGateway === 1
            ? "Razorpay"
            : row?.paymentGateway === 2
            ? "Stripe"
            : "Flutter"}
        </span>
      ),
    },

    {
      Header: `Amount ($)`,
      Cell: ({ row }: { row: rechargeTable }) => (
        <span className="text-capitalize fw-bold">{row?.amount}</span>
      ),
    },

    {
      Header: `${status == 1 ? "ABC" : "Date"}`,
      Cell: ({ row }: { row: rechargeTable }) => (
        <span className="text-capitalize fw-bold">{`${row?.date}`}</span>
      ),
    },

    {
      Header: "Time",
      Cell: ({ row }: { row: rechargeTable }) => (
        <span className="text-capitalize fw-bold">{row?.time}</span>
      ),
    },

    {
      Header: "Dr/Cr",
      Cell: ({ row }) =>
        row?.type === 2 ? (
          <button
            className="m5-right p12-x p4-y fs-12 br-5 text-white"
            style={{ backgroundColor: "red" }}
            // onClick={() => handlePendingOpenDialogue(row)}
          >
            Debit
          </button>
        ) : (
          <button
            className="text-white m5-right p12-x p4-y fs-12 br-5"
            style={{ background: "green" }}
            // onClick={() => handleConfirmDialogue(row)}
          >
            Credit
          </button>
        ),
    },
  ];

  return (
    <>
      <div className="p-3">
        <Title
          name={`${userProfile?.name ? userProfile?.name : " "}'s   Profile`}
        />
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-12">
                {loader === true ? (
                  <>
                    <SkeletonTheme baseColor="#e2e5e7" highlightColor="#fff">
                      <p className="d-flex justify-content-center ">
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
                    src={baseURL + userProfile?.profileImage}
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
                        id={`name`}
                        name={`name`}
                        value={userProfile?.name}
                        label={`Name`}
                        placeholder={`Name`}
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
                        id={`uniqueId`}
                        name={`uniqueId`}
                        value={
                          userProfile?.uniqueId ? userProfile?.uniqueId : ""
                        }
                        label={`unique Id`}
                        placeholder={`UniqueId`}
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
                        value={
                          userProfile?.mobileNumber !== ""
                            ? userProfile?.mobileNumber
                            : "-"
                        }
                        label={`Mobile number`}
                        placeholder={`mobilenumber`}
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
                        id={`gender`}
                        name={`gender`}
                        value={userProfile?.gender}
                        label={`Gender`}
                        placeholder={`Gender`}
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
                        id={`age`}
                        name={`age`}
                        value={
                          userProfile?.age > 0 && userProfile?.age !== ""
                            ? userProfile?.age
                            : "-"
                        }
                        label={`Age`}
                        placeholder={`Age`}
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
                        id={`emailId`}
                        name={`emailId`}
                        value={userProfile?.email}
                        label={`EmailId`}
                        placeholder={`Email Id`}
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
                        id={`loginType`}
                        name={`loginType`}
                        value={
                          userProfile?.loginType === 2
                            ? "Google"
                            : userProfile?.loginType === 1
                            ? "Phone"
                            : ""
                        }
                        label={`Login type`}
                        placeholder={`logintype`}
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
                        id={`loginType`}
                        name={`loginType`}
                        value={userProfile?.amount + " $"}
                        label={`Wallet balance`}
                        placeholder={`Wallet balance`}
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
                          <label>Bio</label>
                        </div>
                        <Textarea
                          row={5}
                          value={
                            userProfile?.bio !== "" ? userProfile?.bio : "-"
                          }
                          readOnly
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {type === "review" && (
              <>
                <div className="row bg-white">
                  <div className="col-lg-6 col-md-12 ">
                    <div className="m40-top tsBox p-3 br-2">
                      <h5 className="text-center text-theme">Review</h5>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="m40-top tsBox p-3 br-2">
                      <h5 className="text-center text-theme">Services</h5>
                      <Table
                        data={userProfile?.service}
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
                        totalData={data?.length}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="row mt-4">
          <div className="inputData col-2">
            <label className="styleForTitle" htmlFor="bookingType">
              Transaction type
            </label>
            <select
              name="bookingType"
              className="rounded-2 fw-bold"
              id="bookingType"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              {bookingType?.map((data) => {
                return <option value={data?.value}>{data?.name}</option>;
              })}
            </select>
          </div>
          <div className="col-3">
            <div className="inputData">
              <label>Analytic</label>
            </div>
            <div>
              <Analytics
                analyticsStartDate={startDate}
                analyticsStartEnd={endDate}
                analyticsStartDateSet={setStartDate}
                analyticsStartEndSet={setEndDate}
              />
            </div>
          </div>
        </div>
        <div className="mt-3">
          <h5 className="text-center text-theme">USER WALLET HISTORY</h5>

          <div className="mt-3">
            <Table
              type={"client"}
              data={userWalletHistory}
              mapData={rechargeTable}
              PerPage={rowsPerPage}
              Page={page}
            />
          </div>
        </div>
      </div>
    </>
  );
};
UserProfile.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export default UserProfile;
