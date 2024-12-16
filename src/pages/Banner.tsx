import BannerDialogue from "@/component/banner/BannerDialogue";
import RootLayout from "@/component/layout/Layout";
import Button from "@/extra/Button";
import Pagination from "@/extra/Pagination";
import Table from "@/extra/Table";
import Title from "@/extra/Title";
import ToggleSwitch from "@/extra/TogggleSwitch";
import { activeBanner, deleteBanner, getBanner } from "@/store/bannerSlice";
import { openDialog } from "@/store/dialogSlice";
import { RootStore, useAppDispatch } from "@/store/store";
import {  warning } from "@/utils/Alert";
import { useRouter } from "next/router";
import { baseURL } from "../utils/config";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface BannerData {
  _id: string;
  image: string;
  isActive: false;
}

const Banner = () => {
  const { dialogue, dialogueType } = useSelector(
    (state: RootStore) => state.dialogue
  );

  const { banner } = useSelector((state: RootStore) => state.banner);
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [data, setData] = useState<any[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [page, setPage] = useState<any>(1);

  const baseUrl = baseURL;
  useEffect(() => {
    dispatch(getBanner());
  }, [dispatch]);

  useEffect(() => {
    setData(banner);
  }, [banner]);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(1);
  };

  const bannerTable = [
    {
      Header: "No",
      Cell: ({ index }: { index: any }) => (
        <span>{(page - 1) * rowsPerPage + index + 1}</span>
      ),
    },
    {
      Header: "Image",
      Cell: ({ row, index }: { row: BannerData; index: number }) => (
        <div className="userProfile">
          <img
            src={baseUrl + row?.image}
            style={{ height: "100px", width: "200px" }}
            alt={`Doctor ${page * rowsPerPage + index + 1}`}
          />
        </div>
      ),
    },

    {
      Header: "IS ACTIVE",
      body: "isActive",
      sorting: { type: "client" },
      Cell: ({ row }: { row: BannerData }) => (
        <ToggleSwitch
          value={row?.isActive}
          onClick={() => {
            const id: any = row?._id;
        
            dispatch(activeBanner(id));
          }}
        />
      ),
    },

    {
      Header: "Delete",
      Cell: ({ row }: { row: BannerData }) => (
        <span className="d-flex justify-content-center">
          <button
            className="py-1 me-2"
            style={{ backgroundColor: "#CFF3FF", borderRadius: "8px" }}
            onClick={() => {
              dispatch(openDialog({ type: "banner", data: row }));
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.0377 7.22744L5.50073 16.7652C5.4527 16.8133 5.41848 16.8735 5.40162 16.9394L4.34449 21.1823C4.32895 21.2453 4.3299 21.3112 4.34726 21.3737C4.36462 21.4362 4.3978 21.4931 4.4436 21.5391C4.51395 21.6092 4.6092 21.6486 4.70852 21.6487C4.73916 21.6487 4.76968 21.6449 4.79939 21.6374L9.04235 20.5801C9.10832 20.5636 9.16854 20.5294 9.21656 20.4812L18.7545 10.9441L15.0377 7.22744ZM21.1172 5.92698L20.0556 4.86538C19.346 4.15585 18.1094 4.15655 17.4006 4.86538L16.1002 6.16585L19.8168 9.88235L21.1172 8.58193C21.4716 8.22765 21.6668 7.75607 21.6668 7.25454C21.6668 6.75301 21.4716 6.28143 21.1172 5.92698Z"
                fill="#059CF1"
              />
            </svg>
          </button>
          <button
            className="py-1"
            style={{ backgroundColor: "#FFF1F1", borderRadius: "8px" }}
            onClick={() => handleDelete(row?._id)}
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

  const handleDelete = (id: any) => {

    const data = warning("Delete");
    data
      .then((logouts) => {
        const yes = logouts.isConfirmed;
        if (yes) {
          dispatch(deleteBanner(id));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {dialogueType === "banner" && <BannerDialogue />}
      <div className={`userTable`}>
        <Title name="Banner" />

        <div className="betBox">
          <Button
            className={`bg-button p-10 text-white m10-bottom `}
            bIcon={`fa-solid fa-user-plus`}
            text="Banner"
            onClick={() => {
              dispatch(openDialog({ type: "banner" }));
            }}
          />
        </div>
        <div>
          <Table
            data={data}
            mapData={bannerTable}
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
    </>
  );
};
Banner.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};
export default Banner;
