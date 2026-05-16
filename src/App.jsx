import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GoToTop from "./components/GoToTop";

import { AuthixProvider, ReactSignedIn } from "@neuctra/authix";
import { ToastProvider } from "@neuctra/ui";

import { ThemeProvider } from "./contexts/ThemeContext";
import { authix } from "./utils/neuctraAuthix";

import BlogsLayout from "./BlogsLayout";

import AllBlogsPage from "./pages/AllBlogsPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPanelPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import { AdminProvider } from "./contexts/AdminContext";
import VerifiyEmailPage from "./pages/VerifiyEmailPage";
import EditBlogPage from "./pages/EditBlogPage";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <AuthixProvider authix={authix}>
      <ToastProvider>
        <ThemeProvider>
          <AdminProvider>
            <BrowserRouter>
              <GoToTop />

              <Suspense fallback={null}>
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/blog" element={<BlogsLayout />}>
                    <Route index element={<AllBlogsPage />} />

                    <Route path="login" element={<LoginPage />} />
                    <Route path="verify-email" element={<VerifiyEmailPage />} />
                    <Route path="admin">
                      <Route
                        index
                        element={
                          <ReactSignedIn
                            fallback={<Navigate to="/blog/login" replace />}
                          >
                            <AdminPage />
                          </ReactSignedIn>
                        }
                      />

                      <Route path="create" element={<CreateBlogPage />} />
                      <Route path="edit/:id" element={<EditBlogPage />} />
                    </Route>

                    <Route
                      path="/blog/:userId/:blogId"
                      element={<BlogPostPage />}
                    />
                  </Route>
                </Routes>
              </Suspense>
            </BrowserRouter>
          </AdminProvider>
        </ThemeProvider>
      </ToastProvider>
    </AuthixProvider>
  );
};

export default App;
