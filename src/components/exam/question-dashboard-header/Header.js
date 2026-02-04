import './Header.css';

export default function Header() {
  return (
    <header className="container-fluid exam-header shadow-sm">
      <div className="row align-items-center h-100">

        {/* Logo */}
        <div className="col-md-2 col-4 d-flex justify-content-center align-items-center">
          <img src="/logo.png" alt="Logo" className="header-logo" />
        </div>

        {/* Title */}
        <div className="col-md-8 col-8 text-center">
          <h4 className="program-title mb-1">
            Information Technology Excellence Program
          </h4>
          <span className="program-subtitle">
            Government Skill Development Initiative
          </span>
        </div>

        {/* Phase */}
        <div className="col-md-2 d-none d-md-flex justify-content-center">
          <span className="phase-badge">
            Phase 1 · Online Exam
          </span>
        </div>

      </div>
    </header>
  );
}
