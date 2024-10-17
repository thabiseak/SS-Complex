import { allRoutesPath } from "../../../router/routesPath";
import { FaCar } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FiUserCheck } from "react-icons/fi";
import { CgSupport } from "react-icons/cg";
import { MdOutlineSpaceDashboard } from "react-icons/md";

export const Menus = [
  {
    id: 0,
    label: "Hall",
    link: allRoutesPath.COURSE,
    icon: MdOutlineSpaceDashboard,
  },
  {
    id: 1,
    label: "Inventory",
    link: allRoutesPath.INVENTORY,
    icon: MdOutlineSpaceDashboard,
  },
  {
    id: 2,
    label: "Event",
    link: allRoutesPath.EVENT,
    icon: MdOutlineSpaceDashboard,
  },
  {
    id: 3,
    label: "Transactions",
    link: allRoutesPath.Transactions,
    icon: MdOutlineSpaceDashboard,
  },

  // {
  //   id: 1,
  //   label: "Booking",
  //   link: allRoutesPath.BOOKING,
  //   icon: FaCar,
  //   subMenu: [
  //     {
  //       id: 0,
  //       label: "Pending Approvals",
  //       link: allRoutesPath.PENDING_APPROVALS,
  //     },
  //     {
  //       id: 1,
  //       label: "Pending Rides",
  //       link: allRoutesPath.PENDING_RIDES,
  //     },
  //     {
  //       id: 2,
  //       label: "Completed Rides",
  //       link: allRoutesPath.COMPLETED_RIDES,
  //     },
  //     {
  //       id: 3,
  //       label: "Cancelled Ride",
  //       link: allRoutesPath.CANCELLED_RIDES,
  //     },
  //   ],
  // },
];
