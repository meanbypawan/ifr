import { Link, Outlet } from "react-router-dom";

function Dashboard(){
    return <>
      <div className="container-fluid">
        <div className="row" >
            <div className="col-md-2 bg-danger" style={{height:"100vh",padding:"0"}}>
              <div className="bg-light d-flex jusfify-content-center align-items-center" style={{height:"150px"}}>
                <img src="../../logo.png" width="100%" height="140px"/>  
              </div>
              <Link to="">
                <p className="text-white text-center mt-2 cursor-pointer">Home</p>
              </Link>
              <hr className="bg-light"/>
              <Link to="manage-exam">
                <p className="text-white text-center mt-2 cursor-pointer">Manage Exam</p>
              </Link>
              <hr className="bg-light"/>
              <Link to="">
                <p className="text-white text-center mt-2 cursor-pointer">View Students</p>
              </Link>
              <hr className="bg-light"/>
            </div>
            <div className="col-md-10" style={{height:"100vh"}}>
                <Outlet/>
            </div>
        </div>
      </div>
    </>
}
export default Dashboard;