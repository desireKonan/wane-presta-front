import { Tooltip } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigator = (props: any) => {
  const location = usePathname();

  const { name, path, navIcon, onClick, navSVG, navIconImg, key, path2 , path3 , path4 , path5 } =
    props;

  return (
    <>
      <li onClick={onClick} key={key}>
        <Tooltip title={name} placement="right">
          <Link
            href={{ pathname: path }}
            className={`${
              location === path || location === path2 || location === path3 || location === path4 || location === path5 ? "activeMenu" : ""
            } betBox`}
          >
            <div>
              {navIconImg ? (
                <>
                  <img src={navIconImg} alt="" />
                </>
              ) : navIcon ? (
                <>
                  <i className={navIcon}></i>
                </>
              ) : (
                <>{navSVG}</>
              )}
              <span className="text-capitalize ms-3 my-auto subtext">{name}</span>
            </div>
            {props?.children && <i className="ri-arrow-right-s-line fs-18"></i>}
          </Link>
        </Tooltip>
        {/* If Submenu */}
        <Tooltip title={name} placement="right">
          {props.children}
        </Tooltip>
      </li>
    </>
  );
};

export default Navigator;
