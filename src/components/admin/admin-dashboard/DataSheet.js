import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "../../../api/Api";
import * as XLSX from 'xlsx';
import "./DataSheet.css";
function DataSheet() {
    const params = useParams();
    const [studentList, setStudentList] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [filter, setFilter] = useState("All");
    const [isLoading, setIsLoading] = useState(false);
    const [label, setLabel] = useState("All record");
    useEffect(() => {
        loadDataSheet();
    }, []);
    const loadDataSheet = async () => {
        setIsLoading(true);
        try {
            let response = await axios.post(Api.LOAD_DATA_SHEET, { code: params.code });
            setStudentList(response.data.result);
            setFilterList(response.data.result);
        }
        catch (err) {
            console.log(err);
            toast.error("Oops! something went wrong...");
        }
        setIsLoading(false);
    }
    const filterData = (filterName) => {
        if (filterName == "All") {
            setFilterList(studentList);
            setLabel("All record");
        }
        else if (filterName == "Appeared") {
            let appearedStudent = studentList.filter((student) => { return student.examStatus == true });
            setFilterList([...appearedStudent]);
            setLabel("Appeared student(who submitted the test)");
        }
        else if (filterName == "Not appeared") {
            let notAppearedStudent = studentList.filter((student) => { return student.examStatus == false });
            setFilterList([...notAppearedStudent]);
            setLabel("Not appeared student");
        }
        else if (filterName == "Pass") {
            let passedStudent = studentList.filter((student) => { return student.score >= 50 });
            setFilterList([...passedStudent]);
            setLabel("Passed student (who cleared the exam)");
        }
        else if (filterName == "Fail") {
            let failedStudent = studentList.filter((student) => { return student.score < 50 });
            setFilterList(failedStudent);
            setLabel("Failed student")
        }
    }

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filterList);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        // Generate buffer and download the file
        XLSX.writeFile(wb, `${params.code + label}.xlsx`);
    };
    return <>
        {isLoading ? <div className="spinner-container">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div> : ""}
        <div className="container mt-4 mb-3 datasheet-header">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
                <h3 className="fw-bold">{params.code} – Exam Data Sheet</h3>

                <button onClick={exportToExcel} className="btn-export">
                    ⬇ Download Report
                </button>
            </div>

            <p className="filter-label">{label}</p>

            <div className="filter-group mt-2">
                <button onClick={() => filterData("All")} className="filter-btn gray">
                    All ({studentList.length})
                </button>

                <button onClick={() => filterData("Appeared")} className="filter-btn green">
                    Appeared ({studentList.filter(s => s.examStatus).length})
                </button>

                <button onClick={() => filterData("Not appeared")} className="filter-btn red">
                    Not Appeared ({studentList.filter(s => !s.examStatus).length})
                </button>

                <button onClick={() => filterData("Pass")} className="filter-btn blue">
                    Pass ({studentList.filter(s => s.score >= 50).length})
                </button>

                <button onClick={() => filterData("Fail")} className="filter-btn orange">
                    Fail ({studentList.filter(s => s.score < 50).length})
                </button>
            </div>
        </div>
        <div className="container mb-4">
            <div className="table-responsive shadow-sm rounded">
                <table className="table table-hover align-middle datasheet-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Qualification</th>
                            <th>Score</th>
                            <th>DOB</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterList.map((student, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{student.Name}</td>
                                <td>{student.Email_Id}</td>
                                <td>{student.Mobile_No}</td>
                                <td>{student.Qualification}</td>
                                <td>
                                    <span className={student.score >= 50 ? "score-pass" : "score-fail"}>
                                        {student.score}
                                    </span>
                                </td>
                                <td>{student.DOB}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    </>
}
export default DataSheet;