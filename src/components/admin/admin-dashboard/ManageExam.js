import axios from "axios";
import { useEffect, useState } from "react";
import Api from "../../../api/Api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./ManageExam.css";

function ManageExam() {
  const [examList, setExamList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = () => {
    axios.get(Api.EXAM_LIST)
      .then(response => {
        setExamList(response.data.result);
      })
      .catch(() => toast.error("Oops! something went wrong"));
  };

  const generateExamPassword = (code) => {
    axios.post(Api.GENERATE_PASSWORD, { code })
      .then(res => toast.success(res.data.message))
      .catch(() => toast.error("Oops! something went wrong"));
  };

  const changeStatus = (code, status) => {
    const newStatus = status === "Open" ? "Close" : "Open";
    axios.post(Api.CHANGE_EXAM_STATUS, { code, status: newStatus })
      .then(res => {
        toast.success(res.data.message);
        loadExams();
      })
      .catch(() => toast.error("Oops! something went wrong"));
  };

  return (
    <>
      <ToastContainer />
      <div className="container mt-4">
        <div className="manage-card">
          <h4 className="manage-title">Manage Exams</h4>

          <table className="table manage-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Exam Code</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {examList.map((exam, index) => (
                <tr key={exam._id}>
                  <td>{index + 1}</td>
                  <td className="fw-bold">{exam.code}</td>

                  <td>
                    <span className={`status-badge ${exam.status === "Open" ? "open" : "close"}`}>
                      {exam.status}
                    </span>
                  </td>

                  <td className="action-buttons">
                    <button
                      onClick={() => changeStatus(exam.code, exam.status)}
                      className="btn btn-sm btn-warning"
                    >
                      {exam.status === "Open" ? "Terminate" : "Activate"}
                    </button>

                    <button
                      onClick={() => generateExamPassword(exam.code)}
                      className="btn btn-sm btn-secondary"
                    >
                      Generate Password
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/system-administration/dashboard/data-sheet/${exam.code}`)
                      }
                      className="btn btn-sm btn-theme"
                    >
                      View Data
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {examList.length === 0 && (
            <p className="text-center text-muted mt-4">No exams available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ManageExam;
