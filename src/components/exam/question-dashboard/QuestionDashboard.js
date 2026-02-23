import { useSelector } from "react-redux";
import Header from "../question-dashboard-header/Header";
import QuestionTab from "../question-tab/QuestionTab";
import "./QuestionDashboard.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Api from "../../../api/Api";
export default function QuestionDashBoard() {
  const navigate = useNavigate();

  const { userId } = useSelector((store) => store.user);
  const [questionList, setQuestionList] = useState([]);

  const [activeQuestionList, setActiveQuestionList] = useState("English");

  const [subjectList, setSubjectList] = useState(["English", "Hindi", "General Knowledge", "Computer Basic", "Quantitative Aptitude", "Logical Resoning"]);

  const [questionPaper, setQuestionPaper] = useState(JSON.parse(localStorage.getItem("question-list")));

  const [targetQuestionNo, setTargetQuestionNo] = useState(null);
  const changeTab = (scrollContainerId, subject) => {
    setActiveQuestionList(subject);
    let scrollContainer = document.querySelector("#" + scrollContainerId);
    scrollContainer.scrollTop = 0;
  }
  const styles = {
    selected: {
      backgroundColor: "#6A0DAD",
      color: "white",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      fontSize: "10px",
      cursor: "pointer"
    },
    notSelected: {
      backgroundColor: "#E1DFDF",
      color: "black",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      fontSize: "10px",
      cursor: "pointer"
    },
    markedForReview: {
      backgroundColor: "orange",
      color: "black",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      fontSize: "10px",
      cursor: "pointer"
    }
  };
  const [time, setTime] = useState(90 * 60);
  useEffect(() => {
    loadQuestionsPaper();
  }, []);
  const loadQuestionsPaper = async () => {
    try {
      const response = await axios.post(Api.GENERATE_PAPER, { userId });
      console.log(response.data.questionsList);
      setQuestionList([...response.data.questionsList]);
      saveQuestion(response.data.questionsList);
      let timer = localStorage.getItem("timer");
      if (timer)
        setTime(timer * 1);
    }
    catch (err) {
      toast.error("Oops! something went wrong..");
    }
  }

  const saveQuestion = (questionList) => {
    let previousUserId = localStorage.getItem("userId");
    if (!previousUserId || previousUserId != userId) {
      let updateQuestionList = { "English": [], "Hindi": [], "General Knowledge": [], "Computer Basic": [], "Quantitative Aptitude": [], "Logical Resoning": [] };
      for (let key in questionList[0])
        for (let question of questionList[0][key]) {
          delete question.Answer;
          updateQuestionList[key].push(question);
        }
      localStorage.setItem("question-list", JSON.stringify(updateQuestionList));
      localStorage.setItem("userId", userId + "");
      setQuestionPaper(updateQuestionList);
    }

  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
        localStorage.setItem("timer", "" + (time - 1));
      } else {
        clearInterval(timer);
        submitTest();
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [time]);

  const navigateToQuestion = (subject, index) => {
    //window.alert(subject+"  "+index);
    setActiveQuestionList(subject);
    setTargetQuestionNo(index);
    //setTargetQuestion({subject,index});
  }
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const submitTest = async () => {
    try {
      let questionList = localStorage.getItem("question-list");
      questionList = questionList && JSON.parse(questionList);
      let response = await axios.post(Api.SUBMIT_EXAM, { questionList, userId });
      localStorage.clear();
      navigate("/result", { state: { param: { score: response.data.score } } });
    }
    catch (err) {
      console.log(err);
      toast.error("Oops ! Something went wrong..");
    }
  }
  //--------------------------
  const submittedRef = useRef(false);
const violationCountRef = useRef(0);
const violationLockRef = useRef(false);
// ================= PRODUCTION EXAM SECURITY =================
useEffect(() => {

  const MAX_VIOLATIONS = 3;

  const handleViolation = () => {

    if (submittedRef.current || time <= 0) return;

    // Prevent multiple triggers within 2 seconds
    if (violationLockRef.current) return;

    violationLockRef.current = true;

    setTimeout(() => {
      violationLockRef.current = false;
    }, 2000);

    violationCountRef.current += 1;

    if (violationCountRef.current < MAX_VIOLATIONS) {

      toast.warning(
        `Warning ${violationCountRef.current}/${MAX_VIOLATIONS}.
Do not leave exam screen.
After ${MAX_VIOLATIONS} violations, exam will be submitted.`,
        { autoClose: 4000 }
      );

    } else {

      submittedRef.current = true;

      toast.error("3 violations detected. Submitting exam...", {
        autoClose: 2000
      });

      setTimeout(() => {
        submitTest();
      }, 2000);
    }
  };

  // Detect tab switch / minimize
  const handleVisibilityChange = () => {
    if (document.hidden) {
      handleViolation();
    }
  };

  // Detect window focus loss
  const handleWindowBlur = () => {
    handleViolation();
  };

  // Detect fullscreen exit
  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      handleViolation();
    }
  };

  // Disable right click
  const disableRightClick = (e) => {
    e.preventDefault();
  };

  // Disable devtools shortcuts
  const disableShortcuts = (e) => {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && e.key === "I") ||
      (e.ctrlKey && e.shiftKey && e.key === "J") ||
      (e.ctrlKey && e.key === "U")
    ) {
      e.preventDefault();
      handleViolation();
    }
  };

  // Start fullscreen automatically
  const startFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.log("Fullscreen blocked by browser");
    }
  };

  startFullscreen();

  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("blur", handleWindowBlur);
  document.addEventListener("fullscreenchange", handleFullscreenChange);
  document.addEventListener("contextmenu", disableRightClick);
  document.addEventListener("keydown", disableShortcuts);

  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("blur", handleWindowBlur);
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
    document.removeEventListener("contextmenu", disableRightClick);
    document.removeEventListener("keydown", disableShortcuts);
  };

}, [time]);
  return (
    <div className="question-dashboard-wrapper">

      <div className="question-dashboard-card">

        {/* LEFT : Question Area */}
        <div className="question-left">
          <Header />

          <div className="question-content">
            {questionList.length !== 0 && questionPaper != null ? (
              <QuestionTab
                changeTab={changeTab}
                userId={userId}
                questionList={questionList}
                setQuestionList={setQuestionList}
                activeQuestionList={activeQuestionList}
                setActiveQuestionList={setActiveQuestionList}
                subjectList={subjectList}
                setSubjectList={setSubjectList}
                questionPaper={questionPaper}
                setQuestionPaper={setQuestionPaper}
                setTargetQuestionNo={setTargetQuestionNo}
                targetQuestionNo={targetQuestionNo}
                submitTest={submitTest}
              />
            ) : (
              <p className="loading-text">Loading questions...</p>
            )}
          </div>
        </div>

        {/* RIGHT : Status Panel */}
        <div className="question-right">

          {/* Timer */}
          <div className="timer-box">
            <h5>
              Time Left
              <span>
                {minutes < 10 ? '0' : ''}{minutes}:
                {seconds < 10 ? '0' : ''}{seconds}
              </span>
            </h5>
          </div>

          <h6 className="status-title">Question Status</h6>

          <div className="status-body">
            {subjectList.map((subject, index) => (
              <div key={index} className="subject-block">
                <div className="subject-name">{subject}</div>

                <div className="question-numbers">
                  {questionList[0]?.[subject].map((question, index) => {
                    const q = questionPaper?.[subject].find(
                      obj => obj.Id == question.Id
                    );

                    let cls = "not-selected";
                    if (q?.AnswerKey !== 'null') cls = "selected";
                    else if (q?.MarkedForReview !== 'null') cls = "review";

                    return (
                      <span
                        key={index}
                        onClick={() => navigateToQuestion(subject, index)}
                        className={`q-circle ${cls}`}
                      >
                        {index + 1}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );

}