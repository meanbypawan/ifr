import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Api from "../../../api/Api";
import "./Features.css";

function Features() {
  const [code, setCode] = useState("0");
  const [schedule_date, setScheduleDate] = useState(null);
  const [codeList, setCodeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [upload, setUpload] = useState();
  const [uploadQuestionPaper, setUploadQuestionPaper] = useState();

  const fileRef = useRef();
  const questionRef = useRef();

  useEffect(() => {
    loadExamCode();
  }, []);

  const loadExamCode = () => {
    axios.get(Api.EXAM_CODE)
      .then(res => setCodeList(res.data))
      .catch(() => toast.error("Failed to load exam codes"));
  };

  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const minDate = today.toISOString().split("T")[0];

  return (
    <>
      <ToastContainer />

      {isLoading && (
        <div className="spinner-overlay">
          <div className="spinner-border text-light" />
        </div>
      )}

      <div className="container admin-container">
        <h3 className="admin-title">Admin Dashboard</h3>

        <div className="row">
          {/* Create Exam */}
          <div className="col-md-6 p-3">
            <div className="admin-card">
              <div className="card-header">Create New Exam</div>
              <div className="card-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Exam Code (ITEP-XXXX)"
                  onChange={e => setCode(e.target.value)}
                />

                <input
                  type="date"
                  className="form-control mt-3"
                  min={minDate}
                  onChange={e => setScheduleDate(e.target.value)}
                />

                <button className="theme-btn mt-3" onClick={() => {
                  if (!code.startsWith("ITEP-")) {
                    toast.info("Exam code must start with ITEP-");
                    return;
                  }
                  if (!schedule_date) {
                    toast.error("Schedule date is mandatory");
                    return;
                  }
                  axios.post(Api.CREATE_EXAM, { code, schedule_date })
                    .then(res => {
                      toast.success(res.data.message);
                      loadExamCode();
                    })
                    .catch(err => toast.error(err.response?.data?.error));
                }}>
                  Create Exam
                </button>
              </div>
            </div>
          </div>

          {/* Upload Students */}
          <div className="col-md-6 p-3">
            <div className="admin-card">
              <div className="card-header">Upload Student Data</div>
              <div className="card-body">
                <select
                  className="form-control mb-3"
                  onChange={e => setCode(e.target.value)}
                >
                  <option value="0">Select Exam Code</option>
                  {codeList.map((obj, i) => (
                    <option key={i} value={obj.code}>{obj.code}</option>
                  ))}
                </select>

                <input
                  type="file"
                  ref={fileRef}
                  className="form-control"
                  onChange={() => setUpload(fileRef.current.files[0])}
                />

                <button
                  className="theme-btn mt-3"
                  onClick={() => {
                    if (code === "0") {
                      toast.error("Please select exam code");
                      return;
                    }
                    setIsLoading(true);
                    const fd = new FormData();
                    fd.append("users", upload);
                    fd.append("code", code);

                    axios.post(Api.UPLOAD_USER, fd)
                      .then(res => toast.success(res.data.message))
                      .catch(() => toast.error("Upload failed"))
                      .finally(() => setIsLoading(false));
                  }}
                >
                  Upload Students
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Questions */}
        <div className="row">
          <div className="col-md-6 p-3">
            <div className="admin-card">
              <div className="card-header">Upload Questions</div>
              <div className="card-body">
                <input
                  type="file"
                  ref={questionRef}
                  className="form-control"
                  onChange={() =>
                    setUploadQuestionPaper(questionRef.current.files[0])
                  }
                />

                <button
                  className="theme-btn mt-3"
                  onClick={() => {
                    setIsLoading(true);
                    const fd = new FormData();
                    fd.append("questions", uploadQuestionPaper);
                    axios.post(Api.UPLOAD_QUESTION, fd)
                      .then(res => toast.success(res.data.message))
                      .catch(() => toast.error("Upload failed"))
                      .finally(() => setIsLoading(false));
                  }}
                >
                  Upload Questions
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Features;
