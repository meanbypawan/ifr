import './Header.css';
export default function Header(){
    return <>
      <div className="container-fluid header">
        <div className="row">
            <div className="col-md-2 logo-container">
                <div>
                    <img src="logo.png" width="100%" height="100%"/>
                </div>
            </div>
            <div className="col-md-10">
                <div className="heading d-flex flex-column align-items-center justify-content-center">
                    <h4 className="text-center">Information Technology Excellence Program</h4>
                    <button>Phase 1:Online Exam</button>
                </div>
            </div>
        </div>
      </div>
    </>
}