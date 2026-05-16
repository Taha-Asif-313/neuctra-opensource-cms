import { Button, Container, Text } from "@neuctra/ui";
import {
  BookOpen,
  LayoutDashboard,
  ArrowRight,
  Sparkles,
  Info,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="min-h-screen relative overflow-hidden flex items-center justify-center px-6">
      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-primary/20 blur-3xl rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-primary/10 blur-3xl rounded-full" />

      {/* Main Content */}
      <div className="relative py-10 z-10 max-w-4xl text-center flex flex-col items-center">
    

        {/* Heading */}
        <Text className="text-4xl sm:text-6xl font-bold leading-none">
          Welcome To{" "}
          <span className="text-primary">Neuctra OpenSource CMS</span>
        </Text>

        {/* Description */}
        <Text className="mt-6 max-w-2xl text-base opacity-80 leading-8">
          A modern, flexible, and developer-friendly content management
          platform designed for building blogs, dashboards, and scalable web
          experiences with simplicity and performance in mind.
        </Text>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            iconBefore={<BookOpen size={18} />}
            iconAfter={<ArrowRight size={16} />}
            onClick={() => navigate("/blog")}
          >
            Explore Blog
          </Button>

          <Button
            size="lg"
            variant="outline"
            iconBefore={<LayoutDashboard size={18} />}
            onClick={() => navigate("/blog/admin")}
          >
            Open Admin Panel
          </Button>
        </div>

        {/* Bottom Stats / Features */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
          <div className="rounded-2xl text-center border border-white/10 bg-white/5 backdrop-blur-md p-6">
            <Text className="!text-xl font-semibold mb-2">Fast Setup</Text>
            <Text as="p" align="center" className="opacity-70 text-sm leading-6">
              Start building your content platform quickly with clean and
              reusable components.
            </Text>
          </div>

          <div className="rounded-2xl text-center border border-white/10 bg-white/5 backdrop-blur-md p-6">
            <Text className="text-xl font-semibold mb-2">Open Source</Text>
            <Text as="p" align="center" className="opacity-70 text-sm leading-6">
              Fully customizable and community-driven architecture for modern
              developers.
            </Text>
          </div>

          <div className="rounded-2xl text-center border border-white/10 bg-white/5 p-6 ">
            <Text className="text-xl font-semibold mb-2">Modern UI</Text>
            <Text as="p" align="center" className="opacity-70 text-sm leading-6">
              Elegant interface with responsive layouts and clean user
              experience across devices.
            </Text>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MainPage;