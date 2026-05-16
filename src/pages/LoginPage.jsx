import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactUserLogin } from "@neuctra/authix";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="relative bg-black text-white w-full overflow-hidden min-h-screen">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <ReactUserLogin
          logoUrl="/logo.png"
          title="Sign in to Neuctra Admin"
          subtitle="Access your blog dashboard"
          onSuccess={(user) => {
            if (user.isVerified) {
              navigate("/blog/admin");
            } else {
              navigate("/blog/verify-email", {
                state: { user },
              });
            }
          }}
        />
      </div>
    </div>
  );
};

export default LoginPage;
