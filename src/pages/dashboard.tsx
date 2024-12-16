import RootLayout from "@/component/layout/Layout";
import Analytics from "@/extra/Analytic";
import Table from "@/extra/Table";
import Title from "@/extra/Title";
import {
  getChartData,
  getDashboardData,
  getTopProvidersData,
  getUpcomingBookings,
} from "@/store/dashboardSlice";
import { RootStore, useAppDispatch } from "@/store/store";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Male from "../assets/images/male.png";
import { isLoading } from "@/utils/allSelector";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { baseURL } from "@/utils/config";

// interface dashboardData {
//   appointments?: number;
//   doctors?: number;
//   earning?: number;
//   revenue?: number;
//   users?: number;
// }

interface topProviderData {
  profileImage?: string;
  name?: string;
  doctorEarning?: number;
  appointment?: number;
  maskType?: string;
  earning?: number;
  avgRating?: number;
}

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState([]);
  const [counts, setCounts] = useState([]);
  const [nextBooking, setNextBooking] = useState([]);

  const [startDate, setStartDate] = useState("All");
  const [endDate, setEndDate] = useState("All");
  const loader = useSelector<any>(isLoading);
  const { setting }: any = useSelector((state: RootStore) => state?.setting);

  const router = useRouter();

  useEffect(() => {
    let payload: any = {
      startDate,
      endDate,
    };
    dispatch(getDashboardData(payload));
    dispatch(getTopProvidersData(payload));
    dispatch(getUpcomingBookings(payload));
    // dispatch(getChartData(payload));
  }, [dispatch, startDate, endDate]);

  const dashboard: any = useSelector((state: RootStore) => state.dashboard);

  const topProviderData = [
    {
      Header: `${"No"}`,
      Cell: ({ index }: { index: number }) => <span>{index + 1}</span>,
    },
    {
      Header: `Image`,
      Cell: ({ row }: { row: topProviderData }) => (
        <div className="userProfile">
          <img
            src={row && baseURL + row.profileImage}
            style={{ height: "70px", width: "70px", overflow: "hidden" }}
            alt="salon"
            className="cursor-pointer"
            height={`100%`}

            // onError={(e) => {
            //   e.target.src = Male;
            // }}
          />
        </div>
      ),
    },

    {
      Header: "Name",
      Cell: ({ row }: { row: topProviderData }) => <span>{row?.name}</span>,
    },

    {
      Header: "Earnings",
      Cell: ({ row }: { row: topProviderData }) => (
        <span className="fw-bold">{row?.earning?.toFixed(0)}</span>
      ),
    },
    {
      Header: "Rating",
      Cell: ({ row }: { row: topProviderData }) => (
        <span className="fw-bold">{row?.avgRating?.toFixed(0)}</span>
      ),
    },
  ];

  const upcomingBookingsData = [
    {
      Header: `${"No"}`,
      Cell: ({ index }: { index: number }) => <span>{index + 1}</span>,
    },
    {
      Header: "User",
      thClass: "text-nowrap",
      Cell: ({ row }: { row: any }) => (
        <div className="d-flex align-items-center text-nowrap">
          <div>
            <img
              src={
                row?.customer?.profileImage &&
                baseURL + row?.customer?.profileImage
              }
              height={50}
              width={50}
              alt=""
              className=""
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              // onError={(e: any) => {
              //   e.currentTarget.src = Male;
              // }}
            />
          </div>
          <span className="ms-3 fw-bold fs-15 p8-top text-start">
            {row?.customer?.name}

          </span>
        </div>
      ),
    },
    {
      Header: "Expert",
      thClass: "text-nowrap",
      Cell: ({ row }: { row: any }) => (
        <span className="text-nowrap">{row?.provider?.name}</span>
      ),
    },

    {
      Header: "Service Name",
      thClass: "text-nowrap",
      Cell: ({ row }: { row: any }) => (
        <span className="text-nowrap">{row?.service?.name}</span>
      ),
    },

    {
      Header: "Date",
      thClass: "text-nowrap",
      Cell: ({ row }: { row: any }) => (
        <span className="text-nowrap">{row?.date}</span>
      ),
    },
    {
      Header: "Time",
      thClass: "text-nowrap",
      Cell: ({ row }: { row: any }) => (
        <span className="text-nowrap">{row?.time}</span>
      ),
    },
  ];

  function ListItem({ loading, children }: any) {
    return (
      <div className="list-item">
        {loading ? <Skeleton style={{ height: "45px" }} /> : children}
      </div>
    );
  }

  return (
    <div className="mainDashboard">
      <div className="dashBoardHead">
        <h3 className="m3-bottom text-start">WELCOME ADMIN!</h3>
        <div className="row mb-0">
          <div className="col-12 col-md-3 mb-0 d-flex align-items-center">
            <Title name="DASHBOARD" display={"none"} bottom={"0"} />
          </div>

          <div className="col-md-9 col-12 mb-0 d-flex justify-content-end">
            <Analytics
              analyticsStartDate={startDate}
              analyticsStartEnd={endDate}
              analyticsStartDateSet={setStartDate}
              analyticsStartEndSet={setEndDate}
              direction={"end"}
            />
          </div>
        </div>
      </div>
      <div className="mainDashbox">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-3">
            {loader ? (
              <>
                <SkeletonTheme baseColor="#e2e5e7" highlightColor="#fff">
                  <div className="row">
                    <div className="col-5">
                      <Skeleton
                        height={100}
                        width={100}
                        style={{
                          height: "380px",
                          width: "380px",
                          objectFit: "cover",
                          boxSizing: "border-box",
                          borderTopLeftRadius: "30px",
                          borderBottomLeftRadius: "30px",
                          border: "1px solid #e2e5e7",
                        }}
                        className="col-5"
                      />
                    </div>
                    <div className="col-7 mt-2">
                      <Skeleton width={150} height={10} />
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Skeleton width={50} height={50} className="mt-2" />
                      </div>
                    </div>
                  </div>
                </SkeletonTheme>
              </>
            ) : (
              <DashBox
                title={`${"TOTAL CUSTOMERS"}`}
                dashSVG={
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30 26.5385C35.0981 26.5385 39.2308 22.4057 39.2308 17.3077C39.2308 12.2097 35.0981 8.07693 30 8.07693C24.902 8.07693 20.7693 12.2097 20.7693 17.3077C20.7693 22.4057 24.902 26.5385 30 26.5385Z"
                      stroke="white"
                      stroke-width="3.4"
                    />
                    <path
                      d="M43.8462 24.2308C47.6698 24.2308 50.7693 21.6478 50.7693 18.4615C50.7693 15.2753 47.6698 12.6923 43.8462 12.6923"
                      stroke="white"
                      stroke-width="3.4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M16.154 24.2308C12.3305 24.2308 9.23096 21.6478 9.23096 18.4615C9.23096 15.2753 12.3305 12.6923 16.154 12.6923"
                      stroke="white"
                      stroke-width="3.4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M30.0002 51.9231C37.6472 51.9231 43.8463 47.7903 43.8463 42.6923C43.8463 37.5943 37.6472 33.4615 30.0002 33.4615C22.3532 33.4615 16.1541 37.5943 16.1541 42.6923C16.1541 47.7903 22.3532 51.9231 30.0002 51.9231Z"
                      stroke="white"
                      stroke-width="3.4"
                    />
                    <path
                      d="M48.4617 47.3077C52.5098 46.4199 55.3847 44.1718 55.3847 41.5385C55.3847 38.9051 52.5098 36.657 48.4617 35.7692"
                      stroke="white"
                      stroke-width="3.4"
                      stroke-linecap="round"
                    />
                    <path
                      d="M11.5386 47.3077C7.49028 46.4199 4.61548 44.1718 4.61548 41.5385C4.61548 38.9051 7.49028 36.657 11.5386 35.7692"
                      stroke="white"
                      stroke-width="3.4"
                      stroke-linecap="round"
                    />
                  </svg>
                }
                amount={dashboard?.dashboardData?.totalCustomers?.toFixed()}
                onClick={() =>
                  router.push({
                    pathname: "/User",
                  })
                }
              />
            )}
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-3">
            {loader ? (
              <>
                <SkeletonTheme baseColor="#e2e5e7" highlightColor="#fff">
                  <div className="row">
                    <div className="col-5">
                      <Skeleton
                        height={100}
                        width={100}
                        style={{
                          height: "380px",
                          width: "380px",
                          objectFit: "cover",
                          boxSizing: "border-box",
                          borderTopLeftRadius: "30px",
                          borderBottomLeftRadius: "30px",
                          border: "1px solid #e2e5e7",
                        }}
                        className="col-5"
                      />
                    </div>
                    <div className="col-7 mt-2">
                      <Skeleton width={150} height={10} />
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Skeleton width={50} height={50} className="mt-2" />
                      </div>
                    </div>
                  </div>
                </SkeletonTheme>
              </>
            ) : (
              <DashBox
                title="TOTAL EXPERTS"
                dashSVG={
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_100_75959)">
                      <mask
                        id="mask0_100_75959"
                        mask-type="luminance"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="42"
                        height="42"
                      >
                        <path
                          d="M40.9999 41V1.00012H1V41H40.9999Z"
                          fill="white"
                          stroke="white"
                          stroke-width="2"
                        />
                      </mask>
                      <g mask="url(#mask0_100_75959)">
                        <path
                          d="M29.3242 5.30038C28.3765 4.03671 27.1475 3.01105 25.7347 2.30465C24.3219 1.59824 22.764 1.23048 21.1844 1.23049H20.8154C19.2358 1.23048 17.6779 1.59824 16.2651 2.30465C14.8523 3.01106 13.6234 4.03671 12.6757 5.30038L12.6754 5.3007C12.0904 6.08072 11.7742 7.02939 11.7742 8.00436V13.0921C11.7742 18.1874 15.9047 22.3179 21 22.3179C26.0952 22.3179 30.2257 18.1874 30.2257 13.0921V8.00436C30.2257 7.02937 29.9095 6.08069 29.3245 5.3007L29.3242 5.30038Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.7742 11.7742H11.7743C12.6181 11.7741 13.4273 11.439 14.024 10.8424L15.7281 9.13827H15.7282C17.365 9.95672 19.1699 10.3828 21 10.3828C22.83 10.3828 24.6349 9.95672 26.2717 9.13827H26.2718L27.9759 10.8424C28.5726 11.439 29.3818 11.7741 30.2256 11.7742H30.2257"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M40.7694 40.7695L37.9954 32.4475C37.6356 31.3679 37.0023 30.3999 36.1572 29.6378C35.3121 28.8757 34.2841 28.3453 33.1733 28.0984L24.9538 26.2719L20.9999 32.8617L17.046 26.2719L8.82662 28.0984C7.71575 28.3453 6.68774 28.8757 5.84268 29.6378C4.99763 30.3999 4.36432 31.3679 4.00443 32.4475L1.23047 40.7695"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M17.046 26.272V21.6335"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M24.9539 26.272V21.6335"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M27.5898 40.7695H26.2719V36.8156C26.2718 36.2964 26.3741 35.7823 26.5728 35.3026C26.7715 34.8229 27.0628 34.387 27.43 34.0199C27.7971 33.6527 28.233 33.3614 28.7127 33.1627C29.1924 32.964 29.7065 32.8617 30.2257 32.8617C32.4094 32.8617 34.1796 34.632 34.1796 36.8156V40.7695H32.8617"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M30.2257 31.5437V27.4434"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.7742 35.4976C10.3194 35.4976 9.13831 36.6787 9.13831 38.1335C9.13831 39.5884 10.3194 40.7695 11.7742 40.7695C13.229 40.7695 14.4101 39.5884 14.4101 38.1335C14.4101 36.6787 13.229 35.4976 11.7742 35.4976ZM11.7742 35.4976V27.4433"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_100_75959">
                        <rect width="42" height="42" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                }
                amount={dashboard?.dashboardData?.totalProviders?.toFixed()}
                onClick={() =>
                  router.push({
                    pathname: "/Expert",
                  })
                }
              />
            )}
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-3">
            {loader ? (
              <>
                <SkeletonTheme baseColor="#e2e5e7" highlightColor="#fff">
                  <div className="row">
                    <div className="col-5">
                      <Skeleton
                        height={100}
                        width={100}
                        style={{
                          height: "380px",
                          width: "380px",
                          objectFit: "cover",
                          boxSizing: "border-box",
                          borderTopLeftRadius: "30px",
                          borderBottomLeftRadius: "30px",
                          border: "1px solid #e2e5e7",
                        }}
                        className="col-5"
                      />
                    </div>
                    <div className="col-7 mt-2">
                      <Skeleton width={150} height={10} />
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Skeleton width={50} height={50} className="mt-2" />
                      </div>
                    </div>
                  </div>
                </SkeletonTheme>
              </>
            ) : (
              <DashBox
                title="TOTAL SERVICES"
                dashSVG={
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_100_75959)">
                      <mask
                        id="mask0_100_75959"
                        mask-type="luminance"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="42"
                        height="42"
                      >
                        <path
                          d="M40.9999 41V1.00012H1V41H40.9999Z"
                          fill="white"
                          stroke="white"
                          stroke-width="2"
                        />
                      </mask>
                      <g mask="url(#mask0_100_75959)">
                        <path
                          d="M29.3242 5.30038C28.3765 4.03671 27.1475 3.01105 25.7347 2.30465C24.3219 1.59824 22.764 1.23048 21.1844 1.23049H20.8154C19.2358 1.23048 17.6779 1.59824 16.2651 2.30465C14.8523 3.01106 13.6234 4.03671 12.6757 5.30038L12.6754 5.3007C12.0904 6.08072 11.7742 7.02939 11.7742 8.00436V13.0921C11.7742 18.1874 15.9047 22.3179 21 22.3179C26.0952 22.3179 30.2257 18.1874 30.2257 13.0921V8.00436C30.2257 7.02937 29.9095 6.08069 29.3245 5.3007L29.3242 5.30038Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.7742 11.7742H11.7743C12.6181 11.7741 13.4273 11.439 14.024 10.8424L15.7281 9.13827H15.7282C17.365 9.95672 19.1699 10.3828 21 10.3828C22.83 10.3828 24.6349 9.95672 26.2717 9.13827H26.2718L27.9759 10.8424C28.5726 11.439 29.3818 11.7741 30.2256 11.7742H30.2257"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M40.7694 40.7695L37.9954 32.4475C37.6356 31.3679 37.0023 30.3999 36.1572 29.6378C35.3121 28.8757 34.2841 28.3453 33.1733 28.0984L24.9538 26.2719L20.9999 32.8617L17.046 26.2719L8.82662 28.0984C7.71575 28.3453 6.68774 28.8757 5.84268 29.6378C4.99763 30.3999 4.36432 31.3679 4.00443 32.4475L1.23047 40.7695"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M17.046 26.272V21.6335"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M24.9539 26.272V21.6335"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M27.5898 40.7695H26.2719V36.8156C26.2718 36.2964 26.3741 35.7823 26.5728 35.3026C26.7715 34.8229 27.0628 34.387 27.43 34.0199C27.7971 33.6527 28.233 33.3614 28.7127 33.1627C29.1924 32.964 29.7065 32.8617 30.2257 32.8617C32.4094 32.8617 34.1796 34.632 34.1796 36.8156V40.7695H32.8617"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M30.2257 31.5437V27.4434"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.7742 35.4976C10.3194 35.4976 9.13831 36.6787 9.13831 38.1335C9.13831 39.5884 10.3194 40.7695 11.7742 40.7695C13.229 40.7695 14.4101 39.5884 14.4101 38.1335C14.4101 36.6787 13.229 35.4976 11.7742 35.4976ZM11.7742 35.4976V27.4433"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_100_75959">
                        <rect width="42" height="42" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                }
                amount={dashboard?.dashboardData?.totalServices?.toFixed()}
                onClick={() =>
                  router.push({
                    pathname: "/services",
                  })
                }
              />
            )}
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-3">
            {loader ? (
              <>
                <SkeletonTheme baseColor="#e2e5e7" highlightColor="#fff">
                  <div className="row">
                    <div className="col-5">
                      <Skeleton
                        height={100}
                        width={100}
                        style={{
                          height: "380px",
                          width: "380px",
                          objectFit: "cover",
                          boxSizing: "border-box",
                          borderTopLeftRadius: "30px",
                          borderBottomLeftRadius: "30px",
                          border: "1px solid #e2e5e7",
                        }}
                        className="col-5"
                      />
                    </div>
                    <div className="col-7 mt-2">
                      <Skeleton width={150} height={10} />
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Skeleton width={50} height={50} className="mt-2" />
                      </div>
                    </div>
                  </div>
                </SkeletonTheme>
              </>
            ) : (
              <DashBox
                title="SUGGESTED SERVICES"
                dashSVG={
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_100_75959)">
                      <mask
                        id="mask0_100_75959"
                        mask-type="luminance"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="42"
                        height="42"
                      >
                        <path
                          d="M40.9999 41V1.00012H1V41H40.9999Z"
                          fill="white"
                          stroke="white"
                          stroke-width="2"
                        />
                      </mask>
                      <g mask="url(#mask0_100_75959)">
                        <path
                          d="M29.3242 5.30038C28.3765 4.03671 27.1475 3.01105 25.7347 2.30465C24.3219 1.59824 22.764 1.23048 21.1844 1.23049H20.8154C19.2358 1.23048 17.6779 1.59824 16.2651 2.30465C14.8523 3.01106 13.6234 4.03671 12.6757 5.30038L12.6754 5.3007C12.0904 6.08072 11.7742 7.02939 11.7742 8.00436V13.0921C11.7742 18.1874 15.9047 22.3179 21 22.3179C26.0952 22.3179 30.2257 18.1874 30.2257 13.0921V8.00436C30.2257 7.02937 29.9095 6.08069 29.3245 5.3007L29.3242 5.30038Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.7742 11.7742H11.7743C12.6181 11.7741 13.4273 11.439 14.024 10.8424L15.7281 9.13827H15.7282C17.365 9.95672 19.1699 10.3828 21 10.3828C22.83 10.3828 24.6349 9.95672 26.2717 9.13827H26.2718L27.9759 10.8424C28.5726 11.439 29.3818 11.7741 30.2256 11.7742H30.2257"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M40.7694 40.7695L37.9954 32.4475C37.6356 31.3679 37.0023 30.3999 36.1572 29.6378C35.3121 28.8757 34.2841 28.3453 33.1733 28.0984L24.9538 26.2719L20.9999 32.8617L17.046 26.2719L8.82662 28.0984C7.71575 28.3453 6.68774 28.8757 5.84268 29.6378C4.99763 30.3999 4.36432 31.3679 4.00443 32.4475L1.23047 40.7695"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M17.046 26.272V21.6335"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M24.9539 26.272V21.6335"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M27.5898 40.7695H26.2719V36.8156C26.2718 36.2964 26.3741 35.7823 26.5728 35.3026C26.7715 34.8229 27.0628 34.387 27.43 34.0199C27.7971 33.6527 28.233 33.3614 28.7127 33.1627C29.1924 32.964 29.7065 32.8617 30.2257 32.8617C32.4094 32.8617 34.1796 34.632 34.1796 36.8156V40.7695H32.8617"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M30.2257 31.5437V27.4434"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.7742 35.4976C10.3194 35.4976 9.13831 36.6787 9.13831 38.1335C9.13831 39.5884 10.3194 40.7695 11.7742 40.7695C13.229 40.7695 14.4101 39.5884 14.4101 38.1335C14.4101 36.6787 13.229 35.4976 11.7742 35.4976ZM11.7742 35.4976V27.4433"
                          stroke="white"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_100_75959">
                        <rect width="42" height="42" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                }
                amount={dashboard?.dashboardData?.totalSuggestedService?.toFixed()}
                onClick={() =>
                  router.push({
                    pathname: "/SuggestedService",
                  })
                }
              />
            )}
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-3">
            {loader ? (
              <>
                <SkeletonTheme baseColor="#e2e5e7" highlightColor="#fff">
                  <div className="row">
                    <div className="col-5">
                      <Skeleton
                        height={100}
                        width={100}
                        style={{
                          height: "380px",
                          width: "380px",
                          objectFit: "cover",
                          boxSizing: "border-box",
                          borderTopLeftRadius: "30px",
                          borderBottomLeftRadius: "30px",
                          border: "1px solid #e2e5e7",
                        }}
                        className="col-5"
                      />
                    </div>
                    <div className="col-7 mt-2">
                      <Skeleton width={150} height={10} />
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Skeleton width={50} height={50} className="mt-2" />
                      </div>
                    </div>
                  </div>
                </SkeletonTheme>
              </>
            ) : (
              <DashBox
                title="WITHDRAW REQUEST"
                dashSVG={
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 28.8718C6 19.3953 6 14.6571 8.87035 11.7132C11.7407 8.76923 16.3605 8.76923 25.6 8.76923H35.4C44.6394 8.76923 49.2594 8.76923 52.1296 11.7132C55 14.6571 55 19.3953 55 28.8718V33.8974C55 43.3738 55 48.1122 52.1296 51.056C49.2594 54 44.6394 54 35.4 54H25.6C16.3605 54 11.7407 54 8.87035 51.056C6 48.1122 6 43.3738 6 33.8974V28.8718Z"
                      stroke="white"
                      stroke-width="3.2"
                    />
                    <path
                      d="M18.2501 8.76923V5"
                      stroke="white"
                      stroke-width="3.2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M42.75 8.76923V5"
                      stroke="white"
                      stroke-width="3.2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M7.22498 21.3333H53.775"
                      stroke="white"
                      stroke-width="3.2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M45.2 41.4359C45.2 42.8237 44.1032 43.9487 42.75 43.9487C41.3969 43.9487 40.3 42.8237 40.3 41.4359C40.3 40.048 41.3969 38.923 42.75 38.923C44.1032 38.923 45.2 40.048 45.2 41.4359Z"
                      fill="white"
                    />
                    <path
                      d="M45.2 31.3846C45.2 32.7724 44.1032 33.8974 42.75 33.8974C41.3969 33.8974 40.3 32.7724 40.3 31.3846C40.3 29.9968 41.3969 28.8718 42.75 28.8718C44.1032 28.8718 45.2 29.9968 45.2 31.3846Z"
                      fill="white"
                    />
                    <path
                      d="M32.95 41.4359C32.95 42.8237 31.8532 43.9487 30.5 43.9487C29.1469 43.9487 28.05 42.8237 28.05 41.4359C28.05 40.048 29.1469 38.923 30.5 38.923C31.8532 38.923 32.95 40.048 32.95 41.4359Z"
                      fill="white"
                    />
                    <path
                      d="M32.95 31.3846C32.95 32.7724 31.8532 33.8974 30.5 33.8974C29.1469 33.8974 28.05 32.7724 28.05 31.3846C28.05 29.9968 29.1469 28.8718 30.5 28.8718C31.8532 28.8718 32.95 29.9968 32.95 31.3846Z"
                      fill="white"
                    />
                    <path
                      d="M20.7 41.4359C20.7 42.8237 19.6031 43.9487 18.25 43.9487C16.897 43.9487 15.8 42.8237 15.8 41.4359C15.8 40.048 16.897 38.923 18.25 38.923C19.6031 38.923 20.7 40.048 20.7 41.4359Z"
                      fill="white"
                    />
                    <path
                      d="M20.7 31.3846C20.7 32.7724 19.6031 33.8974 18.25 33.8974C16.897 33.8974 15.8 32.7724 15.8 31.3846C15.8 29.9968 16.897 28.8718 18.25 28.8718C19.6031 28.8718 20.7 29.9968 20.7 31.3846Z"
                      fill="white"
                    />
                  </svg>
                }
                amount={dashboard?.dashboardData?.totalPendingProviderWithdrawRequest?.toFixed()}
                onClick={() =>
                  router.push({
                    pathname: "/Withdrawal",
                  })
                }
              />
            )}
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-3">
            {loader ? (
              <>
                <SkeletonTheme baseColor="#e2e5e7" highlightColor="#fff">
                  <div className="row">
                    <div className="col-5">
                      <Skeleton
                        height={100}
                        width={100}
                        style={{
                          height: "380px",
                          width: "380px",
                          objectFit: "cover",
                          boxSizing: "border-box",
                          borderTopLeftRadius: "30px",
                          borderBottomLeftRadius: "30px",
                          border: "1px solid #e2e5e7",
                        }}
                        className="col-5"
                      />
                    </div>
                    <div className="col-7 mt-2">
                      <Skeleton width={150} height={10} />
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Skeleton width={50} height={50} className="mt-2" />
                      </div>
                    </div>
                  </div>
                </SkeletonTheme>
              </>
            ) : (
              <DashBox
                title="TOTAL APPOINTMENTS"
                dashSVG={
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 28.8718C6 19.3953 6 14.6571 8.87035 11.7132C11.7407 8.76923 16.3605 8.76923 25.6 8.76923H35.4C44.6394 8.76923 49.2594 8.76923 52.1296 11.7132C55 14.6571 55 19.3953 55 28.8718V33.8974C55 43.3738 55 48.1122 52.1296 51.056C49.2594 54 44.6394 54 35.4 54H25.6C16.3605 54 11.7407 54 8.87035 51.056C6 48.1122 6 43.3738 6 33.8974V28.8718Z"
                      stroke="white"
                      stroke-width="3.2"
                    />
                    <path
                      d="M18.2501 8.76923V5"
                      stroke="white"
                      stroke-width="3.2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M42.75 8.76923V5"
                      stroke="white"
                      stroke-width="3.2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M7.22498 21.3333H53.775"
                      stroke="white"
                      stroke-width="3.2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M45.2 41.4359C45.2 42.8237 44.1032 43.9487 42.75 43.9487C41.3969 43.9487 40.3 42.8237 40.3 41.4359C40.3 40.048 41.3969 38.923 42.75 38.923C44.1032 38.923 45.2 40.048 45.2 41.4359Z"
                      fill="white"
                    />
                    <path
                      d="M45.2 31.3846C45.2 32.7724 44.1032 33.8974 42.75 33.8974C41.3969 33.8974 40.3 32.7724 40.3 31.3846C40.3 29.9968 41.3969 28.8718 42.75 28.8718C44.1032 28.8718 45.2 29.9968 45.2 31.3846Z"
                      fill="white"
                    />
                    <path
                      d="M32.95 41.4359C32.95 42.8237 31.8532 43.9487 30.5 43.9487C29.1469 43.9487 28.05 42.8237 28.05 41.4359C28.05 40.048 29.1469 38.923 30.5 38.923C31.8532 38.923 32.95 40.048 32.95 41.4359Z"
                      fill="white"
                    />
                    <path
                      d="M32.95 31.3846C32.95 32.7724 31.8532 33.8974 30.5 33.8974C29.1469 33.8974 28.05 32.7724 28.05 31.3846C28.05 29.9968 29.1469 28.8718 30.5 28.8718C31.8532 28.8718 32.95 29.9968 32.95 31.3846Z"
                      fill="white"
                    />
                    <path
                      d="M20.7 41.4359C20.7 42.8237 19.6031 43.9487 18.25 43.9487C16.897 43.9487 15.8 42.8237 15.8 41.4359C15.8 40.048 16.897 38.923 18.25 38.923C19.6031 38.923 20.7 40.048 20.7 41.4359Z"
                      fill="white"
                    />
                    <path
                      d="M20.7 31.3846C20.7 32.7724 19.6031 33.8974 18.25 33.8974C16.897 33.8974 15.8 32.7724 15.8 31.3846C15.8 29.9968 16.897 28.8718 18.25 28.8718C19.6031 28.8718 20.7 29.9968 20.7 31.3846Z"
                      fill="white"
                    />
                  </svg>
                }
                amount={dashboard?.dashboardData?.totalAppointments?.toFixed()}
                onClick={() =>
                  router.push({
                    pathname: "/bookings/booking",
                  })
                }
              />
            )}
          </div>
      

          <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-3">
            {loader ? (
              <>
                <SkeletonTheme baseColor="#e2e5e7" highlightColor="#fff">
                  <div className="row">
                    <div className="col-5">
                      <Skeleton
                        height={100}
                        width={100}
                        style={{
                          height: "380px",
                          width: "380px",
                          objectFit: "cover",
                          boxSizing: "border-box",
                          borderTopLeftRadius: "30px",
                          borderBottomLeftRadius: "30px",
                          border: "1px solid #e2e5e7",
                        }}
                        className="col-5"
                      />
                    </div>
                    <div className="col-7 mt-2">
                      <Skeleton width={150} height={10} />
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Skeleton width={50} height={50} className="mt-2" />
                      </div>
                    </div>
                  </div>
                </SkeletonTheme>
              </>
            ) : (
              <DashBox
                title="ADMIN EARNING"
                dashSVG={
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M56.8101 43.723C56.5434 42.9543 56.0179 42.3021 55.3235 41.878C54.6291 41.4539 53.8089 41.2842 53.0032 41.398C52.9018 40.8899 52.6846 40.4121 52.3685 40.0016C52.0524 39.5912 51.6459 39.2591 51.1806 39.0312C50.7916 38.8402 50.3683 38.7288 49.9356 38.7038C49.503 38.6787 49.0697 38.7404 48.6612 38.8853L48.4935 38.9449C48.7129 35.6207 47.7184 31.6245 45.7529 28.1447L47.08 28.5746C47.5628 28.7335 48.0835 28.7347 48.567 28.5778C49.0504 28.421 49.4713 28.1144 49.7688 27.7023L50.9648 26.0552C51.053 25.9272 51.1826 25.8335 51.3318 25.79L53.2632 25.1609C53.7476 25.0059 54.17 24.7006 54.4692 24.2893C54.7684 23.878 54.9288 23.3821 54.9271 22.8735V20.8376C54.9232 20.6831 54.9725 20.5321 55.0669 20.4097L56.2663 18.7616C56.5648 18.3513 56.7255 17.8569 56.7254 17.3496C56.7252 16.8422 56.5643 16.3479 56.2656 15.9377L55.0685 14.2895C54.9738 14.1677 54.924 14.017 54.9274 13.8628V11.8242C54.9329 11.3153 54.7744 10.8181 54.4752 10.4063C54.1761 9.99452 53.7524 9.68998 53.2667 9.5378L51.331 8.9075C51.1825 8.86485 51.0535 8.7718 50.9661 8.64436L49.7698 6.99975C49.4727 6.58696 49.0519 6.27949 48.5684 6.12189C48.0849 5.96428 47.5637 5.96474 47.0804 6.12319L45.1409 6.75358C44.9969 6.80548 44.8393 6.80548 44.6952 6.75358L42.7582 6.12371C42.2756 5.96135 41.7535 5.95874 41.2692 6.11628C40.785 6.27381 40.3644 6.58312 40.0696 6.99838L38.8712 8.64614C38.8542 8.66902 38.8359 8.69096 38.8165 8.71187C38.0649 8.82458 37.3616 9.09642 36.6793 9.36125C35.7712 9.71403 34.914 10.047 34.0351 9.97214L33.9638 9.96606L33.8924 9.97214C33.0118 10.0471 32.1879 9.71141 31.3157 9.3558C29.5082 8.61878 27.2589 7.70185 24.5885 11.0944L24.2678 11.5019L27.4157 18.1767C27.0187 18.3798 26.6807 18.6816 26.4342 19.0532C26.1878 19.4248 26.0412 19.8536 26.0086 20.2983C25.976 20.743 26.0585 21.1886 26.2481 21.5921C26.4378 21.9957 26.7281 22.3436 27.0913 22.6023C25.7456 23.4475 24.4493 24.7276 23.2737 26.3989C21.3957 29.0676 20.0379 32.4888 19.5744 35.6771C18.2649 35.8658 17.4486 36.2813 16.7584 36.6325C16.054 36.9909 15.5451 37.2498 14.6352 37.2498H13.2094V36.4006C13.2094 36.1782 13.1211 35.9648 12.9638 35.8076C12.8065 35.6503 12.5932 35.5619 12.3707 35.5619H5.83871C5.61627 35.5619 5.40294 35.6503 5.24565 35.8076C5.08836 35.9648 5 36.1782 5 36.4006V54.9122C5 55.1346 5.08836 55.3479 5.24565 55.5052C5.40294 55.6625 5.61627 55.7509 5.83871 55.7509H12.3707C12.5932 55.7509 12.8065 55.6625 12.9638 55.5052C13.1211 55.3479 13.2094 55.1346 13.2094 54.9122V54.0659H13.5623C14.3392 54.0566 15.109 54.2139 15.8199 54.5272L16.893 54.9879C17.8123 55.393 18.8075 55.5975 19.8121 55.5877C20.3084 55.5877 21.0643 55.6001 21.9395 55.6144C23.5594 55.6408 25.1807 55.6623 26.7071 55.6623C30.2595 55.6623 33.2941 55.5459 34.5731 55.1051L54.6384 48.1809C55.5165 47.8763 56.2381 47.2361 56.6452 46.4006C57.0523 45.565 57.1116 44.6022 56.8101 43.723ZM49.2204 40.4668C49.4194 40.3967 49.6305 40.367 49.8411 40.3796C50.0518 40.3922 50.2578 40.4468 50.447 40.5402C50.7047 40.6671 50.9258 40.8577 51.0895 41.0938C51.2531 41.3299 51.3538 41.6038 51.3822 41.8897L47.1978 43.3327C47.5216 42.813 47.7836 42.2573 47.9785 41.6769C48.0729 41.3955 48.1537 41.1098 48.2209 40.8207L49.2204 40.4668ZM40.2291 9.6311L41.4263 7.98513C41.5142 7.8581 41.6412 7.76328 41.788 7.71511C41.9348 7.66694 42.0933 7.66807 42.2394 7.71831L44.1755 8.34735C44.6577 8.50859 45.1793 8.50859 45.6615 8.34735L47.5996 7.71716C47.7455 7.66649 47.904 7.66512 48.0507 7.71326C48.1974 7.76141 48.3243 7.85641 48.4118 7.98366L49.6083 9.62827C49.903 10.0437 50.3262 10.3507 50.8126 10.5018L52.7471 11.1317C52.8949 11.1764 53.0241 11.2682 53.115 11.3931C53.2058 11.518 53.2534 11.6692 53.2503 11.8236V13.8624C53.2458 14.3703 53.4074 14.8658 53.7105 15.2734L54.9082 16.9237C55.0009 17.0465 55.0511 17.1962 55.0511 17.3501C55.0511 17.5041 55.0009 17.6538 54.9082 17.7766L53.7094 19.4246C53.4085 19.834 53.2474 20.3294 53.25 20.8375V22.8733C53.2535 23.0278 53.2062 23.1791 53.1153 23.3041C53.0243 23.429 52.8949 23.5205 52.7468 23.5646L50.8132 24.1944C50.3284 24.3482 49.906 24.6542 49.6086 25.067L48.4101 26.7176C48.3219 26.844 48.1947 26.9381 48.0479 26.9853C47.9012 27.0325 47.743 27.0302 47.5976 26.9788L45.6627 26.3526C45.1807 26.1913 44.6594 26.191 44.1772 26.3519L42.2389 26.9794C42.0933 27.0299 41.9353 27.0315 41.7887 26.9841C41.6422 26.9366 41.5151 26.8426 41.4269 26.7163L40.2277 25.0648C39.9312 24.6539 39.5108 24.349 39.0283 24.1946L37.088 23.5638C36.9407 23.5192 36.812 23.4276 36.7218 23.3029C36.6315 23.1782 36.5846 23.0273 36.5884 22.8734V20.8376C36.5918 20.3291 36.4314 19.8331 36.1308 19.423L34.9327 17.7762C34.8393 17.6536 34.7887 17.5037 34.7889 17.3496C34.789 17.1955 34.8399 17.0457 34.9336 16.9233L36.1321 15.2726C36.4337 14.8648 36.5938 14.3696 36.588 13.8624V11.8242C36.585 11.67 36.6325 11.519 36.7232 11.3942C36.8139 11.2695 36.9428 11.1777 37.0904 11.1329L39.0299 10.5024C39.5141 10.3507 39.9352 10.0447 40.2291 9.6311ZM30.6823 10.909C31.6346 11.2969 32.7116 11.7366 33.9638 11.649C34.2826 11.6701 34.6027 11.6599 34.9195 11.6184C34.9139 11.6869 34.911 11.7555 34.9109 11.8242V13.8624C34.9157 14.0158 34.8674 14.1662 34.7743 14.2883L33.5792 15.9349C33.3752 16.2123 33.2336 16.5306 33.1642 16.8679C33.0949 17.2051 33.0993 17.5535 33.1773 17.8889H29.134L26.2328 11.7369C27.9329 9.78815 29.0465 10.242 30.6823 10.909ZM28.6026 21.4108C28.4791 21.4148 28.356 21.3939 28.2406 21.3493C28.1253 21.3047 28.0201 21.2374 27.9313 21.1514C27.8425 21.0654 27.7719 20.9624 27.7236 20.8486C27.6754 20.7347 27.6506 20.6124 27.6506 20.4887C27.6506 20.3651 27.6754 20.2427 27.7236 20.1289C27.7719 20.015 27.8425 19.912 27.9313 19.826C28.0201 19.74 28.1253 19.6727 28.2406 19.6281C28.356 19.5836 28.4791 19.5626 28.6026 19.5666H34.1608L34.7731 20.4081C34.8671 20.5313 34.9158 20.6831 34.911 20.838V21.4108H28.6026ZM30.8968 23.0883H34.9211C34.9612 23.5579 35.1394 24.0053 35.4332 24.3739C35.727 24.7426 36.1232 25.0161 36.5721 25.1601L38.5082 25.7891C38.6559 25.8328 38.7843 25.9257 38.872 26.0524L40.0704 27.7029C40.2888 28.0097 40.5774 28.26 40.912 28.4329C41.2466 28.6059 41.6176 28.6965 41.9943 28.6973C42.2533 28.6968 42.5107 28.6554 42.7569 28.5746L43.8466 28.2219C46.4635 32.4211 47.534 37.7614 46.39 41.1389C45.8916 42.6102 45.0051 43.6641 43.7526 44.2841C43.4161 43.7395 42.946 43.2899 42.3869 42.978C41.8278 42.666 41.1983 42.5022 40.5581 42.5018H36.992C34.8984 42.5298 32.8639 41.8079 31.2562 40.4666L28.4267 38.1692C26.321 36.4603 23.9836 35.6138 21.2881 35.5781C22.2684 29.7017 26.5307 23.0883 30.8968 23.0883ZM11.532 54.0735H6.67743V37.2396H11.532V54.0735ZM54.0915 46.5949L34.0264 53.519C32.3238 54.1061 25.5868 53.9959 21.9667 53.9368C21.0842 53.9225 20.322 53.91 19.8121 53.91C19.0349 53.9198 18.2648 53.7615 17.5545 53.4461L16.4793 52.9848C15.5599 52.5826 14.5658 52.3795 13.5623 52.3888H13.2094V38.9275H14.6352C15.9474 38.9275 16.7464 38.5209 17.5191 38.1277C18.3658 37.6969 19.2412 37.2514 21.1107 37.2514C23.4815 37.2514 25.5289 37.9775 27.3696 39.4709L30.199 41.7683C32.1974 43.3902 34.4194 44.1786 36.992 44.1786H40.5582C41.1097 44.1786 41.6387 44.3977 42.0287 44.7877C42.4187 45.1777 42.6378 45.7067 42.6378 46.2582C42.6378 46.8098 42.4187 47.3387 42.0287 47.7287C41.6387 48.1187 41.1097 48.3378 40.5582 48.3378H28.1776C27.9552 48.3378 27.7419 48.4262 27.5846 48.5835C27.4273 48.7408 27.3389 48.9541 27.3389 49.1765C27.3389 49.399 27.4273 49.6123 27.5846 49.7696C27.7419 49.9269 27.9552 50.0152 28.1776 50.0152H40.5582C41.5542 50.014 42.509 49.6178 43.2132 48.9135C43.9174 48.2092 44.3135 47.2543 44.3147 46.2583C44.3147 46.2059 44.3129 46.1551 44.3108 46.1037L52.901 43.1402C53.1283 43.0601 53.3692 43.0258 53.6098 43.0391C53.8504 43.0525 54.086 43.1134 54.303 43.2182C54.52 43.323 54.7142 43.4698 54.8742 43.6499C55.0343 43.8301 55.1571 44.0401 55.2357 44.268C55.3142 44.4958 55.3469 44.7369 55.3319 44.9774C55.3168 45.218 55.2544 45.4531 55.1481 45.6694C55.0418 45.8857 54.8937 46.0788 54.7125 46.2376C54.5312 46.3965 54.3203 46.5179 54.092 46.5949H54.0915ZM41.5308 20.5591L46.9542 13.1504C47.019 13.0608 47.1008 12.9848 47.195 12.9269C47.2893 12.869 47.394 12.8303 47.5033 12.8131C47.6125 12.7958 47.7241 12.8004 47.8316 12.8264C47.939 12.8524 48.0403 12.8995 48.1296 12.9648C48.2188 13.0301 48.2942 13.1124 48.3515 13.207C48.4088 13.3016 48.4468 13.4066 48.4634 13.516C48.4799 13.6253 48.4747 13.7369 48.448 13.8442C48.4213 13.9515 48.3736 14.0525 48.3077 14.1413L42.8843 21.5499C42.8195 21.6396 42.7377 21.7156 42.6434 21.7735C42.5492 21.8314 42.4445 21.87 42.3352 21.8873C42.226 21.9046 42.1144 21.9 42.0069 21.874C41.8994 21.848 41.7982 21.8009 41.7089 21.7356C41.6197 21.6703 41.5442 21.588 41.4869 21.4934C41.4297 21.3988 41.3916 21.2938 41.3751 21.1844C41.3585 21.0751 41.3638 20.9635 41.3905 20.8562C41.4172 20.7489 41.4649 20.6479 41.5308 20.5591ZM42.5404 17.189C42.9794 17.1884 43.4085 17.0576 43.7733 16.8132C44.138 16.5689 44.4222 16.2219 44.5898 15.816C44.7574 15.4102 44.8009 14.9638 44.7149 14.5333C44.6289 14.1027 44.4171 13.7073 44.1065 13.3971C43.7958 13.0868 43.4001 12.8756 42.9694 12.7902C42.5388 12.7048 42.0924 12.7489 41.6869 12.9171C41.2813 13.0852 40.9346 13.3699 40.6908 13.735C40.4469 14.1001 40.3167 14.5293 40.3167 14.9684C40.3174 15.5576 40.552 16.1225 40.969 16.5389C41.3859 16.9553 41.9511 17.1891 42.5404 17.189ZM42.5404 14.4252C42.6477 14.4258 42.7524 14.4582 42.8413 14.5182C42.9302 14.5782 42.9994 14.6633 43.04 14.7626C43.0807 14.8619 43.091 14.971 43.0697 15.0762C43.0484 15.1813 42.9964 15.2778 42.9203 15.3535C42.8443 15.4292 42.7475 15.4806 42.6422 15.5013C42.5369 15.522 42.4279 15.5111 42.3288 15.4699C42.2297 15.4287 42.1451 15.3591 42.0855 15.2698C42.026 15.1806 41.9942 15.0757 41.9942 14.9684C41.9942 14.8968 42.0084 14.8259 42.0359 14.7599C42.0635 14.6938 42.1037 14.6338 42.1545 14.5834C42.2052 14.5329 42.2654 14.4929 42.3317 14.4658C42.3979 14.4387 42.4688 14.4249 42.5404 14.4252ZM45.0805 19.7291C45.0805 20.1683 45.2107 20.5976 45.4547 20.9628C45.6987 21.328 46.0455 21.6127 46.4513 21.7807C46.857 21.9488 47.3035 21.9928 47.7343 21.9071C48.165 21.8215 48.5607 21.61 48.8713 21.2994C49.1819 20.9889 49.3934 20.5932 49.479 20.1625C49.5647 19.7317 49.5208 19.2852 49.3527 18.8794C49.1846 18.4737 48.9 18.1269 48.5348 17.8829C48.1697 17.6388 47.7403 17.5086 47.3011 17.5086C46.7125 17.5097 46.1483 17.7439 45.7321 18.1601C45.3159 18.5763 45.0816 19.1405 45.0805 19.7291ZM47.8443 19.7291C47.8443 19.8365 47.8125 19.9416 47.7528 20.0309C47.6931 20.1202 47.6083 20.1899 47.5091 20.231C47.4098 20.2721 47.3006 20.2829 47.1952 20.262C47.0899 20.241 46.9931 20.1893 46.9171 20.1133C46.8411 20.0374 46.7894 19.9406 46.7684 19.8352C46.7474 19.7298 46.7582 19.6206 46.7993 19.5214C46.8404 19.4221 46.91 19.3373 46.9993 19.2776C47.0887 19.2179 47.1937 19.186 47.3011 19.186C47.445 19.1866 47.5828 19.2439 47.6846 19.3457C47.7863 19.4474 47.8437 19.5852 47.8443 19.7291ZM35.6629 36.8169C35.6629 35.9113 35.2868 35.7114 33.7918 35.3968C32.5157 35.1282 30.5871 34.7222 30.5871 32.3325C30.5871 30.8985 31.6676 29.6906 33.1251 29.3493V28.7129C33.1251 28.4904 33.2135 28.2771 33.3707 28.1198C33.528 27.9625 33.7414 27.8742 33.9638 27.8742C34.1862 27.8742 34.3996 27.9625 34.5569 28.1198C34.7142 28.2771 34.8025 28.4904 34.8025 28.7129V29.3493C36.2598 29.6903 37.3404 30.8985 37.3404 32.3325C37.3404 32.555 37.252 32.7683 37.0947 32.9256C36.9374 33.0829 36.7241 33.1713 36.5016 33.1713C36.2792 33.1713 36.0659 33.0829 35.9086 32.9256C35.7513 32.7683 35.6629 32.555 35.6629 32.3325C35.6629 31.5595 34.9007 30.9305 33.9638 30.9305C33.027 30.9305 32.2646 31.5596 32.2646 32.3325C32.2646 33.24 32.6411 33.4404 34.1373 33.7553C35.4128 34.0237 37.3404 34.4294 37.3404 36.8166C37.3404 38.2521 36.2599 39.4614 34.8025 39.8028V40.4391C34.8025 40.6616 34.7142 40.8749 34.5569 41.0322C34.3996 41.1895 34.1862 41.2778 33.9638 41.2778C33.7414 41.2778 33.528 41.1895 33.3707 41.0322C33.2135 40.8749 33.1251 40.6616 33.1251 40.4391V39.8026C31.6678 39.4613 30.5871 38.252 30.5871 36.8165C30.5871 36.5941 30.6755 36.3807 30.8328 36.2235C30.9901 36.0662 31.2034 35.9778 31.4259 35.9778C31.6483 35.9778 31.8616 36.0662 32.0189 36.2235C32.1762 36.3807 32.2646 36.5941 32.2646 36.8165C32.2646 37.5913 33.0268 38.2214 33.9638 38.2214C34.9009 38.2214 35.6629 37.5917 35.6629 36.8169Z"
                      fill="white"
                      stroke="white"
                      stroke-width="0.5"
                    />
                  </svg>
                }
                amount={
                  dashboard?.dashboardData?.totalAdminEarning?.toFixed() +
                  "$"
                }
                onClick={() => router.push("/bookings/monthlyReport")}
              />
            )}
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-3">
            {loader ? (
              <>
                <SkeletonTheme baseColor="#e2e5e7" highlightColor="#fff">
                  <div className="row">
                    <div className="col-5">
                      <Skeleton
                        height={100}
                        width={100}
                        style={{
                          height: "380px",
                          width: "380px",
                          objectFit: "cover",
                          boxSizing: "border-box",
                          borderTopLeftRadius: "30px",
                          borderBottomLeftRadius: "30px",
                          border: "1px solid #e2e5e7",
                        }}
                        className="col-5"
                      />
                    </div>
                    <div className="col-7 mt-2">
                      <Skeleton width={150} height={10} />
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Skeleton width={50} height={50} className="mt-2" />
                      </div>
                    </div>
                  </div>
                </SkeletonTheme>
              </>
            ) : (
              <DashBox
                title="PROVIDER EARNING"
                dashSVG={
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M35.2936 19.4727C35.3008 20.6451 36.2575 21.5898 37.4303 21.5826L38.59 21.5755C39.7635 21.5683 40.7086 20.6112 40.7007 19.4381L40.7006 19.4258C40.6984 19.0963 40.6194 18.7718 40.4701 18.4781C40.3208 18.1844 40.1051 17.9295 39.8402 17.7335L36.1449 14.9998C35.878 14.8024 35.6612 14.5452 35.5117 14.2488C35.3623 13.9525 35.2844 13.6252 35.2844 13.2932C35.2844 12.1207 36.2352 11.1702 37.4082 11.1702H38.5697C39.7425 11.1702 40.6935 12.1207 40.6935 13.2932"
                      stroke="white"
                      stroke-width="2.4"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M37.9924 11.1702V9.65333"
                      stroke="white"
                      stroke-width="2.4"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M37.9924 23.0996V21.5827"
                      stroke="white"
                      stroke-width="2.4"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M49.7575 16.3764C49.7575 22.8718 44.4902 28.1375 37.9926 28.1375C31.495 28.1375 26.2278 22.8718 26.2278 16.3764C26.2278 9.88103 31.495 4.61536 37.9926 4.61536C44.4902 4.61536 49.7575 9.88103 49.7575 16.3764Z"
                      stroke="white"
                      stroke-width="2.4"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.88989 55.3846L4.61548 39.9576L13.3329 36.979L18.6072 52.4061L9.88989 55.3846Z"
                      stroke="white"
                      stroke-width="2.4"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M41.86 38.7993L49.7559 33.517C50.3562 33.0964 51.0714 32.871 51.8043 32.8713C52.8736 32.8713 53.9294 33.3495 54.6323 34.2543C55.8808 35.8606 55.5384 38.1831 53.881 39.3628L43.4499 46.7823C40.6588 48.7686 37.318 49.8359 33.8922 49.8358L17.8979 50.3308"
                      stroke="white"
                      stroke-width="2.4"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M29.5757 41.936H38.49C38.9326 41.9367 39.371 41.8498 39.78 41.6804C40.1889 41.511 40.5603 41.2623 40.8728 40.9488C41.4828 40.339 41.8602 39.4966 41.8602 38.5668C41.8602 36.7059 40.3515 35.1976 38.49 35.1976H33.5516"
                      stroke="white"
                      stroke-width="2.4"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17.0408 37.7038C18.6939 34.3343 22.1594 32.0149 26.1664 32.0149C29.0767 32.0149 31.7002 33.2378 33.5514 35.198"
                      stroke="white"
                      stroke-width="2.4"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17.0412 37.7038L14.1785 39.4544"
                      stroke="white"
                      stroke-width="2.4"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                }
                amount={
                  dashboard?.dashboardData?.totalProviderEarning?.toFixed() + "$"
                }
                onClick={() => router.push("/bookings/monthlyReport")}
              />
            )}
          </div>
        </div>
      </div>
      <h4 className="m12-top">DATA ANALYSIS</h4>
      <div
        className="m20-top apexChart tsBox"
        style={{ border: `${loader ? "1px solid #e2e5e7" : ""}` }}
      >
        {loader ? (
          <>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Skeleton height={20} width={350} />
            </div>
            <div style={{ padding: "20px" }}>
              <ListItem loading={loader}>List Item 1</ListItem>
              <ListItem loading={loader}>List Item 2</ListItem>
              <ListItem loading={loader}>List Item 3</ListItem>
              <ListItem loading={loader}>List Item 3</ListItem>
              <ListItem loading={loader}>List Item 3</ListItem>
              <ListItem loading={loader}>List Item 3</ListItem>
            </div>
          </>
        ) : (
          <ApexChart startDate = {startDate} endDate={endDate} />
        )}
      </div>
      <div className="row bg-white">
        <div className="col-lg-6 col-md-12 ">
          <div className="m40-top tsBox p-3 br-2">
            <h5 className="text-center text-theme">TOP EXPERTS</h5>
            <Table
              data={dashboard?.topProviders}
              mapData={topProviderData}
              type={"client"}
              className="border-0"
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="m40-top tsBox p-3 br-2">
            <h5 className="text-center text-theme">TODAY UPCOMING BOOKINGS</h5>
            <Table
              data={dashboard?.upcomingBookings}
              mapData={upcomingBookingsData}
              type={"client"}
              className="border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
Dashboard.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export default Dashboard;

const DashBox = ({ dashIcon, dashSVG, title, amount, onClick }: any) => {
  return (
    <div className="dashBox d-flex cursor" onClick={onClick}>
      <div className="dashIconBox midBox col-xl-4 col-md-5 col-6">
        <div className="dashIcon midBox">
          {dashIcon ? <i className={`${dashIcon}`}></i> : dashSVG}
        </div>
      </div>
      <div className="boxContent text-center col-xl-8 col-md-7 col-6">
        <div className="boxTitle midBox">
          <p className="text-decoration-underline">{title}</p>
        </div>
        <div className="boxAmount midBox mt-2">
          <p>{amount}</p>
        </div>
      </div>
    </div>
  );
};

const ApexChart = ({startDate , endDate}) => {
  const [chart, setChart] = useState<any>();
  const dispatch = useAppDispatch();
  const ChartChart = dynamic(() => import("react-apexcharts"), { ssr: false });
  const { chartData } = useSelector((state: RootStore) => state.dashboard);

  useEffect(() => {
    const payload: any = { startDate: startDate, endDate: endDate };
    dispatch(getChartData(payload));
  }, [dispatch , startDate , endDate]);

  useEffect(() => {
    setChart(chartData);
  }, [chartData]);

  let label: any = [];
  let data: any = [];
  let dataAmount: any = [];
  let dataCount: any = [];


  const total = chart;

  chart?.forEach((data_: any) => {
    const newDate = data_.id;
    var date: any;
    if (newDate) {
      data = dayjs(newDate).format("DD MMM YYYY");
    } else {
      data = dayjs(newDate).format("DD MMM YYYY");
    }

    date?.length > 0 && label.push(date);
    dataAmount.push(data_.amount);
    dataCount.push(data_.count);
  });

  const totalSeries = {
    dataSet: [
      {
        name: "Total revenue",
        data: dataAmount,
      },
      {
        name: "Total Count",
        data: dataCount,
      },
    ],
  };
  const optionsTotal: any = {
    chart: {
      type: "area",
      stacked: true,
      height: 500,
      background: "#fff",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    markers: {
      size: 0,
    },
    fill: {
      type: "gradient",
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.9,
        opacityTo: 0.6,
        stops: [0, 100, 100, 100],
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#8e8da4",
        },
        offsetX: 10,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    xaxis: {
      rotate: 0,
      rotateAlways: true,
      minHeight: 200,
      maxHeight: 280,
    },
    tooltip: {
      shared: true,
    },
    title: {
      text: "REVENUE AND BOOKING DATA",
      style: {
        color: "#1C2B20",
        marginTop: "50px",
      },
      align: "center",
      offsetX: 20,
      cssClass: "mt-5",
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      offsetY: -10,
      offsetX: -100,
    },
    colors: ["#259ACD", "#0f7085"],
  };

  return (
    <div id="chart">
      <ChartChart
        options={optionsTotal}
        series={totalSeries.dataSet}
        type="area"
        height={400}
      />
    </div>
  );
};
