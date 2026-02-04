import { useSelector } from "react-redux";
import "./ExamDashboard.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ExamDashboard() {
    const { name } = useSelector((store) => store.user);
    const [flag, setFlag] = useState(true);
    const navigate = useNavigate();

    return (
        <div className="exam-wrapper">
            <div className="exam-card">

                {/* Header */}
                <div className="exam-header">
                    <h2>Information Technology Excellence Program</h2>
                    <p>Online MCQ Examination</p>
                </div>

                {/* Instructions */}
                <div className="exam-body">
                    <p className="welcome-text">
                        Dear <b>{name}</b>,<br />
                        Please read all instructions carefully before starting the exam.
                    </p>

                    <ol className="instruction-list">
                        <li><b>Exam Duration:</b> 90 minutes. Timer will auto-submit when time ends.</li>
                        <li><b>Exam Format:</b> MCQ based, 4 options, only one correct.</li>
                        <li><b>Navigation:</b> Use Next / Previous buttons to move.</li>
                        <li><b>Answering:</b> Select one option. You may change before moving ahead.</li>
                        <li><b>Reset:</b> Clears selected option for the question.</li>
                        <li><b>Mark for Review:</b> Flag questions to revisit later.</li>
                        <li><b>Submission:</b> Submit manually or auto-submit on timeout.</li>
                        <li><b>Auto Save:</b> Answers are saved automatically.</li>
                        <li><b>Final Check:</b> Review marked questions before submitting.</li>
                        <li><b>Post Exam:</b> Results shared by exam administrator.</li>
                        <li><b>Important Tips:</b> Read carefully, manage time wisely.</li>
                    </ol>
                </div>

                {/* Footer */}
                <div className="exam-footer">
                    <label className="confirm-box">
                        <input type="checkbox" onChange={() => setFlag(!flag)} />
                        <span>I have read all the instructions</span>
                    </label>

                    <button
                        disabled={flag}
                        onClick={() => navigate("/question-dashboard")}
                        className="start-btn"
                    >
                        Start Online Test
                    </button>
                </div>

            </div>
        </div>
    );
}
