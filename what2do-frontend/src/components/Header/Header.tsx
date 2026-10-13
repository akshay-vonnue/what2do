import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="app-header-section">
        <img src="to-do-list.png" alt="logo" />
        <h2>Todoist</h2>
      </div>
      <img src="user.jpg" alt="user-profile" />
    </div>
  );
}

export default Header;
