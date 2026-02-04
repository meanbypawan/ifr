import { Link, Outlet, useLocation } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname.includes(path) ? "active-link" : "";

  return (
    <div className="container-fluid dashboard-layout">
      <div className="row">
        
        {/* Sidebar */}
        <div className="col-md-2 sidebar">
          <div className="sidebar-logo">
            <img src="/logo.png" alt="ITEP Logo" />
          </div>

          <nav className="sidebar-menu">
            <Link to="" className={`menu-item ${isActive("/dashboard")}`}>
              Home
            </Link>

            <Link to="manage-exam" className={`menu-item ${isActive("manage-exam")}`}>
              Manage Exam
            </Link>

            <Link to="view-students" className={`menu-item ${isActive("view-students")}`}>
              View Students
            </Link>
          </nav>
        </div>

        {/* Content */}
        <div className="col-md-10 content-area">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
