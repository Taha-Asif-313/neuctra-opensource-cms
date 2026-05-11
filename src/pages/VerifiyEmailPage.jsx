import React from "react";
import { useLocation } from "react-router-dom";
import { ReactEmailVerification } from "@neuctra/authix";

const VerifiyEmailPage = () => {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <ReactEmailVerification user={user} />
    </div>
  );
};

export default VerifiyEmailPage;