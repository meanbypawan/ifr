import axios from "axios";
import { useState } from "react";
import Api from "../../api/Api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(Api.ADMIN_SIGN_IN, { username, password })
      .then(response => {
        if (response.data.status)
          navigate("/system-administration/dashboard");
        else
          toast.error(response.data.message);
      })
      .catch(err => {
        console.log(err);
        toast.error("Oops! something went wrong");
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="login-header">
            <h4>Admin Login</h4>
            <small>System Administration</small>
          </div>

          <form className="p-4" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
                className="form-control login-input"
                required
              />
            </div>

            <div className="form-group mb-4">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="form-control login-input"
                required
              />
            </div>

            <button className="btn login-btn w-100">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
