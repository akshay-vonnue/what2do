import { useAuthContext } from "../../hooks/useAuthContext";
import "./Header.css";

function Header() {
  const user = useAuthContext();
  console.log("insider header", user);

  return (
    <div className="header">
      <div className="app-header-section">
        <img className="app-logo" src="to-do-list.png" alt="logo" />
        <h2>Todoist</h2>
      </div>
      <img className="user-profile" src="user.jpg" alt="user-profile" />
    </div>
  );
}

export default Header;
