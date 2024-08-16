import { useSelector } from "react-redux";
import "./ExamDashboard.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function ExamDashboard() {
    const { name } = useSelector((store) => store.user);
    const [flag, setFlag] = useState(true);
    const navigate = useNavigate();

    return <>
        <div className="container-fluid bg-container d-flex justify-content-center align-items-center">
            <div className="info-block">
                <div className="exam-instruction-block">
                    <label className="text-center mt-5 text-danger" style={{ fontSize: '20px' }}>Information Technology Excellence Program Online Test</label>
                    <hr />
                    <p><span style={{ fontSize: '25px' }}>Dear {name}</span> <br />Read all instrucation carefully before starting the exam  </p>
                    <p>Instructions for Online MCQ-Based Exam

                        Welcome to the online MCQ-based examination. Please carefully read the following instructions before starting your exam:
                    </p>

                    <ol className="instruction-list">
                        {/* <li className="mt-1 mb-1">fdkf fdkf fdkf fdkfd</li>
                        <li className="mt-1 mb-1">fdklf fdlfkd rer mfkldlf rerer dfldfd</li>
                        <li className="mt-1 mb-1">djlkf rerpoer dkflkf vxvnn dfdfklf oreproe</li>
                        <li className="mt-1 mb-1">fkldjkf fdkf errtyyttr</li>
                        <li className="mt-1 mb-1">fdfjk dfd reepo fkfkj fdf rerpore cxvmnv eropr ero</li> */}
                        <li>
                            <b>Exam Duration:</b><br />

                            The total duration of the exam is 90 minutes.
                            A timer will be visible at the top of the screen, showing the remaining time. Please keep track of your time, as the exam will automatically end when the timer reaches zero.
                        </li>
                        <li><b> Exam Format:</b><br />

                            The exam consists of multiple-choice questions (MCQs).
                            Each question has 4 options (A, B, C, D).
                            Only one option is correct for each question.
                        </li>
                        <li><b>Navigating Through Questions:</b><br />

                            Next Button: After selecting an answer, click the "Next" button to move to the next question.
                            Previous Button (If available): Use the "Previous" button to go back to the previous question if needed.
                        </li>

                        <li><b>Answering Questions:</b><br />

                            Select an Answer: Click on the radio button corresponding to the option (A, B, C, or D) you believe is correct.
                            Change Your Answer: If you want to change your answer before moving to the next question, simply select a different option.
                        </li>
                        <li><b>Resetting Answers</b><br />

                            Reset Button: If you want to clear your selected answer for the current question, click the "Reset" button. This will uncheck all the options, and the question will be marked as unanswered.
                        </li>
                        <li><b>Marking for Review:</b><br />

                            Mark for Review Button: If you're unsure about an answer and want to review it later, click the "Mark for Review" button. This will flag the question so you can easily identify and return to it before submitting the exam.
                        </li>
                        <li><b>Submitting the Exam:</b><br />

                            Submit Button: Once you have answered all the questions to your satisfaction, click the "Submit" button to complete the exam.
                            You cannot submit the exam if you haven't answered or reviewed all the questions.
                            If the time runs out, the exam will be automatically submitted.
                        </li>
                        <li><b>Automatic Save :</b><br />

                            Your answers will be automatically saved as you move from one question to the next.
                            If you accidentally close the browser or lose your internet connection, you can resume the exam from where you left off.
                        </li>
                        <li><b>Final Check</b><br />

                            Before submitting, ensure all your answers are marked, and any questions you marked for review have been answered to your satisfaction.
                        </li>
                        <li><b>Post-Exam</b><br />

                            After submission, your results will be processed and shared with you according to the instructions provided by the exam administrator.
                        </li>
                        <li><b>Important Tips:</b><br />


                            Read each question carefully before selecting an answer.
                            Manage your time effectively, spending more time on difficult questions if needed but ensure you have time to review all questions.
                            If you're unsure of an answer, mark the question for review and revisit it later if time permits.
                        </li>
                        <b>Good luck with your exam!</b>
                    </ol>
                    <input type="checkbox" onChange={() => setFlag(!flag)} /> Have you read all instruction ?
                </div>
                <div className="block-footer mt-5 mb-4 d-flex justify-content-center align-items-center">
                    <button disabled={flag} onClick={() => navigate("/question-dashboard")} type="button" className="btn btn-success">Start Online Test</button>
                </div>
            </div>

        </div>
    </>
}
