import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux-data/UserSlice";
import { useEffect } from "react";

export default function Result() {
  const location = useLocation();
  const score = location.state.param.score;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(signOut());
  }, [dispatch]);

  const isPassed = score >= 50;

  return (
    <div className="result-container">
      <div className={`result-card ${isPassed ? "pass" : "fail"}`}>
        <h2 className="result-title">
          {isPassed ? "🎉 Congratulations!" : "📘 Exam Completed"}
        </h2>

        <div className="score-circle">
          <span>{score}</span>
        </div>

        <p className="result-message">
          {isPassed
            ? "You are selected for the next round."
            : "Better luck next time. Keep practicing!"}
        </p>

        <button className="result-btn" onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    </div>
  );
}
