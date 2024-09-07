import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Api from "../../../api/Api";

function Features() {
    console.log("Component render....");
    const [code, setCode] = useState("0");
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
            .then(response => {
                console.log(response.data);
                setCodeList(response.data);
            }).catch(err => {
                console.log(err);
            })
    }
    const setFile = () => {
        setUpload(fileRef.current.files[0]);
    }
    const setQuestionPaperFile = () => {
        setUploadQuestionPaper(questionRef.current.files[0]);
    }
    const handleSubmit = () => {
        if (code == "0") {
            toast.error("Please select exam code");
        }
        else {
            setIsLoading(true);
            let formData = new FormData();
            formData.append("users", upload);
            formData.append("code", code);
            axios.post(Api.UPLOAD_USER, formData)
                .then(response => {
                    toast.success(response.data.message);
                    setIsLoading(false);
                }).catch(err => {
                    toast.error("Oops! something went wrong..");
                    setIsLoading(false);
                });
        }
    }

    const createExam = () => {
        axios.post(Api.CREATE_EXAM, { code })
            .then(response => {
                toast.success(response.data.message);
                loadExamCode();
            })
            .catch(err => {
                console.log(err);
                toast.error(err.response.data.error);
            });
    }
    const uploadQuestion = () => {
        setIsLoading(true);
        let formData = new FormData();
        formData.append("questions", uploadQuestionPaper);
        axios.post(Api.UPLOAD_QUESTION, formData)
            .then(response => {
                toast.success(response.data.message);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                console.log(err);
                toast.error("Oops! something went wrong..");
            });
    }
    return <>
        <ToastContainer />
        {isLoading ? <div className="spinner-container">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div> : ""}
        <div className="container">
            <div className="row">
                <div className="col-md-6 p-2">
                    <div style={{ width: "100%", height: "200px", boxShadow: "2px 2px 10px 2px #DC3D45" }}>
                        <h6 className="bg-danger text-white text-center p-3">Create new exam</h6>
                        <div style={{ width: "100%" }} className="p-3">
                            <input onChange={(event) => setCode(event.target.value)} type="text" className="p-2 form-control" placeholder="Enter exam code (start with ITEP)" />
                            <button onClick={createExam} className="btn btn-outline-danger mt-3">Create</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 p-2">
                    <div style={{ width: "100%", height: "200px", boxShadow: "2px 2px 10px 2px #DC3D45" }}>
                        <h6 className="bg-danger text-white text-center p-3">Upload student data</h6>
                        <div className="d-flex p-3">
                            <select style={{ width: "45%" }} onChange={(event) => setCode(event.target.value)} className="ml-2 form-control">
                                <option value="0">select exam code</option>
                                {codeList.map((obj, index) => <option value={obj.code} key={index}>{obj.code}</option>)}
                            </select>
                            <input ref={fileRef} onChange={setFile} type="file" className="form-control ml-2" style={{ width: "45%" }} />
                        </div>
                        <button onClick={handleSubmit} className="btn btn-outline-danger ml-4">Done</button>

                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 p-2">
                    <div style={{ width: "100%", height: "200px", boxShadow: "2px 2px 10px 2px #DC3D45" }}>
                        <h6 className="bg-danger text-white text-center p-3">Upload questions</h6>
                        <div style={{ width: "100%" }} className="p-3">
                            <input ref={questionRef} onChange={setQuestionPaperFile} type="file" className="form-control" />
                            <button onClick={uploadQuestion} className="btn btn-outline-danger mt-3">Upload</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Features;