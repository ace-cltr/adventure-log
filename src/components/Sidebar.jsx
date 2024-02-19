import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import AppFooter from "./AppFooter";
import { Outlet } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      {/* AppNav here is for navigation or changing the URLs an outlet is for showing the content in the nested routes */}
      <AppNav />
      {/* <Outlet /> is a react router dom feature to show nested routes in ui countries/cities/and so on....... */}
      <Outlet />
      <AppFooter />
    </div>
  );
}
