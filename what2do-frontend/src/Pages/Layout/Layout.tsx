import "./Layout.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/Sidebar";
import { AuthContext } from "../../hooks/useAuthContext";
import ProtectedRoute from "../ProtectedRoute";

function Layout() {
  const user = JSON.parse(localStorage.getItem("user") as string);
  return (
    <>
      <AuthContext.Provider value={user}>
        <div className="layout-structure">
          <Header />
          <Sidebar />
          <ProtectedRoute />
        </div>
      </AuthContext.Provider>
    </>
  );
}

export default Layout;
