import "./Layout.css";
import { Outlet } from "react-router";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/Sidebar";

function Layout() {
  return (
    <>
      <div className="layout-structure">
        <Header />
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;