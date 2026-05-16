import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactEmailVerification, ReactSignedOut } from "@neuctra/authix";

const VerifiyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  return (
    <ReactSignedOut fallback={() => navigate("/blog")}>
      <div className="flex items-center justify-center min-h-screen ">
        <ReactEmailVerification user={user} />
      </div>
    </ReactSignedOut>
  );
};

export default VerifiyEmailPage;
