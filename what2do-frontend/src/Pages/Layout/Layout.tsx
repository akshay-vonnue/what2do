import { Outlet } from "react-router";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/Sidebar";

function Layout() {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
    </>
  );
}

export default Layout;
