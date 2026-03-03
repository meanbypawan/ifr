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
                        <li><b>Read Instructions:</b> Read all instructions carefully before starting the exam.</li>

                        <li><b>Total Questions:</b> The exam consists of 80 questions.</li>

                        <li><b>Exam Duration:</b> 90 minutes. The exam will auto-submit when the time expires. You may also submit manually after completing the test.</li>

                        <li><b>Subject Distribution:</b>
                            English (10 Questions),
                            Basic Computer (10 Questions),
                            Mathematics (30 Questions),
                            Logical Reasoning (30 Questions).
                        </li>

                        <li><b>Exam Format:</b> Each question has four options (A, B, C, D) and only one option is correct.</li>

                        <li><b>Navigation:</b> Use Next / Previous buttons to move between questions.</li>

                        <li><b>Answering:</b> Select one option per question. You may change your answer before final submission.</li>

                        <li><b>Mark for Review:</b> You can mark any question for review if you are unsure and revisit it later.</li>

                        <li><b>Reset:</b> The Reset button will clear your selected answer and remove the mark status for that question.</li>

                        <li><b>Full Screen Mode:</b> The exam will run in full-screen mode. Exiting full screen is not allowed.</li>

                        <li><b>Tab Switching Restriction:</b> If you open another window, switch tabs, minimize the browser, or use other applications, the exam will be submitted automatically.</li>

                        <li><b>Prohibited Devices:</b> Use of mobile phones, smart watches, calculators, earphones, or any other electronic devices is strictly prohibited.</li>

                        <li><b>Disqualification:</b> Use of unfair means or unauthorized devices may result in immediate termination of the exam.</li>

                        <li><b>Internet Requirement:</b> Ensure a stable internet connection. Do not refresh the page during the exam.</li>

                        <li><b>Final Submission:</b> Once submitted, the exam cannot be resumed.</li>
                    </ol>
                    {/* <ol className="instruction-list">
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
                    </ol> */}
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
