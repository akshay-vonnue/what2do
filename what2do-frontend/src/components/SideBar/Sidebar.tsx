import { useNavigate } from "react-router";
import "./Sidebar.css";

const pages = [
  {
    path: "/",
    name: "Add",
  },
  {
    path: "/inbox",
    name: "inbox",
  },
  {
    path: "/today",
    name: "today",
  },
  {
    path: "/upcoming",
    name: "upcoming",
  },
];

function Sidebar() {
  const navigate = useNavigate();
  console.log(window.location.pathname);
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-components">
          {pages.map((page) => (
            <div key={page.name}>
              <a
                className={
                  window.location.pathname === page.path
                    ? "selected-page"
                    : "non-selected-page"
                }
                href={page.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(page.path);
                }}
              >
                {page.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
