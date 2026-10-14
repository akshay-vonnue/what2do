import "./ProfilePage.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { useNavigate } from "react-router";

function ProfilePage() {
  console.log("rendering profile page");
  const user = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    localStorage.removeItem("user");
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="profile">
      <div className="user-name">{user.name}</div>
      <div className="user-email">{user.email}</div>
      <button onClick={handleLogin} type="button" className="logout-button">
        {loading ? "loading..." : " logout"}
      </button>
    </div>
  );
}

export default ProfilePage;
