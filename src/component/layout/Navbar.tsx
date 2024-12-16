import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { openDialog } from "@/store/dialogSlice";
import { RootStore, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import NotificationDialog from "../user/NotificationDialogue";
import { adminProfileGet } from "@/store/adminSlice";
import { getDefaultCurrency, getSetting } from "@/store/settingSlice";
import { baseURL } from "@/utils/config";

const Navbar = () => {
  const router = useRouter();
  const [adminData, setAdminData] = useState<{ name?: string; image?: string }>(
    {}
  );
  const { admin } = useSelector((state: RootStore) => state?.admin);
  const adminDataInitialized = useRef(false); // Ref to track initialization

  const dispatch = useAppDispatch();

  const { dialogue, dialogueType } = useSelector(
    (state: RootStore) => state.dialogue
  );

  useEffect(() => {
    dispatch(adminProfileGet());
    dispatch(getSetting());
    dispatch(getDefaultCurrency());
  }, []);

  useEffect(() => {
    setAdminData(admin?.image);
  }, [dispatch]);

  const handleNotify = (id: any) => {
    dispatch(
      openDialog({ type: "notification", data: { id, type: "Alluser" } })
    );
  };

  const enterFullscreen = () => {
    document.body.requestFullscreen();
  };

  return (
    <div className="mainNavbar">
      <div className="navBar">
        <div className="innerNavbar betBox">
          {dialogueType == "notification" && <NotificationDialog />}
          <div className="leftNav d-flex">
            <i
              className={`${`ri-bar-chart-horizontal-line`} cursor-pointer fs-20 navToggle`}
            ></i>
            <a onClick={enterFullscreen} className="ms-4 text-white cursor">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-maximize"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
              </svg>
            </a>
          </div>

          <div className="rightNav">
            <div className="adminProfile betBox  cursor-pointer ">
              <button
                className="bg-theme text-white rounded-circle fs-25 m20-right"
                onClick={() => handleNotify(admin?._id)}
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.3999 27.3913C13.1999 29.1304 16.7999 29.1304 18.5999 27.3913"
                    stroke="#fff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.1984 1.37228C16.1995 1.34978 16.2 1.32713 16.2 1.30435C16.2 0.583977 15.6627 0 15 0C14.3373 0 13.8 0.583977 13.8 1.30435C13.8 1.32715 13.8005 1.34982 13.8016 1.37233C9.78442 2.00169 6.00443 6.91237 6.60006 12.3913C6.90855 14.0679 5.93721 14.9562 4.92621 15.8807C3.97086 16.7543 2.9801 17.6603 3.0003 19.2945C3.0003 21.5849 4.20001 22.8261 5.96196 23.4416C5.96196 23.4416 9.18886 24.7826 15.0001 24.7826C20.8114 24.7826 24.0383 23.4416 24.0383 23.4416C25.8002 22.8261 27.0003 21.5217 27 19.2945C26.9998 17.6462 26.0096 16.7399 25.0596 15.8703C24.0531 14.9489 23.0916 14.0688 23.4002 12.3913C23.5073 11.4062 23.473 10.4396 23.3212 9.51282C22.7956 9.99525 22.1411 10.317 21.4218 10.4082C21.4757 10.9649 21.477 11.5356 21.4185 12.1132C21.206 13.37 21.4473 14.4515 21.9782 15.3696C22.4574 16.198 23.1444 16.8279 23.6054 17.2505L23.6233 17.2669C24.6914 18.2462 24.9999 18.5956 25 19.2947C25.0001 20.0313 24.8092 20.4721 24.5903 20.7589C24.3598 21.0607 23.9813 21.343 23.3787 21.5535L23.3242 21.5726L23.2782 21.5917L23.2777 21.5919L23.2707 21.5947C23.2584 21.5995 23.2339 21.609 23.1973 21.6224C23.1241 21.6494 23.0028 21.6923 22.8344 21.7461C22.4978 21.8537 21.9734 22.0047 21.2712 22.1583C19.8673 22.4653 17.7512 22.7826 15.0001 22.7826C12.2491 22.7826 10.133 22.4653 8.72906 22.1583C8.02688 22.0047 7.50254 21.8537 7.16587 21.7461C6.99754 21.6923 6.87618 21.6494 6.80301 21.6224C6.76642 21.609 6.7419 21.5995 6.72958 21.5947L6.72256 21.5919L6.72211 21.5917L6.67611 21.5726L6.62158 21.5535C5.99592 21.335 5.62409 21.0596 5.4033 20.7737C5.19655 20.506 5.0003 20.0732 5.0003 19.2945V19.2821L5.00015 19.2698C4.99195 18.6062 5.27927 18.2695 6.36046 17.2792L6.37887 17.2624C6.84215 16.8381 7.53163 16.2067 8.01355 15.3784C8.54762 14.4606 8.79515 13.3757 8.58184 12.1133C8.34274 9.75492 9.10171 7.51248 10.363 5.86032C11.662 4.15868 13.304 3.30435 14.6629 3.30435H15.3374C16.1802 3.30435 17.132 3.63302 18.0433 4.2887C18.4223 3.69702 18.9477 3.22447 19.5625 2.9331C18.5308 2.10786 17.3747 1.55651 16.1984 1.37228Z"
                    fill="#fff"
                  />
                  <ellipse
                    cx="21.0001"
                    cy="6.52174"
                    rx="2.4"
                    ry="2.6087"
                    fill="#fff"
                  />
                </svg>
              </button>
              <Link href="/adminProfile" style={{ backgroundColor: "inherit" }}>
                <div className="adminPic m20-right">
                  {admin?.image && admin?.image.length > 0 && (
                    <img
                      src={baseURL +admin?.image || ""}
                      alt="Image"
                      width={50}
                      height={50}
                      style={{
                        borderRadius: "15px",
                        border: "1px solid white",
                        objectFit: "cover",
                        overflow : "visible"
                      }}
                      className="cursor"
                    />
                  )}
                </div>

              
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
