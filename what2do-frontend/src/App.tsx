import { Route, Routes } from "react-router";
import Layout from "./Pages/Layout/Layout";
import AddPage from "./Pages/AddPage";
import InboxPage from "./Pages/InboxPage";
import TodayPage from "./Pages/TodayPage";
import UpcomingPage from "./Pages/UpcomingPage";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route element={<AddPage />} />
          <Route path="/" element={<AddPage />} />
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/today" element={<TodayPage />} />
          <Route path="/upcoming" element={<UpcomingPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
